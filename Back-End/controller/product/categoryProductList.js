const productModel = require("../../model/productModel");

const categoryProductListController = async (req, res) => {
  try {
    const { Category } = req?.body || req?.query;
    const product = await productModel.find({ Category });

    res.status(200).json({
      data: product,
      message: "Get Category Wise Product List",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = categoryProductListController;
