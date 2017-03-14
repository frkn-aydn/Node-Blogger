const db = require("./db");
const users = require("./users");
const articles = require("./articles");


exports.users = users.users; 
exports.db = { blogs:db.articles, users:db.users };
