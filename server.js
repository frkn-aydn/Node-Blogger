const express = require('express');
const session = require('express-session')
const exphbs = require('express-handlebars');
const routers = require("./routers/index");
const cookieParser = require('cookie-parser');
const MongoStore = require("connect-mongo")(session);
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000;
const database = require("./database/index");
let install = false;
const app = express();

database.db.users.then(users => {
  users.findOne({
    admin: true
  }).then(user => {
    if (!user) install = true;
  })
})

app
  .use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'pijamalı hasta yağız şoföre çabucak güvendi',
    store: new MongoStore({
      url: process.env.BloggerDB || "mongodb://127.0.0.1:27017/BloggerDB"
    }),
    cookie: {
      maxAge: 180 * 60 * 1000
    }
  }))
  .use(bodyParser.json())
  .use(express.static("./public"))
  .use(cookieParser())
  .engine('.hbs', exphbs({
    extname: '.hbs'
  }))
  .set('view engine', '.hbs')
  .post("/install", (req, res, next) => {
    if (install) {
      if (!req.body) return res.json({
        error: "Missing fields !",
        code: 0
      })
      if (!req.body.email || !req.body.password) return res.json({
        error: "Missing fields !",
        code: 0
      })
      const users = new database.users(req.body.email, req.body.password);
      if (users.error) return res.json(users)
      users.register(true).then(result => {
        if (result.error) return res.json(result);
        install = false;
        req.session.user = result;
        res.json({
          result: "ok",
          code: 1
        })
      })
    } else {
      next();
    }
  })
  .use((req, res, next) => {
    if (install) {
      res.render("register")
    } else {
      next();
    }
  })
  .use("/", routers.app)
  .use("/api", routers.api)
  .use((req, res, next) => {
    res.json({
      error: "Page not found!",
      code: 404
    }) // [TODO] 404 page design
  })
  .listen(port, _ => {
    console.log(`Web sitemize ${port} portunda calismaktadir.`);
  });