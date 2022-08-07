const express = require("express");
const router = express.Router();
const returnQuery = require("../queries/returnorder");
const orderQuery = require("../queries/orders");
const statusOrder = require("../queries/statusorder");
const jwt = require("jsonwebtoken");
const secretOrPrivateKey = process.env.SECRET_KEY || "returnkeysecret";

router.post("/", (req, res, next) => {
  const { token } = req.body;
  const { email_address, order_id } = jwt.verify(token, secretOrPrivateKey);
  if (!order_id && !email_address) {
    next(new Error("Token Not Valid").message);
  } else {
    orderQuery
      .read({ email_address, order_id })
      .then((results) => {
        const total_refund = results
          .map((item) => item.price)
          .reduce((prev, curr) => prev + curr, 0);

        statusOrder
          .create({ return_status: "AWAITING_APPROVAL" })
          .then((result) => {
            const return_id = result[0].id;
            const return_status = result[0].return_status;

            const fieldToInsert = results.map((result) => {
              const { email_address, order_id, price, sku, item_name } = result;
              return {
                return_id,
                email_address,
                order_id,
                price_refund: price,
                item_id: sku,
                item_name,
              };
            });

            returnQuery
              .create(fieldToInsert)
              .then(() => {
                res.json({
                  message: "Return Has Been Created",
                  data: {
                    return_id,
                    total_refund,
                    return_status,
                  },
                });
              })
              .catch((err) => next(err.message));
          })
          .catch((err) => next(err.message));
      })
      .catch((err) => next(err.message));
  }
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  statusOrder
    .read({ id })
    .then((result) => {
      if (result.length === 0) {
        next(new Error(`No Return with ID ${id} Found`).message);
      } else {
        const { id, return_status } = result[0];
        returnQuery
          .read({ return_id: id })
          .then((results) => {
            const countedValue = [];
            for (let index = 0; index < results.length; index++) {
              if (results[index].qc_status !== "REJECTED") {
                countedValue.push(results[index].price_refund);
              }
            }
            const total_refund = countedValue.reduce(
              (prev, curr) => prev + curr,
              0
            );
            const showedResult = results.map((data) => {
              const {
                email_address,
                order_id,
                price_refund,
                qc_status,
                item_id,
                item_name,
              } = data;
              return {
                email_address,
                order_id,
                price_refund,
                qc_status,
                item_id,
                item_name,
              };
            });
            res.json({
              return_id: id,
              total_refund,
              return_status,
              detail: showedResult,
            });
          })
          .catch((err) => next(err.message));
      }
    })
    .catch((err) => next(err.message));
});

router.put("/:id/items/:itemId/qc/status", (req, res, next) => {
  const { id, itemId } = req.params;
  const { status } = req.body;
  const statuses = ["ACCEPTED", "REJECTED"];
  console.log("norman", statuses.includes(status));
  if (!status || !statuses.includes(status)) {
    next(
      new Error("Please Insert Status in body between 'ACCEPTED' or 'REJECTED'")
        .message
    );
  } else {
    returnQuery
      .read({ return_id: id, item_id: itemId })
      .then((data) => {
        if (data.length === 0) {
          next(
            new Error(`No Return with ID ${id} and Item ${itemId} Found`)
              .message
          );
        } else {
          const { id } = data[0];
          const payload = { ...data[0], qc_status: status };
          returnQuery
            .update(id, payload)
            .then((result) => {
              res.json({ message: "Record Updated", record_detail: result[0] });
            })
            .catch((err) => next(err.message));
        }
      })
      .catch((err) => next(err.message));
  }
});

module.exports = router;
