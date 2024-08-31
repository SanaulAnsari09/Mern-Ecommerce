import React, {  useState } from "react";
import loginIcon from "../assest/login-hello.gif";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import imageToBase64 from "../helper/imageToBase64";
import SummaryApi from "../common";
import { toast } from "react-hot-toast";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    Name: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    ProfilePic: "",
  });

  // console.log("api-data", data.Name, data.Email, data.Password,data.ProfilePic)

  const navigate = useNavigate();

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

    if (data.Password === data.ConfirmPassword) {
      const dataResp = await fetch("http://localhost:8000/api/signup", {
        method: SummaryApi.signup.method,
        credentials:"include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          Name: data.Name,
          Email: data.Email,
          Password: data.Password,
          ProfilePic: data.ProfilePic
        }),
      });

      const userData = await dataResp.json();

      if (userData.success){
        toast.success(userData.message);
        navigate('/login');
      }

      if(userData.error){
        toast.error(userData.message);
      }
    } else {
      toast.error("Please check password and confirm password !");
    }
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const profileImage = await imageToBase64(file);

    console.log('profileimage',profileImage)
    setData((prev) => {
      return {
        ...prev,
        ProfilePic: profileImage,
      };
    });
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full w-full max-w-sm mx-auto rounded">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.ProfilePic || loginIcon} alt="login-icon" />
            </div>
            <form>
              <label>
                <div
                  className="bg-slate-200 bg-opacity-80 pb-3 pt-1 text-center absolute bottom-0 w-full cursor-pointer"
                  style={{ fontSize: "8px" }}
                >
                  Upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                ></input>
              </label>
            </form>
          </div>

          <form className="pt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name : </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="w-full h-full outline-none bg-transparent"
                  name="Name"
                  value={data.Name}
                  required
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className="grid">
              <label>Email : </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="w-full h-full outline-none bg-transparent"
                  name="Email"
                  value={data.Email}
                  required
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
                  required
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
            </div>
            <div className="grid">
              <label>Confirm Password : </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full h-full outline-none bg-transparent"
                  name="ConfirmPassword"
                  required
                  value={data.ConfirmPassword}
                  onChange={handleOnChange}
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <span>{showConfirmPassword ? <IoEyeOff /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-blue-700"
            >
              Sign Up
            </button>
          </form>

          <p className="my-5 ">
            Already have an account ?{" "}
            <NavLink to="/login" className="hover:text-blue-600 hover:underline">
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
