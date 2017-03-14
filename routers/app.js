const express = require("express");
const settings = require("./../settings.json");


exports.app = express.Router();

exports.app
    .get('/', (req, res) => {
        res.render("index", {
            settings : settings,
            admin : req.session.user ? req.session.user.admin : false
        })
    })
    .get("/resume", (req, res)=>{
        res.render("resume", {
            settings : settings,
            page_info : {
                title : "Resume",
                description : "My personal resume.",
                keywords : "resume, developer resume, front-end developer"
            },
            admin : req.session.user ? req.session.user.admin : false
        })
    })
    .get("/blogs", (req, res)=>{
        res.render("blog", {
            settings : settings,
            page_info : {
                title : "My Blogs",
                description : "",
                keywords : "blog, developer blog, blogger, node blogger"
            },
            admin : req.session.user ? req.session.user.admin : false
        })
    })
    .get("/contact", (req, res)=>{
        res.render("contact", {
            settings : settings,
            page_info : {
                title : "Contact with me",
                description : "You can connect with me with this page.",
                keywords : "Muhammed Furkan Aydın, contact, hire me"
            },
            admin : req.session.user ? req.session.user.admin : false
        })
    })
    .get("/article/:blog", (req, res)=>{
        res.render("article", {
            settings : settings,
            admin : req.session.user ? req.session.user.admin : false
        })
    })
    .get("/dashboard", (req, res)=>{
        if(!req.session.user) return res.redirect("/");
        if(!req.session.user.admin) return res.redirect("/");
        res.render("dashboard", {
            settings : settings,
            admin : req.session.user ? req.session.user.admin : false
        })
    })
    .get("/login", (req, res)=>{
        res.render("login", {
            settings : settings,
            admin : req.session.user ? req.session.user.admin : false
        })
    })
    .get("/logout", (req, res) => {
        req.session.destroy(function (err) {
            if (err) return console.log(err)
            res.redirect('/');
        })
    })