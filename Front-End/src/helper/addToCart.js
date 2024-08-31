import { toast } from "react-hot-toast";
const url = "http://localhost:8000/api/addtocart";

const addToCart = async (e, id, fetchProductCount) => {
  e?.stopPropagation();
  e?.preventDefault();
  

  const adding = await fetch(url, {
    method: "post",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId: id }),
  });

  const data = await adding.json();

  if (data.success) {
    toast.success(data?.message);
    fetchProductCount();
  }
  if (data.error) {
    toast.error(data?.message);
  }
  return data;
};
export default addToCart;
