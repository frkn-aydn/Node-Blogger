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
        // [TODO] Dont forget this place !
        res.json({
            code: 1,
            result: "Your blog post successfly saved."
        })
    })
    .post("/contact", (req, res) => {
        if(!req.body) return res.json({
            error : "Missing fields!",
            code: 0
        })
        if(!req.body.name || !req.body.email || !req.body.message) return res.json({
            error : "Missing fields!",
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
            subject: 'Contact request from '+ req.body.name,
            text: req.body.message + " - email address : " + req.body.email,
            html: '<b>'+req.body.message + " - email address : " + req.body.email+'</b>'
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) return res.json({
                error : "Somethings wrong. Please try again.",
                code : 0
            })
            res.json({
                result : "ok",
                code: 1
            })
        });
    })