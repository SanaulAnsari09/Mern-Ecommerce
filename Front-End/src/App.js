import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import "react-toastify/dist/ReactToastify.css";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDeatails } from "./store/userSlice";
import "./App.css";
import { Toaster } from "react-hot-toast";

const App = () => {
  const disptach = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    const dataResponse = await fetch("http://localhost:8000/api/user-detail", {
      method: "get",
      credentials: "include",
    });

    const apiData = await dataResponse.json();

    if (apiData.success) {
      disptach(setUserDeatails(apiData.data));
    }

    console.log("user-api-data", apiData);
  };

  const fetchProductCount = async () => {
    const response = await fetch("http://localhost:8000/api/productcount", {
      method: "get",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    setCartProductCount(data?.data?.count)
  
  };

  console.log("cart-count", cartProductCount);
  useEffect(() => {
    // user details
    fetchUserDetails();
    fetchProductCount();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, //user detail fetch
          cartProductCount, // cart Products Count
          fetchProductCount //fetching Cart Product Count
        }}
      >
        <Toaster/>
       
        <Header />
        <main className="min-h-[calc(100vh-200px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
};

export default App;
