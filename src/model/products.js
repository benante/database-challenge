const db = require("../database/db.js");

/* GET SPECIFIC PRODUCT
 Write and export a new function named getProduct in model/products.
It should take an ID, then return the matching product from the productstable. 
It should return theidandname columns.

This function is used in routes/product.js.
 Once you've finished it you should be able to see a page for one specific product if you visit the
 /product/:id in your browser (e.g. /product/1, /product/34 etc).  */

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

const search_single_product = db.prepare(
  /*sql*/ `SELECT id, name FROM products WHERE id = ?`
);
function getProduct(id) {
  return search_single_product.get(id);
}

module.exports = { listProducts, searchProducts, getProduct };
