const express = require("express");
const router = express.Router();
const multer = require("multer");
const fetchCustomer = require("../middleware/Customer");
const {
  Register,
  Login,
  viewproduct,
  addtocart,
  viewcart,
  deleteformcart,
  viewcategory,
  updateCart,
  InsertOrder,
  getUserOrder,
} = require("../Controllers/Customer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/customer/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post("/Register", upload.single("profile"), Register);
router.post("/login", Login);
router.get("/viewAllProducts", viewproduct);
router.get("/viewAllCategories", viewcategory);
router.post("/addToCart", addtocart);
router.get("/viewCart/:cust_id", viewcart);
router.delete("/deleteFromCart/:id", deleteformcart);
router.put("/updateCart/:id", updateCart);
router.post("/insertOrder", fetchCustomer, InsertOrder);
router.get("/getUserOrder", fetchCustomer, getUserOrder);

module.exports = router;
