const db = require("./db");
const scrypt = require("scrypt");


const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class _users {
    constructor(email, password){
        if(!email || !emailRegex.test(email)  || !password) return {
            error : "Missing fields !",
            code : 0
        }
        this.email = email;
        this.password = password;
        this.user = function(){
            return db.users.then(users=>{
                return users.find({email : email}).toArray()
            }).then(data=>{
                return data && data.length > 0 ? data[0] : false;
            })
        }
    }
    login(){
        const that = this;
        return this.user().then(user=>{
            if(!user) return {
                error : "User mot found!",
                code : 0
            }
            if(!user.admin) return {
                error : "User doesnt have permisson.",
                code : 0
            }
            if (scrypt.verifyKdfSync(new Buffer(user.password, "base64"), new Buffer(that.password))) {
                delete user.password;
                return user;
            }
            return {error : "Wrong password !", code : 0}
        })
    }
    register(admin) {
        const that = this;
        return that.user().then(user=>{
            if(user) return {error : "User already registered.", code : 0}
            const password = scrypt.kdfSync(that.password, scrypt.paramsSync(1)).toString('base64');
            return db.users.then(users=>{
                return users.insert({
                    email : that.email,
                    password,
                    admin : admin
                }).then(status=>{
                    if(status.result.ok != 1 || status.result.n != 1) return {
                        error : "User can not be register.",
                        code : 0
                    }
                    return status.ops[0]
                })
            })
        })
    }
}

exports.users = _users;