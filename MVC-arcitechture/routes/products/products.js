const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
} = require("../../controllers/products/product.controllers");
const router = express.Router();

router.get("/",getAllProducts)
.get('/:id',getProductById)
.post('/',createProduct);
;

module.exports = router;