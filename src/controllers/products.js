const Product = require("../models/product");
const { createError } = require("../errors/custom-error.js");

const deleteProduct = async (req, res, next) => {
  const product_id = req.params.id;
  const product = await Product.findOneAndDelete({ _id: product_id });
  if (!product) {
    return next(createError(`No product with id: ${product_id}`, 400));
  }

  res.status(200).send({ message: `Product with id: ${product_id} deleted.` });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numeric_filters } = req.query;
  const query_object = {};

  if (featured) {
    query_object.featured = featured === "true" ? true : false;
  }
  if (company) {
    query_object.company = company;
  }

  if (name) {
    query_object.name = { $regex: name, $options: "i" };
  }

  if (numeric_filters) {
    const operator_map = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const reg_ex = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numeric_filters.replace(
      reg_ex,
      (match) => `-${operator_map[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        query_object[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(query_object);

  // sort
  if (sort) {
    const sort_list = sort.split(",").join(" ");
    result = result.sort(sort_list);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fields_list = fields.split(",").join(" ");
    result = result.select(fields_list);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

const updateProduct = async (req, res, next) => {
  const product_id = req.params.id;
  const product = await Product.findOneAndUpdate(
    { _id: product_id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!product) {
    return next(createError(`No product with id: ${product_id}`, 400));
  }

  res.status(200).send({
    message: `Product with id: ${product_id} updated.`,
    data: product,
  });
};

module.exports = {
  deleteProduct,
  getAllProducts,
  updateProduct,
};
