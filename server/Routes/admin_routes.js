const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  Register,
  Login,
  InsertCategory,
  getAllCategories,
  GetSingleCategory,
  UpdateCategory,
  DeleteCategory,
  Insertproduct,
  GetAllProducts,
  GetSingleProduct,
  updateProduct,
  DeleteProduct,
  GetAllCustomers,
  GetOrder,
  updateOrder,
  updatePayment,
  updateCashOrder,
  InsertService,
  getAllServices,
  GetSingleService,
  updateService
} = require("../Controllers/Admin");

const storageAdmin = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/admin/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const uploadAdmin = multer({ storage: storageAdmin });

//category
const storageCategory = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/category/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const uploadCategory = multer({ storage: storageCategory });

//product
const storageProduct = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/product/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const uploadProduct = multer({ storage: storageProduct });


//service multer
const storageService = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/service/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const uploadService = multer({ storage: storageService });



//admin
router.post("/Register", uploadAdmin.single("profile"), Register);
router.post("/login", Login);

//category
router.post(
  "/insertCategory",
  uploadCategory.single("picture"),
  InsertCategory
);
router.get("/getAllCategories", getAllCategories);
router.get("/getSingleCategory/:id", GetSingleCategory);
router.put(
  "/updateCategory/:id",
  uploadCategory.single("picture"),
  UpdateCategory
);
router.delete("/deleteCategory/:id", DeleteCategory);

//product
router.post("/insertProduct", uploadProduct.single("picture"), Insertproduct);
router.get("/getAllProducts", GetAllProducts);
router.get("/getSingleProduct/:id", GetSingleProduct);
router.put(
  "/updateProduct/:id",
  uploadProduct.single("picture"),
  updateProduct
);
router.delete("/deleteProduct/:id", DeleteProduct);

//customers
router.get("/getAllCustomers", GetAllCustomers);

//orders
router.get("/getOrder", GetOrder);
router.put("/updateOrder/:id", updateOrder);

//payments
router.put("/updatePayment/:id", updatePayment);
router.put("/updateCashOrder/:id", updateCashOrder);

//services
router.post("/insertService", uploadService.single("picture"),  InsertService); //insert service
router.get("/getAllServices", getAllServices); //get all services
router.get("/getSingleService/:id", GetSingleService); // get single service
router.put(
  "/updateService/:id",
  uploadService.single("picture"),
  updateService
); //update service
module.exports = router;
