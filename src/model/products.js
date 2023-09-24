const db = require("../database/db.js");

/* SEARCH PRODUCTS 
Write and export a new function named searchProducts in model/products.
This function should take a search string, then return any products in the products table 
whose name contains that string. Each product should include the id and name columns.
For example searchProducts("iscu") should return [{ id: 19, name: "Teatime Chocolate Biscuits" }].

This function is used in routes/search.js. 
Once you've finished it you should be able to visit /search in your browser
and use the search form to browse the products*/

const select_products = db.prepare(/*sql*/ `SELECT * FROM products`);

function listProducts() {
  return select_products.all();
}

const search_products = db.prepare(
  /*sql*/ `SELECT id, name FROM products WHERE name LIKE ?`
);

function searchProducts(searchQuery) {
  return search_products.all(`%${searchQuery}%`);
}

module.exports = { listProducts, searchProducts };
