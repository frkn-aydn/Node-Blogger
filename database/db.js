"use strict";
const mongodb = require("mongodb");

const dbAddr = process.env.BloggerDB || "mongodb://127.0.0.1:27017/BloggerDB";
if (!dbAddr) throw new Error("BloggerDB environment variable is not set");

const db = mongodb.MongoClient.connect(dbAddr);

exports.articles = db.then(db => db.collection("articles"));
exports.users = db.then(db => db.collection("users"));
