import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-hot-toast";

const ChangeUserRole = ({ Name, Email, Role, onClose,UserId,callAllUsers  }) => {
  const [userRole, setUserRole] = useState(Role);

  const handleRoleChange = (e) => {
    setUserRole(e.target.value);
  };


  const updateUserRole = async () => {

    
    const updatingRole = await fetch("http://localhost:8000/api/update-user", {
        method:"post",
        credentials:"include",
        headers:{'content-type':'application/json'},
        body:JSON.stringify({UserId:UserId , Role:userRole})
    });
    const updatedResponse = await updatingRole.json();

    if(updatedResponse.success){
      toast.success(updatedResponse.message);
      onClose(false);
      callAllUsers();
    };

    console.log('updating-response',updatedResponse);  
  
  };

  

  return (
    <div className="fixed h-full w-full z-10 flex justify-center items-center top-0 bottom-0 right-0 left-0 bg-slate-200 bg-opacity-60">
      <div className="bg-white shadow-md p-5 w-full max-w-md">
        <button className="block ml-auto text-xl" onClick={()=>onClose(false)}>
          <IoClose />
        </button>
        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>

        <div className="flex justify-between items-center pb-2">
          <p>Name :</p>
          <p>{Name}</p>
        </div>
        <div className="flex justify-between items-center pb-2">
          <p>Email :</p>
          <p>{Email}</p>
        </div>

        <div
          className="flex justify-between items-center"
        >
          <p>Role : </p>
          <select className="border px-4 py-1"
            name="Role"
            onChange={handleRoleChange}
            value={userRole}
          >
            <option value={"ADMIN"}>ADMIN</option>
            <option value={"GENERAL"}>GENERAL</option>
          </select>
        </div>

        <button
          className="w-fit mx-auto block border py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700 mt-4"
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
