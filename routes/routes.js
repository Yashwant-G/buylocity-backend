const express = require('express');
const router=express.Router();
const {create_order, verify_order}=require('../controllers/razorpay')

router.post("/order/create",create_order);
router.post("/order/verify",verify_order);

module.exports = router