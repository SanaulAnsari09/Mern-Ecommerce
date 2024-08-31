import React, { useState } from "react";
import { GiCrossMark } from "react-icons/gi";
import productCategory from "../helper/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helper/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import { toast } from "react-hot-toast";

const UploadProduct = ({ onClose,getAllData }) => {
  const [data, setData] = useState({
    ProductName: "",
    BrandName: "",
    Category: "",
    ProductImage: [],
    Description: "",
    Price: "",
    SellingPrice: "",
  });

  const [fullScreenImage, setFullScreenImage] = useState();
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUploadProductImage = async (e) => {
    const file = e.target.files[0];

    const imageUploading = await uploadImage(file);
    setData({
      ...data,
      ProductImage: [...data.ProductImage, imageUploading.url],
    });
  };

  const handleShowFullScreen = (image) => {
    setOpenFullScreenImage(true);
    setFullScreenImage(image);
  };

  const handleDeleteProductImage = async (index) => {
  
    const newProductImage = [...data.ProductImage];
    newProductImage.splice(index, 1);
    setData({...data, ProductImage: [...newProductImage] });

  };

  // upload product
  const handleUploadProduct = async (e) => {
    e.preventDefault();

    const uploadResponse = await fetch(
      "http://localhost:8000/api/upload-product",
      {
        method: "post",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const response = await uploadResponse.json();
    console.log("Response", response);
    if (response.success) {
      toast.success(response.message);
      onClose();
      getAllData()
    }
    if (response.error) {
      toast.error(response.error);
    }
  };

  console.log("form-data", data);

  return (
    <div className="fixed h-full w-full bg-slate-200 bg-opacity-50 top-0 left-0 right-0 bottom-0 flex justify-center items-top pt-10">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[85%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Upload Product</h2>
          <div onClick={onClose} className="cursor-pointer hover:text-red-600">
            <GiCrossMark />
          </div>
        </div>

        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full"
          onSubmit={handleUploadProduct}
        >
          <label htmlFor="productname">Product Name</label>
          <input
            id="productname"
            placeholder="Product Name"
            name="ProductName"
            value={data.ProductName}
            onChange={handleChange}
            className="p-2 bg-slate-100 border rounded outline-none"
          ></input>
          <label htmlFor="brandname" className="mt-3">
            Brand Name
          </label>
          <input
            id="brandname"
            placeholder="Brand Name"
            name="BrandName"
            value={data.BrandName}
            onChange={handleChange}
            className="p-2 bg-slate-100 border rounded outline-none"
          ></input>
          <label htmlFor="category" className="mt-3">
            Category
          </label>
          <select
            className="p-2 bg-slate-100 border rounded outline-none"
            onChange={handleChange}
            name="Category"
            id="category"
          >
            <option value="">Select Category</option>
            {productCategory.map((el, ind) => {
              return (
                <option value={el.value} key={el.value + ind}>
                  {el.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="productimage" className="mt-3">
            Product Image
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 img-box-flex-style">
                <span className="text-3xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  hidden
                  onChange={handleUploadProductImage}
                />
              </div>
            </div>
          </label>
          <div className="pb-5 flex gap-1 flex-wrap">
            {data.ProductImage.length > 0 ? (
              data.ProductImage.map((image, ind) => {
                return (
                  <div className="relative group" key={ind + 1}>
                    <img
                      src={image}
                      width={80}
                      height={80}
                      className="bg-slate-100 border cursor-pointer"
                      alt="img"
                      onClick={() => handleShowFullScreen(image)}
                    />
                    <div
                      className="absolute cursor-pointer bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block"
                      onClick={() => handleDeleteProductImage(ind)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Upload Image</p>
            )}
          </div>

          <label htmlFor="price" className="mt-3">
            Price :
          </label>
          <input
            type="number"
            id="price"
            name="Price"
            placeholder="Enter Price"
            value={data.Price}
            onChange={handleChange}
            className="p-2 bg-slate-100 border rounded outline-none"
          />
          <label htmlFor="sellingprice" className="mt-3">
            Selling Price :
          </label>
          <input
            type="number"
            id="sellingprice"
            name="SellingPrice"
            placeholder="Enter Selling Price"
            value={data.SellingPrice}
            onChange={handleChange}
            className="p-2 bg-slate-100 border rounded outline-none"
          />

          <label htmlFor="description" className="mt-3">
            Description :
          </label>
          <textarea
            className="h-28 bg-slate-100 border rounded outline-none resize-none p-2"
            placeholder="Write Product Description..."
            name="Description"
            value={data.Description}
            onChange={handleChange}
          ></textarea>

          <button
            className="px-3 py-2 bg-blue-500 text-white mb-5 rounded hover:bg-red-700"
            type="submit"
          >
            Uplaod Product
          </button>
        </form>
      </div>

      {/* Display image full screen */}

      {openFullScreenImage && (
        <DisplayImage
          imgUrl={fullScreenImage}
          onClose={setOpenFullScreenImage}
        />
      )}
    </div>
  );
};

export default UploadProduct;
