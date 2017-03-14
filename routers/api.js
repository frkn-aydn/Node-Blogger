const express = require("express");
const database = require("./../database/index");
const nodemailer = require("nodemailer");

exports.api = express.Router();

exports.api
    .post('/login', (req, res) => {
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
        users.login().then(user => {
            if (user.error) return res.json(user);
            req.session.user = user;
            res.json({
                result: "ok",
                code: 1
            })
        })
    })
    .post("/register", (req, res) => {
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
        users.register(false).then(result => {
            if (result.error) return res.json(result);
            res.json({
                result: "ok",
                code: 1
            })
        })
    })
    .post("/share", (req, res) => {
        if(!req.session.user) return res.json({
            error : "Please login first !", 
            code : 0
        })
        if(!req.session.user.admin) return res.json({
            error : "You dont have permisson !",
            code : 0
        })
        if (!req.body) return res.json({
            error: "Missing fields!",
            code: 0
        })
        if (!req.body.title || !req.body.description || !req.body.detail) return res.json({
            error: "Missing fields!",
            code: 0
        })
        const articles = new database.articles(req.body.title);
        if (articles.error) return res.json({
            error: articles.error,
            code: 0
        })
        articles.share(req.body.detail, req.body.description, req.body.keywords).then(article => {
            if (article.error) return res.json({
                error: article.error,
                code: 0
            })
            res.json({
                data: article.result,
                code : 1
            })
        })
    })
    .post("/delete", (req, res)=>{
        if(!req.session.user) return res.json({
            error : "Please login first !", 
            code : 0
        })
        if(!req.session.user.admin) return res.json({
            error : "You dont have permisson !",
            code : 0
        })
        if (!req.body) return res.json({
            error: "Unsupperted request!",
            code: 0
        })
        if (!req.body.url) return res.json({
            error: "Missing fields!",
            code: 0
        })
        const articles = new database.articles(req.body.url);
        if (articles.error) return res.json({
            error: articles.error,
            code: 0
        })
        articles.delete().then(result=>{
            if(result.error) return res.json({
                error : result.error,
                code : 0
            })
            res.json({
                result : "ok",
                code : 1
            })
        })
    })
    .post("/contact", (req, res) => {
        if (!req.body) return res.json({
            error: "Missing fields!",
            code: 0
        })
        if (!req.body.name || !req.body.email || !req.body.message) return res.json({
            error: "Missing fields!",
            code: 0
        })
        let transporter = nodemailer.createTransport({
            service: 'yandex',
            auth: {
                user: process.env.settingsMail || 'info@turkdeveloper.com',
                pass: process.env.settingsMailPassword || '12345678'
            }
        });
        let mailOptions = {
            from: '"turkdeveloper.com" <info@turkdeveloper.com>',
            to: 'furkanaydin@turkdeveloper.com',
            subject: 'Contact request from ' + req.body.name,
            text: req.body.message + " - email address : " + req.body.email,
            html: '<b>' + req.body.message + " - email address : " + req.body.email + '</b>'
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) return res.json({
                error: "Somethings wrong. Please try again.",
                code: 0
            })
            res.json({
                result: "ok",
                code: 1
            })
        });
    })
    .post("/getAllArticles", (req, res)=>{
        if(!req.session.user) return res.json({
            error : "Please login first !", 
            code : 0
        })
        if(!req.session.user.admin) return res.json({
            error : "You dont have permisson !",
            code : 0
        })
        database.db.articles.then(articles => {
            articles.find({}).toArray().then(article => {
                res.json(article)
            })
        })
    })