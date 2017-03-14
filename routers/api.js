const express = require("express");
const database = require("./../database/index");

exports.api = express.Router();

exports.api
    .post('/login', (req, res) => {
        if(!req.body) return res.json({
            error : "Missing fields !",
            code : 0
        })
        if(!req.body.email || !req.body.password) return res.json({
            error : "Missing fields !",
            code: 0
        })
        const users = new database.users(req.body.email, req.body.password);
        if(users.error) return res.json(users)
        users.login().then(user=>{
            if(user.error) return res.json(user);
            req.session.user = user;
            res.json({
                result : "ok",
                code : 1
            })
        })
    })
    .post("/register", (req, res)=>{
        if(!req.body) return res.json({
            error : "Missing fields !",
            code : 0
        })
        if(!req.body.email || !req.body.password) return res.json({
            error : "Missing fields !",
            code: 0
        })
        const users = new database.users(req.body.email, req.body.password);
        if(users.error) return res.json(users)
        users.register(false).then(result=>{
            if(result.error) return res.json(result);
            res.json({
                result : "ok", 
                code : 1
            })
        })
    })
    .post("/share", (req, res)=>{
        res.json({
            code : 1,
            result : "Your blog post successfly saved."
        })
    })