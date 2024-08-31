const userModel = require("../model/userModel");

const uploadProductPermission = async (userId) => {
  const user = await userModel.findById(userId);

  if (user.Role !== "ADMIN") {
    return false;
  }
  return true;
};

module.exports = uploadProductPermission;
