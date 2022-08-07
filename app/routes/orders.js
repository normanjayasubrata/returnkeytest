const express = require("express");
const router = express.Router();
const query = require("../queries/orders");

router.get("/", (req, res) => {
  query.read().then((result) => {
    res.json(result);
  });
});

router.post("/", (req, res, next) => {
  query
    .create(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => next(err.message));
});

module.exports = router;
