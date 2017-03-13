const express = require('express');
const session = require('express-session')
const exphbs  = require('express-handlebars');
const routers = require("./router/index");
const cookieParser = require('cookie-parser');
const MongoStore = require("connect-mongo")(session);
const port = process.env.PORT || 3000;

const app = express();


app
  .use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'pijamalı hasta yağız şoföre çabucak güvendi',
    store : new MongoStore({ url : "mongodb://127.0.0.1:27017/myblog"}),
    cookie : { maxAge: 180 * 60 * 1000 }
  }))
  .use((req, res, next)=>{
    let data="";
    req.on("data",d=>data+=d.toString());
    req.on("end",_=>{
      try{
          req.body=JSON.parse(data);
          next();
      }catch(e){
          next();
      }
    })
  })
  .use(express.static("./public")) // for development.
  .use(cookieParser())
  .engine('.hbs', exphbs({ extname: '.hbs' }))
  .set('view engine', '.hbs')
  .use("/", routers.app)
  .use("/api", routers.api)
  .use((req, res, next)=>{
    res.json({ error : "Page not found!", code : 404}) // [TODO] 404 page design
  })
  .listen(port, _=>{
    console.log(`Web sitemize ${port} portunda calismaktadir.`);
});