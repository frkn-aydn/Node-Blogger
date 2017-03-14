const db = require("./db");
const slug = require("speakingurl");

class _aricles {
    constructor(title){
        if(!title) return {
            error : "Missing field !",
            code : 0
        }
        this.title = title;
        this.articles = function(){
            return db.articles.then(articles=>{
                return articles.find({url : slug(title)}).toArray()
            }).then(data=>{
                return data && data.length > 0 ? data[0] : false;
            })
        }
    }
    share(detail, description, keywords){
        return this.articles().then(article=>{
            const date = new Date();
            const url = article ? slug(this.title) + "-" + Date.now() : slug(this.title);
            return db.articles.then(articles=>{
                return articles.insert({
                    title : this.title,
                    description : description,
                    detail : detail,
                    keywords : keywords,
                    url : url,
                    date : date
                })
            }).then(status=>{
                if(status.result.ok != 1 || status.result.n != 1) return {
                    error : "We can not share this article. Try again.",
                    code : 0
                }
                return {
                    result : status.ops[0],
                    code : 1
                }
            })
        })
    }
    delete(){
        return this.articles().then(article=>{
            if(!article) return {
                error : "Article not found !",
                code : 0
            }
            return db.articles.then(articles=>{
                return articles.remove({url : this.title});
            }).then(status=>{
                if(status.result.ok != 1 || status.result.n != 1) return {
                    error : "We can not share this article. Try again.",
                    code : 0
                }
                return {
                    result : "ok",
                    code : 1
                }
            })
        })
    }
    find(){
        return this.articles().then(article=>{
            if(!article) return {
                error : "Article not found !",
                code : 0
            }
            return article
        })
    }
}

exports.articles = _aricles;