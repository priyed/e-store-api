require("dotenv").config();
// async errors

const express = require("express");
const app = express();

const not_found_middleware = require("./src/middleware/not-found");
const error_middleware = require("./src/middleware/error-handler");

// middlware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products"> products route</a>');
});

const port = process.env.PORT || 8000;

// products route

app.use(not_found_middleware);
app.use(error_middleware);

const start = async () => {
  try {
    //connectDB
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
