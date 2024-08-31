const cartModel = require("../../model/cartProduct");

const countAddToCartProduct = async (req, res) => {
  try {
    const userId = req?.userId;

    const countNum = await cartModel.countDocuments({
      userId: userId,
    });

    res.json({
      data: {
        count: countNum,
      },
      message: "Count of Product",
      error: false,
      success: true,
    });

  } catch (err) {
    res.json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};

module.exports = countAddToCartProduct;