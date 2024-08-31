
async function userLogoutController(req, res){
    try{

        res.clearCookie('token');

        res.json({
            message:"Logout successfully !",
            error:false,
            success:true,
            data:[]
        })

    }catch(err){
        res.json({
            message:err.message,
            error:true,
            success:false
        })
    }
};

module.exports = userLogoutController;