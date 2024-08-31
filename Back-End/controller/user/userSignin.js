const userModel = require("../../model/userModel");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");
const TOKEN_SECRET_KEY = 'HJMSJKMNAHDHJASFDGDGFDSFDSFDSFDGFHGHJGH';

async function userSignInController(req, res){

  try {

    const {Email, Password} = req.body;
    
    if(!Email) throw new Error("Please Provide Email");
    if(!Password) throw new Error("Please Provide Password");

    const user = await userModel.findOne({Email});

    if(!user){
        throw new Error("User not found");
    };

    const checkPassword = await bcrypt.compare(Password , user.Password);

    if(checkPassword){
      
      const tokenData = {
        _id : user._id,
        Email: user.Email
      }

      const token = await jwt.sign(tokenData, TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8});
      
      const tokenOption = {
        httpOnly:true,
        secure:true
      }
      
      res.cookie('token', token, tokenOption).json({
        message:"Login Successfully !",
        data:token, 
        success:true,
        error:false
      });
      
    }else{
        throw new Error("Please Check The Password");
    }

  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }

}

module.exports = userSignInController;
