import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions/productActions";
import { getAllProducts } from "../helpers";
import { CChart } from "@coreui/react-chartjs";

export default function DashboardHome() {
  const products = useSelector((state) => state?.products);
  const dispatch = useDispatch();

  const drinks = products?.filter((item) => item?.productCategory === "drinks");
  const deserts = products?.filter(
    (item) => item?.productCategory === "deserts"
  );
  const fruits = products?.filter((item) => item?.productCategory === "fruits");
  const chinese = products?.filter(
    (item) => item?.productCategory === "chinese"
  );
  const rice = products?.filter((item) => item?.productCategory === "rice");
  const curry = products?.filter((item) => item?.productCategory === "curry");
  const bread = products?.filter((item) => item?.productCategory === "bread");

  useEffect(() => {
    if (!products) {
      getAllProducts().then((res) => dispatch(setProducts(res)));
    }
  }, [products]);
  return (
    <div className="h-full w-full">
      <div className="flex flex-col items-center justify-center">
        <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4 h-full">
          <div className="flex items-center justify-center">
            <div className="w-340 md:w-508 mt-56">
              <CChart
                type="bar"
                data={{
                  labels: [
                    "Drinks",
                    "Deserts",
                    "Fruits",
                    "Chinese",
                    "Rice",
                    "Curry",
                    "Bread",
                  ],
                  datasets: [
                    {
                      label: "Category Wise Count",
                      backgroundColor: "#FB923C",
                      data: [
                        drinks?.length,
                        deserts?.length,
                        fruits?.length,
                        chinese?.length,
                        rice?.length,
                        curry?.length,
                        bread?.length,
                      ],
                    },
                  ],
                }}
                labels="months"
              />
            </div>
          </div>
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-275 md:w-460 mt-56">
              <CChart
                type="doughnut"
                data={{
                  labels: [
                    "Orders",
                    "Delieverd",
                    "Cancelled",
                    "Paid",
                    "Not Paid",
                  ],
                  datasets: [
                    {
                      backgroundColor: [
                        "#51ff00",
                        "#00b6ff",
                        "#008bff",
                        "#ffd100",
                        "#ff00fb",
                      ],
                      data: [40, 20, 80, 10, 34],
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
