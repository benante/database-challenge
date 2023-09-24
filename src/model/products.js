const db = require("../database/db.js");

/* ADD CATEGORY INFO
Amend the query used in getProduct to also include columns called 
category_name and category_description. You will need to retrieve this info
from the categories table.

Once complete you should see this additional info show up on the product pages in your browser
  (e.g. /product/1). */

// LIST
const select_products = db.prepare(/*sql*/ `SELECT * FROM products`);
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
