const knex = require("../../db/knex");
const tableName = "statusorder_identifier";

class OrdersQuery {
  static read({ id } = {}) {
    if (id) {
      return knex.select().table(tableName).where("id", id);
    } else {
      return knex.select().table(tableName).orderBy("id", "asc");
    }
  }

  static create(payload) {
    return knex(tableName).returning("*").insert(payload);
  }
}

module.exports = OrdersQuery;
