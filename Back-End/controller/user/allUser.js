const userModel = require("../../model/userModel");

async function allUserController(req,res){
    try{
        
        const findUser = await userModel.find({});

        if(!findUser) throw new Error("Something went wrong");
        
        res.status(200).json({
            data:findUser,
            message:"All User List",
            error:false,
            success:true
        })

        console.log("userid", req.userId);



    }catch(err){
        res.status(400).json({
            message:err.message,
            error:true,
            success:false
        });
    }
};

module.exports = allUserController;