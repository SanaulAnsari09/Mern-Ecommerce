import React, { useContext, useState } from "react";
import loginIcon from "../assest/login-hello.gif";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-hot-toast";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    Email: "", 
    Password: "",
  });
  const navigate = useNavigate();

  const {fetchUserDetails, fetchProductCount} = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const dataResponse = await fetch("http://localhost:8000/api/signin", {
      method:SummaryApi.signin.method,
      credentials:"include",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(data),
    })

    const dataApi = await dataResponse.json();

    if(dataApi.success){
      toast.success(dataApi.message);
      navigate("/");
      fetchUserDetails();
      fetchProductCount()
    }
    if(dataApi.error){
      toast.error(dataApi.message);
    }
  };


  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full w-full max-w-sm mx-auto rounded">
          <div className="w-36 h-36 mx-auto">
              <img src={loginIcon} alt="login-icon" />
          </div>

          <form className="pt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Email : </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="w-full h-full outline-none bg-transparent"
                  name="Email"
                  value={data.Email}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className="grid">
              <label>Password : </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="w-full h-full outline-none bg-transparent"
                  name="Password"
                  value={data.Password}
                  onChange={handleOnChange}
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span>{showPassword ? <IoEyeOff /> : <FaEye />}</span>
                </div>
              </div>
              <NavLink
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-600"
              >
                Forgot Password ?
              </NavLink>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-blue-700"
            >
              Login
            </button>
          </form>

          <p className="my-5 ">
            Don't have account ?{" "}
            <NavLink
              to="/sign-up"
              className="hover:text-blue-600 hover:underline"
            >
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>
    </section>
  );
};
export default Login;
