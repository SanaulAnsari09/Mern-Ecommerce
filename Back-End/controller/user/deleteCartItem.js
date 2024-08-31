const cartModel = require("../../model/cartProduct");

const deleteCartItemController = async (req, res) => {
  try {
    const { productId } = req.body;

    const deleting = await cartModel.deleteOne({ _id: productId });

    res.json({
      message: "Product Deleted Successfully !",
      error: false,
      success: true,
      data: deleting,
    });
  } catch (err) {
    res.json({
      error: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = deleteCartItemController