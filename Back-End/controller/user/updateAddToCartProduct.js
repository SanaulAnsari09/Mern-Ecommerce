const cartModel = require("../../model/cartProduct");

const updateAddToCartProductController = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const cartProductId = req.body.productId;
    const qty = req.body.quantity;
    
    const updateProduct = await cartModel.updateOne({_id:cartProductId}, {
        ...(qty && {
            quantity: qty,
        }),
    });

    res.json({
      message: "Updated Product Successfully !",
      data: updateProduct,
      error: false,
      success: true,
    });


  } catch (err) {
    res.status(400).json({
      error: err.message || err,
      success: false,
      error: true,
    });
  }
};

module.exports = updateAddToCartProductController;