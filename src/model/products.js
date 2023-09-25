const db = require("../database/db.js");

/* FORMAT CURRENCIES
The currencies in the products table are just normal numbers,
with an arbitrary number of decimal places.
It would be more user-friendly to format these as 
currency values rounded to 2 decimal places. 
Use the built-in SQLite format function to format the unit_price 
and stock_value columns as 2-decimal-place GBP (e.g. £2.57).*/

// LIST
const select_products = db.prepare(/*sql*/ `SELECT id,
    name,
    quantity_per_unit,
    FORMAT('£%.2f', unit_price) AS unit_price,
    units_in_stock,
    FORMAT('£%.2f', unit_price * units_in_stock) AS stock_value,
    units_on_order
  FROM products`);
function listProducts() {
  return select_products.all();
}

// SEARCHgit
const search_products = db.prepare(
  /*sql*/ `SELECT id, name FROM products WHERE name LIKE ?`
);
function searchProducts(searchQuery) {
  return search_products.all(`%${searchQuery}%`);
}

const search_single_product =
  db.prepare(/*sql*/ `SELECT products.id, products.name,
  categories.name AS category_name,
  categories.description AS category_description
  FROM products 
  JOIN categories
  ON products.category_id = categories.id
  WHERE products.id = ? `);
function getProduct(id) {
  return search_single_product.get(id);
}

module.exports = { listProducts, searchProducts, getProduct };
