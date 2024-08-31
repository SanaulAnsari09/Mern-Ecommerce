const productModel = require("../../model/productModel");

const getProductDeatialsController = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await productModel.findById(productId);

    console.log(product);

    res.status(200).json({
      message: "Single Product",
      success: true,
      error: false,
      data: product,
    });
  } catch (err) {
    res.json({
      error: err?.message || err,
      success: false,
      error: true,
    });
  }
};

module.exports = getProductDeatialsController;