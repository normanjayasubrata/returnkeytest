/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema.createTable("statusorder_identifier", (table) => {
      table.increments("id");
      // table.float("total_refund").notNullable();
      table.string("return_status").notNullable();
      table.timestamp("created_date").defaultTo(knex.fn.now());
      // table.unique("id");
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable("statusorder_identifier");
  };
  