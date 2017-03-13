const express = require("express");
const settings = require("./../settings.json");


exports.app = express.Router();

exports.app
    .get('/', (req, res) => {
        res.render("index", {
            settings : settings
        })
    })
    .get("/resume", (req, res)=>{
        res.render("resume", {
            settings : settings,
            page_info : {
                title : "Resume",
                description : "My personal resume.",
                keywords : "resume, developer resume, front-end developer"
            }
        })
    })
    .get("/blogs", (req, res)=>{
        res.render("blog", {
            settings : settings,
            page_info : {
                title : "My Blogs",
                description : "",
                keywords : "blog, developer blog, blogger, node blogger"
            }
        })
    })
    .get("/contact", (req, res)=>{
        res.render("contact", {
            settings : settings,
            page_info : {
                title : "Contact with me",
                description : "You can connect with me with this page.",
                keywords : "Muhammed Furkan Aydın, contact, hire me"
            }
        })
    })
    .get("/article/:blog", (req, res)=>{
        res.render("article", {
            settings : settings
        })
    })