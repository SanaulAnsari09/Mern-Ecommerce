const userModel = require("../../model/userModel");

async function updateUserController(req, res){
    try{

        const sessionUser = req.userId;

        const {UserId, Email, Name, Role} = req.body;

        const payload = {
            ...(Email && {Email:Email}),
            ...(Name && {Name:Name}),
            ...(Role && {Role:Role}),
        };

        const user = await userModel.findById(sessionUser);

        console.log("user-role",user.Role)

        const updateUser = await userModel.findByIdAndUpdate(UserId, payload);
        
        console.log("updateUser", updateUser);
        
        res.json({
            data:updateUser,
            message:"User Updated !",
            success:true,
            error:false
        });

    }catch(err){
        res.status(400).json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
};

module.exports = updateUserController;