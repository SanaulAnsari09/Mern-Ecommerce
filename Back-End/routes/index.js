const express = require("express");
const { userSignUpController } = require("../controller/user/userSignup");
const userSignInController = require("../controller/user/userSignin");
const userDetailController = require("../controller/user/userDetail");
const authToken = require("../middleware/authToken");
const userLogoutController = require("../controller/user/userLogout");
const allUserController = require("../controller/user/allUser");
const updateUserController = require("../controller/user/updateUser");
const uploadProductController = require("../controller/product/uploadProduct");
const getProductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const getCategoryProductController = require("../controller/product/categoryProduct");
const categoryProductListController = require("../controller/product/categoryProductList");
const getProductDeatialsController = require("../controller/product/getProductDeatails");
const addToCartController = require("../controller/user/addToCart");
const countAddToCartProduct = require("../controller/user/countAddToCartProduct");
const cartProductListController = require("../controller/user/cartProcutList");
const updateAddToCartProductController = require("../controller/user/updateAddToCartProduct");
const deleteCartItemController = require("../controller/user/deleteCartItem");
const searchProductController = require("../controller/product/searchProduct");

const router = express.Router();

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-detail", authToken, userDetailController);
router.get("/user-logout", userLogoutController);

//admin panel
router.get("/all-user", authToken, allUserController);
router.post("/update-user", authToken, updateUserController);

//product
router.post("/upload-product", authToken, uploadProductController);
router.get("/all-product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/getcategory-product", getCategoryProductController);
router.post("/category-product-list", categoryProductListController);
router.post("/product-details", getProductDeatialsController);
router.get("/searchproduct", searchProductController);

//user add to cart

router.post("/addtocart", authToken, addToCartController);
router.get("/productcount", authToken, countAddToCartProduct);
router.get("/cartproductlist", authToken, cartProductListController);
router.post("/updatecartproduct", authToken, updateAddToCartProductController);
router.post("/deletecartitem", authToken, deleteCartItemController);

module.exports = router;
