import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const AdminPanel = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state?.user);

    useEffect(()=>{
      if(user?.Role !=="ADMIN"){
        navigate("/");
      }
    },[user]);

  return (
    <div className="min-h-[calc(100vh-120px)] flex hidden md:flex">
      <aside className="min-h-full w-full max-w-60 customShadow bg-slate-100">
        <div className="h-32 flex justify-center items-center flex-col mt-4">
          <div className="text-4xl cursor-pointer relative flex justify-center bg-slate-300 p-1 rounded-full">
            {!user?.ProfilePic ? (
              <FaRegUserCircle />
            ) : (
              <img
                src={user?.ProfilePic}
                alt={user.Name}
                className="radius-circle"
                style={{
                  height: "80px",
                  width: "80px",
                  objectFit: "cover",
                  objectPosition: "top",
                  backgroundPosition: "top",
                  borderRadius: "50%",
                  padding:"1px"
                }}
              />
            )}
          </div>

          <h6 className="capitalize text-lg font-semibold">{user?.Name}</h6>
          <p className="text-sm">{user?.Role}</p>
        </div>

                {/* navigation */}
        <div>
           <nav className="grid p-4 gap-2">
                <NavLink to="all-users" className={"px-2 py-2 bg-slate-300 rounded text-slate-700 hover:text-white hover:bg-slate-500 transition-all"}>All User's</NavLink>
                <NavLink to="all-product" className={"px-2 py-2 bg-slate-300 rounded text-slate-700 hover:text-white hover:bg-slate-500 transition-all"}>Product</NavLink>
           </nav>
        </div>
      </aside>
      <main className="w-full h-full p-2">
        <Outlet/>
      </main>
    </div>
  );
};

export default AdminPanel;
