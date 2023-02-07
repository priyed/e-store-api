const express = require("express");
const router = express.Router();

const {
  getProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/products");

router.route("/").get(getAllProducts);
router.route("/:id").get(getProduct).delete(deleteProduct).patch(updateProduct);

module.exports = router;
