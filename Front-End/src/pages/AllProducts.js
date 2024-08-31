import React, { useEffect, useState } from "react";
import UploadProduct from "../component/UploadProduct";
import AdminProductCard from "../component/AdminProductCard";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);

  const [allProducts, setAllProducts] = useState([]);

  const getAllProduct = async () => {
    const productResponse = await fetch(
      "http://localhost:8000/api/all-product",
      {
        method: "get",
      }
    );

    const {data} = await productResponse.json();
    setAllProducts(data)
    
  };
  
  console.log("response-data", allProducts);

  useEffect(()=>{
    getAllProduct();
  }, []);

  return (
    <div>
      <div className="bg-white p-2 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full"
          onClick={() => setOpenUploadProduct(!openUploadProduct)}
        >
          Upload Product
        </button>
      </div>
      {/* all product */}
      <div className="flex items-center gap-6  mt-2 flex-wrap h-[calc(100vh-180px)] overflow-y-scroll">
        {
          allProducts.map((product, index)=>{
            return(
              <AdminProductCard data={product} index={index} getAllData={getAllProduct}/>
            )
          })
        }
      </div>

      {/* upload product component */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} getAllData={getAllProduct}/>
      )}
    </div>
  );
};

export default AllProducts;
