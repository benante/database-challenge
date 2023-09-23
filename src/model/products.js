const db = require("../database/db.js");

/* LIST ALL PRODUCTS
Write and export a new function named listProducts in model/products.js. 
This function should retrieve all products from the products DB table and
return the id, name, quantity_per_unit, unit_price, units_in_stock and units_on_order columns.

This function is used in routes/products.js.
Once you've finished it you should be able to see a table of all products 
if you visit the / route in your browser.*/
const select_products = db.prepare(/*sql*/ `SELECT * FROM products`);

function listProducts() {
  return select_products.all();
}
console.log();

module.exports = { listProducts };
