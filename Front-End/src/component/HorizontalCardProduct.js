import React, { useState, useEffect, useContext } from "react";
import getProductByCategory from "../helper/fetchCategoryWiseProduct";
import displayCurrency from "../helper/displayCurrency";
import { NavLink } from "react-router-dom";
import addToCart from "../helper/addToCart";
import Context from "../context";

const HorizontalCardProduct = ({ Category, heading }) => {

  const {fetchProductCount} = useContext(Context);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(12).fill(null);

  const fetchData = async () => {
    setLoading(true);
    const products = await getProductByCategory(Category);
    setLoading(false);
    setData(products);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleAddToCart = (e, id) => {
    addToCart(e, id, fetchProductCount);
  };

  return (
    <div className="container mx-auto px-4 my-4">
      <h2 className="font-semi-bold text-2xl py-4">{heading}</h2>

      <div className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none">
        {loading
          ? loadingList.map((_, ind) => {
              return (
                <div
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
                  key={ind}
                >
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                  <div className="p-4 grid w-full gap-2">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p1"></h2>
                    <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse"></p>
                    <p className="text-red-600 font-medium p-1 bg-slate-200 animate-pusle"></p>
                    <p className="text-slate-500 line-through p-1 bg-slate-200 animate-pulse"></p>
                    <p className="text-slate-500 line-through p-1 bg-slate-200 animate-pulse"></p>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <NavLink
                  to={`product/${product._id}`}
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded border flex"
                  key={index + 1}
                >
                  <div className="bg-slate-100 h-full p-4 md:min-w-[120px] md:min-w-[145px]">
                    <img
                      src={product?.ProductImage[0]}
                      className="object-scale-down w-full h-full hover:scale-110 cursor-pointer transition-all"
                    />
                  </div>
                  <div className="p-4 grid">
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
                </NavLink>
              );
            })}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
