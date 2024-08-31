const productModel = require("../../model/productModel");

const searchProductController = async (req, res) => {
  try {
    const query = req?.query?.q;
    const regex = new RegExp(query, 'i','g');
    const product = await productModel.find({
      $or: [
        {
          ProductName: regex,
        },
        {
          Category: regex,
        },
        {
          BrandName: regex,
        },
      ],
    });
    res.json({
      data: product,
      message: "Search Product List",
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};

module.exports = searchProductController;
