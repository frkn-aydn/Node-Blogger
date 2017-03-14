const db = require("./db");
const users = require("./users");
const articles = require("./articles");


exports.users = users.users; 
exports.articles = articles.articles;

exports.db = { articles:db.articles, users:db.users };
