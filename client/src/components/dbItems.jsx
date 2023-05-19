import React from "react";
import DataTable from "./dataTable";
import { HiCurrencyRupee } from "../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProducts } from "../helpers";
import { setProducts } from "../redux/actions/productActions";
import { alertNull, alertSuccess } from "../redux/actions/alertActions";
export default function DBItems() {
  const products = useSelector((state) => state?.products);
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-self-center gap-4 pt-6 w-full">
      <DataTable
        columns={[
          {
            title: "Image",
            field: "productImage",
            render: (rowData) => (
              <img
                className="w-32 h-16 object-contain rounded-md"
                src={rowData?.productImage}
              />
            ),
          },
          {
            title: "Name",
            field: "productName",
          },
          {
            title: "Category",
            field: "productCategory",
          },
          {
            title: "Price",
            field: "productPrice",
            render: (rowData) => (
              <p className="text-2xl font-semibold text-textColor flex items-center justify-center">
                <HiCurrencyRupee className="text-orange-400" />
                {parseFloat(rowData?.productPrice)}
              </p>
            ),
          },
        ]}
        data={products}
        title="List of Products"
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Data",
            onClick: (e, data) => {},
          },
          {
            icon: "delete",
            tooltip: "Delete Data",
            onClick: (e, data) => {
              if (
                window.confirm("Are you sure, you want to delete this Field")
              ) {
                deleteProduct(data?.productId).then((data) => {
                  dispatch(alertSuccess("Item Deleted Successfully!"));
                  setTimeout(() => {
                    dispatch(alertNull());
                  }, 2000);
                });
                getAllProducts().then((res) => {
                  dispatch(setProducts(res));
                });
              }
            },
          },
        ]}
      />
    </div>
  );
}
