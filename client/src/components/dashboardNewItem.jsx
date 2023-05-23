import React, { useState } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { statuses } from "../utils/styles";
import { Loader } from "rsuite";
import { FaCloudUploadAlt, MdDelete } from "../assets/icons";
import { storage } from "../config/firebase.config";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import Box from "@mui/material/Box";
import ProgressBar from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import {
  alertDanger,
  alertNull,
  alertSuccess,
  alertWarning,
} from "../redux/actions/alertActions";
import { createProduct, getAllProducts } from "../helpers";
import { setProducts } from "../redux/actions/productActions";
export default function DashboardNewItem() {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [progress, setProgress] = useState(null);
  const [imageDownlaodUrl, setImageDownloadUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const handleUploadImage = (e) => {
    setIsLoading(true);
    const file = e.target.files[0];
    const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        dispatch(alertDanger(`Error: ${error}`));
        dispatch(alertNull());
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageDownloadUrl(downloadURL);
          setIsLoading(false);
          setProgress(null);
          dispatch(alertSuccess("Image is successfully uploaded to the cloud"));
          dispatch(alertNull());
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageDownlaodUrl);
    deleteObject(deleteRef).then(() => {
      setIsLoading(false);
      setImageDownloadUrl(null);
      dispatch(alertSuccess("Image Deleted Successfully"));
      dispatch(alertNull());
    });
  };
  const submitData = () => {
    if (
      itemName === "" ||
      category === "" ||
      price === "" ||
      imageDownlaodUrl === ""
    ) {
      dispatch(alertWarning("Please Fill the All Fields"));
    } else {
      const data = {
        productName: itemName,
        productCategory: category,
        productPrice: price,
        productImage: imageDownlaodUrl,
      };

      createProduct(data).then((res) => {
        if (res) {
          dispatch(alertSuccess("New Item Added Successfully"));
        }
        setItemName("");
        setCategory("");
        setPrice("");
        setImageDownloadUrl(null);
        setProgress(null);
        setInterval(() => {
          dispatch(alertNull());
        }, 2000);
      });
      getAllProducts().then((res) => dispatch(setProducts(res)));
    }
  };
  return (
    <div className="flex items-center justify-center flex-col pl-6 px-24 py-12 w-full">
      <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
        <InputValue
          type="text"
          placeholder="Items name here"
          stateFunction={setItemName}
          value={itemName}
        />
        <div className="w-full flex items-center justify-around gap-3 flex-wrap">
          {statuses &&
            statuses?.map((data) => (
              <p
                onClick={() => setCategory(data.category)}
                key={data.id}
                className={`px-4 py-3 rounded-md text-xl text-textColor font-semibold cursor-pointer hover:shadow-md border boreder-gray-200 backdrop-blure-md ${
                  data.category === category
                    ? "bg-orange-400 text-white"
                    : "bg-transparent"
                }`}
              >
                {data?.title}
              </p>
            ))}
        </div>
        <InputValue
          type="number"
          placeholder="Items Price here"
          stateFunction={setPrice}
          value={price}
        />
        <div className="w-full bg-card backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
          {isLoading ? (
            <div className="flex flex-col h-full w-full items-center justify-center">
              <Loader speed="slow" size="lg" />
              {progress > 0 && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ width: "100%", mr: 1 }}>
                    <ProgressBar variant="determinate" />
                  </Box>
                  <Box sx={{ minWidth: 35 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >{`${Math.round(progress)}%`}</Typography>
                  </Box>
                </Box>
              )}
            </div>
          ) : !imageDownlaodUrl ? (
            <>
              <label>
                <div className="flex flex-col itemsc-center justify-center w-full h-full cursor-pointer">
                  <div className="flex flex-col justify-center items-center cursor-pointer">
                    <p className="font-bold text-4xl">
                      <FaCloudUploadAlt className="-rotate-0" />
                    </p>
                    <p className="text-lg text-textColor">
                      Click to Upload Image
                    </p>
                  </div>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  accept="image/*"
                  onChange={handleUploadImage}
                  className="w-0 h-0"
                />
              </label>
            </>
          ) : (
            <>
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <motion.img
                  src={imageDownlaodUrl}
                  whileHover={{ scale: 1.15 }}
                  className="h-full w-full object-cover"
                />
                <motion.button
                  {...buttonClick}
                  onClick={deleteImage}
                  className="bg-orange-500 text-xl cursor-pointer outline-none absolute top-3 right-3 p-3 roudned-fu;; hover:shadow-md duration-500 transition-all ease-in-out"
                >
                  <MdDelete className="-rotate-0" />
                </motion.button>
              </div>
            </>
          )}
        </div>
        <motion.button
          className="w-9/12 py-2 rounded-md  bg-orange-400 text-primary hover:bg-orange-500 cursor-pointer"
          onClick={submitData}
          {...buttonClick}
        >
          Save
        </motion.button>
      </div>
    </div>
  );
}

export const InputValue = ({ type, value, stateFunction, placeholder }) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className="w-full px-4 py-3 bg-lightOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-orange-400"
        onChange={(e) => stateFunction(e.target.value)}
      />
    </>
  );
};
