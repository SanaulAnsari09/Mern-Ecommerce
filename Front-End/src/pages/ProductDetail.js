import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayCurrency from "../helper/displayCurrency";
import CategorySuggestedProduct from "../component/CtegorySuggesProduct";
import addToCart from "../helper/addToCart";
import Context from "../context";

const ProductDetail = () => {
  const { id } = useParams();
  const {fetchProductCount} = useContext(Context);

  const [productData, setProductData] = useState({
    ProductName: "",
    Category: "",
    ProductImage: [],
    SellingPrice: "",
    Price: "",
    BrandName: "",
    Description: "",
  });
  const [loading, setLoading] = useState(true);
  const productImageList = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCordinate, setZoomImageCordinate] = useState({
    x: 0,
    y: 0,
  });
  const [imageEnter, setImageEnter] = useState(false);
  const getProductDeatails = async () => {
    setLoading(true);
    const product = await fetch("http://localhost:8000/api/product-details", {
      method: "post",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ productId: id }),
    });
    const { data } = await product.json();
    setLoading(false);
    setProductData(data);
    setActiveImage(data.ProductImage[0]);
  };

  useEffect(() => {
    getProductDeatails();
  }, []);

  const handleImageChange = (imgUrl) => {
    setActiveImage(imgUrl);
  };

  const handleZoomImage = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomImageCordinate({
      x: x,
      y: y,
    });
  };

  const handleImageEnter = () => {
    setImageEnter(true);
  };

  const handleImageOut = () => {
    setImageEnter(false);
  };
  
  const handleAddToCart = (e, id) =>{
    addToCart(e, id, fetchProductCount);
  }

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-5">
        {/* product image */}
        <div className="h-96 flex flex-col-reverse lg:flex-row gap-2 items-center">
          <div className="h-full">
            {loading ? (
              <div className="flex justify-between lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageList.map((el, ind) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                      key={ind + 1}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 md:gap-5 lg:flex-col overflow-scroll scrollbar-none h-full cursor-pointer">
                {productData?.ProductImage?.map((imgUrl, ind) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded p-1"
                      key={ind + 1}
                    >
                      <img
                        src={imgUrl}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                        onMouseEnter={() => handleImageChange(imgUrl)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {loading ? (
            <div className="h-[300px] w-[300px] md:h-96 md:w-96 bg-slate-200 animate-pulse"></div>
          ) : (
            <div className="h-[300px] w-[300px] md:h-96 md:w-96 bg-slate-200 relative">
              <img
                src={activeImage}
                className="h-full w-full object-scale-down mix-blend-multiply cursor-pointer"
                onMouseMove={handleZoomImage}
                onMouseEnter={handleImageEnter}
                onMouseOut={handleImageOut}
              />

              {/* PRODUCT ZOOM */}
              {imageEnter && (
                <div className="hiddein lg:block absolute min-w-[400px] min-h-[377px] bg-slate-200 p-1 -right-[410px] top-0 overflow-hidden">
                  <div
                    className="w-full h-full min-h-[377px] min-w-[400px] scale-150"
                    style={{
                      background: `url(${activeImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: `${zoomImageCordinate.x * 100}% ${
                        zoomImageCordinate.y * 100
                      }%`,
                    }}
                  ></div>
                </div>
              )}
            </div>
          )}
        </div>
        {/* product details */}
        {loading ? (
          <div className="flex flex-col gap-1">
            <p className="min-w-[120px] py-3 bg-slate-200 animate-pulse"></p>
            <h2 className="bg-slate-200 py-3"></h2>
            <p className="py-2 bg-slate-200"></p>

            <div className="text-slate-200 flex item-center gap-1 animate-pulse">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>

            <div className="flex items-center gap-4 my-2">
              <button className="bg-slate-200 rounded px-3 py-4 min-w-[160px] animate-pulse"></button>
              <button className="bg-slate-200 rounded px-3 py-4 min-w-[160px] animate-pulse"></button>
            </div>
            <div className="flex items-center gap-4 my-2">
              <button className="bg-slate-200 rounded px-3 py-4 min-w-[120px] animate-pulse"></button>
              <button className="bg-slate-200 rounded px-3 py-4 min-w-[120px] animate-pulse"></button>
            </div>
            <div className="flex flex-col gap-2">
              <p className="bg-slate-200 py-2 animate-pulse"></p>
              <p className="bg-slate-200 py-1 animate-pulse"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-blue-200 text-blue-600 px-2 rounded-full inline-block w-fit">
              {productData?.BrandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">
              {productData?.ProductName}
            </h2>
            <p className="capitalize text-slate-400">{productData?.Category}</p>

            <div className="text-orange-400 flex item-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>

            <div className="flex items-center gap-4 text-2xl font-medium my-2 lg:text-3xl">
              <p className="text-blue-600">
                {displayCurrency(productData?.SellingPrice)}
              </p>
              <p className="text-slate-500 line-through">
                {displayCurrency(productData?.Price)}
              </p>
            </div>

            <div className="flex items-center gap-4 my-2">
              <button className="border-2 border-blue-600 rounded px-3 py-1 min-w-[120px] text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition-all">
                Buy
              </button>
              <button 
              onClick={(e)=>handleAddToCart(e, productData?._id)}
              className="border-2 border-blue-600 rounded px-3 py-1 min-w-[120px] text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition-all">
                AddToCart
              </button>
            </div>
            <div>
              <p className="text-slate-600 font-medium my-2 text-2xl">
                Description
              </p>
              <p>{productData?.Description}</p>
            </div>
          </div>
        )}
      </div>

      <CategorySuggestedProduct
        Category={productData?.Category}
        heading={"You will also like these product"}
      />
    </div>
  );
};

export default ProductDetail;
