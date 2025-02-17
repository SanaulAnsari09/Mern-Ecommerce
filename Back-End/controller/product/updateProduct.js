const productModel = require("../../model/productModel");
const uploadProductPermission = require("../../helper/permission");

const updateProductController = async (req, res) => {
  try {

    if(!uploadProductPermission(req.userId)){
        throw new Error("Permission denied !");
    }

    const {_id, ...resBody} = req.body;

    const updateProduct = await productModel.findByIdAndUpdate(_id, resBody);
    res.json({
        message:"Product Updated Successfully !",
        data:updateProduct,
        success:true,
        error:false
    })


  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = updateProductController;