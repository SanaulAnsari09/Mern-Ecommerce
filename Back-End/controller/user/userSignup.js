const userModel = require("../../model/userModel");
const bcrypt = require('bcryptjs');

async function userSignUpController(req, res) {
    const body  = req.body;
    const {Name, Email, Password, ProfilePic} = body;
  
    try {

    const user = await userModel.findOne({Email});

    if(user) throw new Error("Already user exist !");

    if(!Email) throw new Error("Please provide email");
    
    if(!Password) throw new Error("Please provide password");

    if(!Name) throw new Error("Please Provide Name");

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(Password, salt);

    if(!hashPassword) throw new Error("Something is wrong");

    const payload = {
        ...body,
        Role:"GENERAL",
        Password:hashPassword
    };

    const userData = new userModel(payload);
    const saveUser = await userData.save();

    res.status(201).json({
        data:saveUser,
        success:true,
        error:false,
        message:"User created Successfully !"
    })

  } catch (err) {
    res.json({
      message:err.message || err,
      error: true,
      success: false,
    });
  }
};


module.exports = {userSignUpController};
