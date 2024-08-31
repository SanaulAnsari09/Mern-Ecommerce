import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import ChangeUserRole from "../component/ChangeUserRole";

const AllUsers = () => {
  const [allUser, setAllUser] = useState([]);

  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    Email: "",
    Name: "",
    Role: "",
    _id:""
  });

  console.log("all-state-user", allUser);

  const findAllUsers = async () => {
    const users = await fetch("http://localhost:8000/api/all-user", {
      method: "get",
      credentials: "include",
    });

    const userData = await users.json();

    if (userData.success) {
      setAllUser(userData.data);
    }

    if (userData.error) {
      toast.error(userData.message);
    }
  };

  useEffect(() => {
    findAllUsers();
  }, []);

  console.log("all-user", allUser);

  return (
    <div className="">
      <table className="w-full user-table">
        <thead>
          <tr className="bg-black text-white">
            <th>Sr</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Profile</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUser?.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user?.Name}</td>
                <td>{user?.Email}</td>
                <td>{user?.Role}</td>
                <td className="flex justify-center">
                  {!user?.ProfilePic ? (
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJRS-4chjWMRAmrtz7ivK53K_uygrgjzw9Uw&s"
                      alt={user?.Name}
                      style={{
                        height: "40px",
                        width: "40px",
                        objectFit: "contain",
                      }}
                    ></img>
                  ) : (
                    <img
                      src={user?.ProfilePic}
                      alt={user?.Name}
                      style={{
                        height: "40px",
                        width: "40px",
                        objectFit: "contain",
                      }}
                    ></img>
                  )}
                </td>
                <td>{user?.createdAt?.split("T")[0]}</td>
                <td>
                  <button onClick={() =>{
                    setOpenUpdateRole(!openUpdateRole)
                    setUpdateUserDetails(user)
                  }}>
                    <FiEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {openUpdateRole && (
        <ChangeUserRole
          onClose={setOpenUpdateRole}
          Name={updateUserDetails.Name}
          Email={updateUserDetails.Email}
          Role={updateUserDetails.Role}
          UserId={updateUserDetails._id}
          callAllUsers={findAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
