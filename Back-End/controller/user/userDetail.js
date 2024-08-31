const userModel = require("../../model/userModel");

async function userDetailController(req, res){

    try{
        console.log("user-id", req.userId);
        const user = await userModel.find({_id:req.userId});
        const data = user[0];
        
        res.status(200).json({
            data:data,
            error:false,
            success:true,
            message:"login user details"
        });
    }catch(error){
        res.status(400).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
};

module.exports = userDetailController;