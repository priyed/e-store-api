require("dotenv").config();
// async errors
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./src/db/connect");
const productsRouter = require("./src/routes/products");
const notFoundMiddleware = require("./src/middleware/not-found");
const errorMiddleware = require("./src/middleware/error-handler");

// middlware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products"> products route</a>');
});
app.use("/api/v1/products", productsRouter);

const port = process.env.PORT || 8000;

// products route

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    //connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
