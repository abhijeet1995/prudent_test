const express = require("express");
const router = express.Router();
const verifyUser = require('../midlleware/auth')
const { uploadProduct,all,singleProduct } = require('../controllers/product')







router.post("/upload",   uploadProduct);
router.get("/allproduct", verifyUser, all)
router.get("/singleproduct/:id", verifyUser, singleProduct)


module.exports = router;