import React, { useState, useEffect, useContext } from "react";
import getProductByCategory from "../helper/fetchCategoryWiseProduct";
import displayCurrency from "../helper/displayCurrency";
import addToCart from "../helper/addToCart";
import Context from "../context";

const CategorySuggestedProduct = ({ Category, heading }) => {
  const { fetchProductCount } = useContext(Context);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(12).fill(null);

  console.log("checking-category", Category);
  const fetchData = async () => {
    setLoading(true);
    const products = await getProductByCategory(Category);
    setLoading(false);
    setData(products);
  };
  useEffect(() => {
    fetchData();
  }, [Category]);

  const handleAddToCart = (e, id) => {
    addToCart(e, id, fetchProductCount);
  };

  return (
    <div className="container mx-auto px-4 my-4">
      <h2 className="font-semi-bold text-2xl py-4 capitalize">{heading}</h2>

      <div className="flex items-center gap-4 md:gap-6 flex-wrap">
        {loading
          ? loadingList.map((_, ind) => {
              return (
                <div
                  className="w-full min-w-[180px] md:min-w-[220px] max-w-[180px] md:max-w-[220px] bg-white rounded-sm border"
                  key={ind + 1}
                >
                  <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse"></div>
                  <div className="p-4 grid gap-2">
                    <p className="capitalize text-slate-500 bg-slate-200 py-2 animate-pulse"></p>
                    <p className="capitalize text-slate-500 bg-slate-200 py-2 animate-pulse"></p>
                    <p className="capitalize text-slate-500 bg-slate-200 py-2 animate-pulse"></p>
                    <button className="bg-slate-200 py-3 text-white px-2 rounded-full text-sm mt-1 animate-pulse"></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <div
                  className="w-full min-w-[180px] md:min-w-[220px] max-w-[180px] md:max-w-[220px] bg-white rounded border"
                  key={index + 1}
                >
                  <div className="bg-slate-100 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                    <img
                      src={product?.ProductImage[0]}
                      className="object-scale-down h-full hover:scale-110 cursor-pointer transition-all bg-slate mix-blend-multiply"
                    />
                  </div>
                  <div className="p-4 grid gap-2">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                      {product.ProductName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product?.Category}
                    </p>
                    <div className="flex gap-3">
                      <p className="text-blue-600 font-medium">
                        {displayCurrency(product?.SellingPrice)}
                      </p>
                      <p className="text-slate-500 line-through">
                        {displayCurrency(product?.Price)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => handleAddToCart(e, product?._id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded-full text-sm mt-1"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default CategorySuggestedProduct;
