/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("orders", (table) => {
    table.increments("id");
    table.string("order_id").notNullable();
    table.string("email_address").notNullable();
    table.string("sku").notNullable();
    table.integer("quantity").notNullable();
    table.float("price").notNullable();
    table.string("item_name").notNullable();
    table.timestamp("created_date").defaultTo(knex.fn.now());
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("orders");
};
