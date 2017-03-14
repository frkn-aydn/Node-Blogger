const db = require("./db");
const users = require("./users");

exports.users = users.users; 
exports.db = { blogs:db.articles, users:db.users };
