import React, { useContext, useEffect, useState } from "react";
import { FaSearchPlus } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { ImCart } from "react-icons/im";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { setUserDeatails } from "../store/userSlice";
import Context from "../context";
import logo from "../assest/shop-logo.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);

  const { user } = useSelector((state) => state?.user);

  const handleLogout = async () => {
    const fetchData = await fetch("http://localhost:8000/api/user-logout", {
      method: "get",
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      dispatch(setUserDeatails(null));
      toast.success(data.message);
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearchProduct = (e) =>{
    const {value} = e.target;
    if(value){
      navigate(`/search?q=${value}`);
    }else{
      navigate('/search');
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <NavLink to={"/"}>
            <div className="w-32">
            <img src={logo} />
            </div>
          </NavLink>
        </div>

        <div className="hidden  lg:flex items-center w-full justify-between max-w-sm border rounded focus-within:shadow-md pl-3">
          <input
            type="text"
            placeholder="search product here..."
            className="w-full outline-none"
            onChange={handleSearchProduct}
          />
          <div className="text-lg w-13 min-w-[50px] h-8 bg-blue-500 flex items-center justify-center rounded-r text-white cursor-pointer">
            <IoSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          {user?._id && (
            <div
              className="relative group flex justify-center"
              onClick={() => setMenuDisplay(!menuDisplay)}
            >
              <div className="text-3xl cursor-pointer">
                {!user?.ProfilePic ? (
                  <FaRegUserCircle />
                ) : (
                  <img
                    src={user?.ProfilePic}
                    alt={user.Name}
                    className="radius-circle"
                    style={{
                      height: "40px",
                      width: "40px",
                      objectFit: "cover",
                      objectPosition: "top",
                      backgroundPosition: "top",
                      borderRadius: "50%",
                    }}
                  />
                )}
              </div>
              {menuDisplay && (
                <div className="absolute bttom-0 top-11 h-fit shadow-lg rounded bg-slate-100 hover:bg-slate-200 transition-all">
                  <nav>
                    {user?.Role === "ADMIN" && (
                      <NavLink
                        to="/admin-panel/all-product"
                        className="whitespace-nowrap hidden md:block p-4"
                      >
                        Admin Pannel
                      </NavLink>
                    )}
                  </nav>
                </div>
              )}
            </div>
          )}

          {user?._id && (
            <NavLink to={"/cart"} className="text-2xl cursor-pointer relative">
              <span>
                <ImCart />
              </span>

              <div className="bg-blue-500 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </NavLink>
          )}

          <div>
            {!user?._id ? (
              <NavLink
                to="/login"
                className="px-3 py-1 rounded text-white bg-blue-600 hover:bg-blue-800"
              >
                Login
              </NavLink>
            ) : (
              <button
                className="px-3 py-1 rounded text-white bg-orange-600 hover:bg-orange-500"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
