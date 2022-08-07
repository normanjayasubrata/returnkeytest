/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("returnorder", (table) => {
    table.increments("id");
    table.integer("return_id").notNullable();
    table.string("order_id").notNullable();
    table.string("email_address").notNullable();
    table.float("price_refund").notNullable();
    table.string("item_id").notNullable();
    table.string("item_name").notNullable();
    table.string("qc_status");
    table.timestamp("created_date").defaultTo(knex.fn.now());
    table
      .foreign("return_id")
      .references("id")
      .inTable("statusorder_identifier");
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("returnorder");
};
