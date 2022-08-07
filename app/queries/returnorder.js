const knex = require("../../db/knex");
const tableName = "returnorder";

class OrdersQuery {
  static read({ id, return_id, item_id } = {}) {
    if (id && !return_id && !item_id) {
      return knex.select().table(tableName).where("id", id);
    } else if (!id && return_id && !item_id) {
      return knex.select().table(tableName).where("return_id", return_id);
    } else if (!id && return_id && item_id) {
      return knex.select().table(tableName).where({ return_id, item_id });
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
