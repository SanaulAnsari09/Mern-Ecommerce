import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CategorySuggestedProduct from "../component/CtegorySuggesProduct";

const CategoryProduct = () => {
  const { Category } = useParams();

  const getProductByCategory = async () => {
    const productResponse = await fetch(
      "http://localhost:8000/api/category-product-list",
      {
        method: "post",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ Category }),
      }
    );

    const { data } = await productResponse.json();
    return data;
  };

  useEffect(() => {
    getProductByCategory();
  }, []);
  return (
    <CategorySuggestedProduct
      Category={Category}
      heading={`${Category} Product List's`}
    />
  );
};

export default CategoryProduct;
