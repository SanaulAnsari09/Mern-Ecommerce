import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import addToCart from "../helper/addToCart";
import displayCurrency from "../helper/displayCurrency";
import Context from "../context/index";
const searchUrl = "http://localhost:8000/api/searchproduct";

const SearchProduct = () => {
  const query = useLocation();
  const [searchedData, setSearchedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {fetchProductCount} = useContext(Context);


  const getSearchProduct = async () => {
    setLoading(true);
    const response = await fetch(searchUrl + query.search);
    const result = await response.json();
    setLoading(false);
    setSearchedData(result.data);
  };

  //   console.log("response-result", searchedData);
  useEffect(() => {
    getSearchProduct();
  }, [query]);
  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div>
          <p className="text-lg text-center">Loading ...</p>
        </div>
      ) : (
        <div>
          <p className="bg-white p-4 rounded border shadow">Search Result's : {searchedData.length}</p>
          {searchedData.length == 0 && !loading && (
            <p className="bg-white text-center text-lg p-4">
              {" "}
              No Data Found....
            </p>
          )}

          {searchedData != 0 && !loading && (
            <div className="flex flex-wrap mt-4 gap-2 md:gap-9 justify-center">
              {searchedData?.map((product) => {
                return (
                  <div
                    className="w-full min-w-[280px] md:min-w-[220px] max-w-[280px] md:max-w-[220px] bg-white rounded border"
                    key={product?._id}
                  >
                    <div className="bg-slate-100 h-44 p-2 min-w-[145px] flex justify-center items-center">
                      <img
                        src={product?.ProductImage[0]}
                        className="object-scale-down h-full hover:scale-110 cursor-pointer transition-all bg-slate mix-blend-multiply"
                      />
                    </div>
                    <div className="p-2 grid gap-2">
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
                        onClick={(e) => addToCart(e, product?._id, fetchProductCount)}
                        className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded-full text-sm mt-1"
                      >
                        AddToCart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchProduct;
