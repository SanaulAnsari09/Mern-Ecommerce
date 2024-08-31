import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";

const AdminProductCard = ({ data, index, getAllData }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div key={index + 1} className="bg-white p-4 rounded border">
      <div className="w-32 h-32 flex justify-center items-center">
        <img
          src={data?.ProductImage[0]}
          className="mx-auto object-fill h-full"
          alt={data.ProductName}
        />
      </div>
      <h1 className="text-center ellipsis-text overflow-text ">{data?.ProductName}</h1>
      <div
        onClick={() => setEditProduct(!editProduct)}
        className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
      >
        <MdEdit />
      </div>

      {editProduct && (
        <AdminEditProduct
          product={data}
          allDataFetch={getAllData}
          onClose={() => setEditProduct(false)}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
