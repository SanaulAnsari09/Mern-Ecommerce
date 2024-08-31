import React, { useContext, useEffect, useState } from "react";
import Context from "../context";
import displayCurrency from "../helper/displayCurrency";
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { IoCartOutline } from "react-icons/io5";
const getUrl = "http://localhost:8000/api/cartproductlist";
const updateUrl = "http://localhost:8000/api/updatecartproduct";
const deleteUrl = "http://localhost:8000/api/deletecartitem";

const Cart = () => {
  const { fetchProductCount } = useContext(Context);

  const { cartProductCount } = useContext(Context);
  const [allProduct, setAllProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(cartProductCount).fill(null);
  console.log("loadinglist", cartProductCount);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(getUrl, {
      method: "get",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();

    console.log("cart-result", result);
    if (result.success) {
      setAllProduct(result?.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const increaseQuantitiy = async (id, qty) => {
    const response = await fetch(updateUrl, {
      method: "post",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: id,
        quantity: qty + 1,
      }),
    });

    const respData = await response.json();

    console.log("respData", respData);

    if (respData.success) {
      fetchData();
    }
  };
  const decreaseQuantitiy = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(updateUrl, {
        method: "post",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: id,
          quantity: qty - 1,
        }),
      });

      const respData = await response.json();

      console.log("respData", respData);

      if (respData.success) {
        fetchData();
      }
    }
  };

  const delteCartProductItem = async (id) => {
    const response = await fetch(deleteUrl, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id }),
    });

    const respData = await response.json();
    console.log(respData);
    if (respData.success) {
      toast.success(respData.message);
      fetchData();
      fetchProductCount();
    }
  };

  const totalQty = allProduct.reduce((prev, curr) => prev + curr?.quantity, 0);
  const toalPrice = allProduct.reduce(
    (prev, curr) => prev + curr?.quantity * curr?.productId?.SellingPrice,
    0
  );
  return (
    <div className="container mx-auto h-screen mb-5">
      <div className="text-center text-lg my-3">
        {allProduct.length == 0 && loading && (
          <p className="bg-white py-5">No Product Available In Cart</p>
        )}
      </div>
      <Toaster />
      <div className="flex flex-col lg:flex-row justify-between p-2">
        {/* product list */}
        <div className="w-full max-w-xl">
          {loading ? (
            loadingList.map((v, ind) => {
              return (
                <div
                  key={ind + 1}
                  className="w-full bg-slate-200 h-32 my-2 border-slate-300 animate-pulse rounded "
                ></div>
              );
            })
          ) : (
            <div className="">
              {allProduct.map((product, index) => {
                return (
                  <div
                    key={product?._id}
                    className="w-full bg-white h-32 my-2 border-slate-300 rounded border flex gap-4 relative"
                  >
                    <div className="bg-slate-200 h-full w-40">
                      <img
                        src={product?.productId?.ProductImage[0]}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                    {/* DELETE PRODUCT */}
                    <div
                      onClick={() => delteCartProductItem(product?._id)}
                      className="absolute right-0 m-2 h-6 w-6 bg-red-500 text-white flex justify-center items-center rounded cursor-pointer hover:bg-red-700 transition-all"
                    >
                      <MdDelete />
                    </div>
                    <div className="w-full text-lg lg:text-xl text ellipsis line-clamp-1">
                      <h2 className="w-full">
                        {product?.productId?.ProductName}
                      </h2>
                      <p className="text-slate-400 capitalize">
                        {product?.productId?.Category}
                      </p>
                      <div className="w-full flex justify-between pr-2">
                        <p className="" style={{ fontSize: "15px" }}>
                          {displayCurrency(product?.productId?.SellingPrice)}
                        </p>
                        <p
                          className="text-slate-600"
                          style={{ fontSize: "15px" }}
                        >
                          Total :
                          {displayCurrency(
                            product?.productId?.SellingPrice * product.quantity
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() =>
                            decreaseQuantitiy(product._id, product?.quantity)
                          }
                          className="border border-blue-600 text-blue-600 w-6 h-6 flex justify-center items-center rounded hover:bg-blue-600 hover:text-white transition-all"
                        >
                          -
                        </button>
                        <span>{product.quantity}</span>
                        <button
                          onClick={() =>
                            increaseQuantitiy(product?._id, product?.quantity)
                          }
                          className="border border-blue-600 text-blue-600 w-6 h-6 flex justify-center items-center rounded hover:bg-blue-600 hover:text-white transition-all"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* TOTAL PRODUCTS */}
        {allProduct != "" && (
          <div className="mt-5  w-full max-w-sm lg:mt-2">
            {loading ? (
              <div className="h-36 bg-slate-200 border-slate-100 animate-pulse"></div>
            ) : (
              <div className="h-56 bg-slate-100 flex flex-col gap-2">
                <h1 className="bg-blue-600 tex-white p-2 text-white font-medium">
                  Summary
                </h1>
                <div className="flex justify-between px-2">
                  <p className="font-medium">Total QTY :</p>
                  <p className="font-medium">{totalQty}</p>
                </div>

                <div className="flex justify-between px-2">
                  <p className="font-medium">Total Price :</p>
                  <p className="font-medium">{displayCurrency(toalPrice)} </p>
                </div>

                <button className="bg-blue-600 text-white py-2 w-[120px] ml-auto mt-auto rounded mb-2 mr-2">
                  Checkout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {allProduct == "" && (
        <div className="w-full h-full flex justify-center items-center gap-1 md:gap-3">
          <h1 className="text-xl md:text-5xl font-bold">
            No Product's Available in Cart
          </h1>
          <p className=" text-xl md:text-5xl font-bold">
            <IoCartOutline />
          </p>
        </div>
      )}
    </div>
  );
};

export default Cart;
