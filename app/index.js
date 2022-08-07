require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

// routes declares
// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const orderRouter = require("./routes/orders");
const pendingRouter = require("./routes/pending");
const returnsRouter = require("./routes/returns");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// routes use
app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to Norman's API" });
});
app.use('/orders', orderRouter);
app.use('/pending', pendingRouter);
app.use('/returns', returnsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // Passing the error JSON
  res.status(err.status || 400);
  res.json({
    error: req.app.get("env") === "development" ? err : {},
    message: err.message,
  });
});

module.exports = app;
