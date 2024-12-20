const customerSchema = require("../Models/customer_schema.js");
const categorySchema = require("../Models/category_schema.js");
const productSchema = require("../Models/product_schema.js");
const cartSchema = require("../Models/cart_schema.js");
const OrderSchema = require("../Models/Order.js");
const ShippingSchema = require("../Models/Shipping.js");
const PaymentSchema = require("../Models/Payment.js");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const SECRETE_KEY = "PRODUCTS";
const mongoose = require("mongoose"); // Import mongoose if not already imported

const Register = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    const profile = req.file?.filename;
    let checkEmail = await customerSchema.findOne({ email: email });
    if (checkEmail) {
      console.log("Email already exists!");
      res.json({ message: "Email already exists!" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      let newcustomer = await new customerSchema({
        name,
        phone,
        email,
        password: hashedPassword,
        profile,
      });
      let savedcustomer = await newcustomer.save();
      console.log("New customer registered successfully");
      res.json({
        success: true,
        message: "New customer registered successfully",
        customer: savedcustomer,
      });
    }
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await customerSchema.findOne({ email: email });
    if (!user) {
      console.log("Email not found!");
      res.json({ message: "Email or Password Invalid!" });
    } else {
      let checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        console.log("Invalid Password!");
        res.json({ message: "Email or Password Invalid!" });
      } else {
        let userId = user.id;
        let token = await jsonwebtoken.sign(userId, SECRETE_KEY);
        console.log("Login successful!");
        res.json({
          message: "Login successful!",
          success: true,
          loggedInUser: user,
          authToken: token,
        });
      }
    }
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};
const viewcategory = async (req, res) => {
  try {
    let category = await categorySchema.find();
    console.log(category);
    res.json(category);
  } catch (error) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};
const viewproduct = async (req, res) => {
  try {
    let product = await productSchema.find().populate("category_id");
    // console.log(product);
    res.json(product);
  } catch (error) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};

const addtocart = async (req, res) => {
  try {
    const { product_id, customer_id, quantity } = req.body;

    // Check if the product is already in the cart for the given customer
    let productInCart = await cartSchema.findOne({ product_id, customer_id });

    if (!productInCart) {
      // If the product is not in the cart, insert it
      const newCart = new cartSchema({
        product_id,
        customer_id,
        quantity: quantity,
      });
      let savedCart = await newCart.save();
      console.log("Product added to cart successfully");
      res.json({
        message: "Product added to cart successfully",
        newProduct: savedCart,
      });
    } else {
      let newQ = +productInCart.quantity + +quantity;
      // If the product is already in the cart, update its quantity
      let updatedCartQuantity = {};
      if (quantity) {
        updatedCartQuantity.quantity = newQ;
      }
      productInCart = await cartSchema.findOneAndUpdate(
        { product_id, customer_id },
        { $set: updatedCartQuantity },
        { new: true }
      );
      console.log("Cart information updated successfully");
      res.json({
        message: "Cart information updated successfully",
        updatedProductQuantity: productInCart,
      });
    }
  } catch (error) {
    console.log("Error occurred" + error);
    res.json({ error: error });
  }
};



const updateCart = async (req, res) => {
  try {
    const { quantity } = req.body;

    // Check if the product is already in the cart for the given customer
    let cart = await cartSchema.findById(req.params.id);
    if (!cart) {
      console.log("Cart not found");
      return res.json("No cart found");
    } else {
      let updatedCartQuantity = {};
      if (quantity) {
        updatedCartQuantity.quantity = quantity;
      }
      cart = await cartSchema.findByIdAndUpdate(
        req.params.id,
        { $set: updatedCartQuantity },
        { new: true }
      );
      console.log("Cart information updated successfully");
      return res.json({
        message: "Cart updated successfully",
        updatedProductQuantity: cart,
      });
    }
  } catch (error) {
    console.log("Error occurred" + error);
    return res.json({ error: error });
  }
};




const viewcart = async (req, res) => {
  try {
    // const { customer_id } = req.body;
    let cart = await cartSchema
      .find({ customer_id: req.params.cust_id })
      .populate("product_id")
      .populate("customer_id");
    console.log(cart);
    res.json(cart);
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};

const deleteformcart = async (req, res) => {
  try {
    let cart = await cartSchema.findById(req.params.id);
    if (!cart) {
      console.log("cart Not found");
      res.json("No cart found");
    } else {
      console.log(cart);
      await cartSchema.findByIdAndDelete(req.params.id);
      console.log("Information deleted successfully");
      res.json({
        message: "Product removed from cart",
        deletedCart: cart,
      });
    }
  } catch (error) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};

const InsertOrder = async (req, res) => {
  try {
    const { cartData, order } = req.body;
    const { name, email, phone, address, state, pincode, paymethod, trans_id } =
      req.body.details;
    const sum = order.reduce((total, num) => total + num, 0);
    let total = order.map((price) => price);
    let orderD = {
      OrderDetails: cartData.map((item, index) => {
        return (o = {
          product_id: item.product_id,
          quantity: item.quantity,
          total: total[index],
        });
      }),
      GrandTotal: sum,
      User_id: req.customer,
      status: "pending",
    };
    // console.log(orderD);
    const StoreOrder = new OrderSchema(orderD);
    const savedOrder = await StoreOrder.save();

    const StoredShipping = new ShippingSchema({
      Order_id: savedOrder.id,
      name: name,
      email: email,
      phone: phone,
      address: address,
      state: state,
      pinCode: pincode,
      status: "Pending",
    });
    const savedShipping = await StoredShipping.save();

    const StorePayment = new PaymentSchema({
      payment_method: paymethod,
      Order_id: savedOrder.id,
      transaction_id: trans_id,
      status: "Pending",
    });
    const savedPayment = await StorePayment.save();
    res.json({ savedOrder, savedPayment, savedShipping, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserOrder = async (req, res) => {
  try {
    const order = await OrderSchema.find({ User_id: req.customer }).populate(
      "OrderDetails.product_id"
    );
    const shipping = await ShippingSchema.find().populate("Order_id");
    const payment = await PaymentSchema.find().populate("Order_id");
    // .populate("OrderDetails.product_id");

    res.json({ order, shipping, payment, success: true });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: err.message });
  }
};
module.exports = {
  Register,
  Login,
  addtocart,
  viewproduct,
  deleteformcart,
  viewcart,
  viewcategory,
  updateCart,
  InsertOrder,
  getUserOrder,
};
