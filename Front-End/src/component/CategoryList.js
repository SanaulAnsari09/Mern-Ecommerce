import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const CategoryList = () => {
  const [allProduct, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const categroyLoading = new Array(9).fill(null);

  const fetchDataByCategory = async () => {
    setLoading(true);
    const data = await fetch("http://localhost:8000/api/getcategory-product", {
      method: "get",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const result = await data.json();
    setLoading(false);
    setAllProducts(result.data);
  };

  useEffect(() => {
    fetchDataByCategory();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between overflow-scroll scrollbar-none">
        {loading
          ? categroyLoading.map((_, ind) => {
              return (
                <div
                  className="h-20 w-20 md:w-24 md:h-24 border rounded overflow-hidden bg-slate-200"
                  key={ind}
                ></div>
              );
            })
          : allProduct.map((product, index) => {
              return (
                <NavLink
                  to={`/product-category/${product.Category}`}
                  className="cursor-pointer"
                  key={index + 1}
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 flex overflow-hidden items-center justify-center rounded border hover:bg-slate-200">
                    <img
                      src={product?.ProductImage[0]}
                      alt={product?.Category}
                      className="h-full object-scale-down p-2 mix-blend-multiply hover:scale-110 transition-all"
                    />
                  </div>
                  <p className="text-center text-sm capitalize">
                    {product?.Category}
                  </p>
                </NavLink>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;
