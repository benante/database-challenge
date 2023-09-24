const db = require("../database/db.js");

/* CALCULATE STOCK VALUE 
Amend the query used in listProducts to also calculate the whatever
the result of multiplying unit_price by units_in_stock for each product.
Try to do this without writing any JavaScript.*/

// LIST
const select_products = db.prepare(
  /*sql*/ `SELECT unit_price * units_in_stock AS stock_value FROM products`
);
function listProducts() {
  return select_products.all();
}

// SEARCH
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
