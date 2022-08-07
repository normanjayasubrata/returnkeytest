const knex = require("../../db/knex");
const tableName = "orders";

class OrdersQuery {
  static read({ id, order_id, email_address, ids } = {}) {
    if (id && !order_id && !email_address && !ids) {
      return knex.select().table(tableName).where("id", id);
    } else if (order_id && !id && !email_address && !ids) {
      return knex.select().table(tableName).where("order_id", order_id);
    } else if (email_address && !id && !order_id && !ids) {
      return knex
        .select()
        .table(tableName)
        .where("email_address", email_address);
    } else if (order_id && email_address && !id && !ids) {
      return knex
        .select()
        .table(tableName)
        .where("order_id", order_id)
        .andWhere("email_address", email_address);
    } else if (!email_address && !id && !order_id && ids) {
        return knex.select().table(tableName).whereIn("id", ids);
    } else {
      return knex.select().table(tableName).orderBy("id", "asc");
    }
  }

  static create(payload) {
    return knex(tableName).returning("*").insert(payload);
  }

  static update(id, payload) {
    return knex(tableName).returning("*").where("id", "=", id).update(payload);
  }

  static delete(id) {
    return knex(tableName).where("id", id).del();
  }
}

module.exports = OrdersQuery;
