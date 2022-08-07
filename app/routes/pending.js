const express = require("express");
const router = express.Router();
const query = require("../queries/orders");
const jwt = require("jsonwebtoken");
const secretOrPrivateKey = process.env.SECRET_KEY || "returnkeysecret";

router.post("/returns", (req, res, next) => {
  const { order_id, email_address } = req.body;
  if (!order_id || order_id.trim() === "") {
    next(new Error("order_id required").message);
  } else if (!email_address || email_address.trim() === "") {
    next(new Error("email_address required").message);
  } else {
    query
      .read({ email_address, order_id })
      .then((result) => {
        if (result.length === 0) {
          next(
            new Error(
              `No Order ID ${order_id} with email ${email_address} Found`
            ).message
          );
        } else {
          var token = jwt.sign({ email_address, order_id }, secretOrPrivateKey);
          res.json({ token });
        }
      })
      .catch((err) => next(err.message));
  }
});

module.exports = router;
