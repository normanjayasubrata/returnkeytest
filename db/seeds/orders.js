/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const Orders = require("../data/orders");
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("orders").del();
  await knex("orders").insert(Orders);
};
