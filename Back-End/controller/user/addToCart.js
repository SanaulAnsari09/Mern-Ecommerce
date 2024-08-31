const cartModel = require("../../model/cartProduct");

const addToCartController = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currentUser = req?.userId;

    const isProcutAvailable = await cartModel.findOne({ productId });

    console.log("isProcutAvailable", isProcutAvailable);
    if (isProcutAvailable) {
      return res.status(200).json({
        message: "Product Available in Cart !",
        success: false,
        error: true,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    const newProduct = new cartModel(payload);

    const savingProduct = await newProduct.save();

    res.json({
      message: "Product Added Successfully !",
      success: true,
      error: false,
      data: savingProduct,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};

module.exports = addToCartController;
