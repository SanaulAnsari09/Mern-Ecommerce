const getProductByCategory = async (Category) => {
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

export default getProductByCategory;
