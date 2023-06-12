const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

exports.create_order = async (req, res) => {
  var instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

  var options = {
    amount: req.body.amount * 100, // amount in the smallest currency unit
    currency: "INR",
  };
  instance.orders.create(options, function (err, order) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "could not create backend order",
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      message: "successfully created backend order",
      order: order,
    });
  });
};
exports.verify_order = async (req, res) => {
  let body =
    req.body.response.razorpay_order_id +
    "|" +
    req.body.response.razorpay_payment_id;
  var signature = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(body.toString())
    .digest("hex");
  if (signature === req.body.response.razorpay_signature) {
    console.log("Payment is Authorised");
    return res.status(200).json({
      success: true,
      message: "Payment is Authorised",
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Payment is not Authorised",
    });
  }
};
