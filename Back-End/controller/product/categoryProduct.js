const productModel = require("../../model/productModel");

const getCategoryProductController = async (req, res) => {
  try {
    const productCategory = await productModel.distinct("Category");

    // array to store one product from each category
    const productByCategory = [];

    for (const Category of productCategory) {
      const product = await productModel.findOne({Category});

      if (product) {
        productByCategory.push(product);
      }
    }

    res.status(200).json({
      message: "Category Product",
      data: productByCategory,
      success: true,
      error: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getCategoryProductController;
