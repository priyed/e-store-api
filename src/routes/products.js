const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/products");

router.route("/").get(getAllProducts);
router.route("/:id").delete(deleteProduct).patch(updateProduct);

module.exports = router;
