const cartModel = require("../../model/cartProduct");

const cartProductListController = async (req, res) => {
  try {
    const currentUser = req?.userId;

    const allProductList = await cartModel.find({
      userId: currentUser,
    }).populate("productId")

    res.json({
      message: "All Cart ProductList",
      success: true,
      error: false,
      data: allProductList,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = cartProductListController;