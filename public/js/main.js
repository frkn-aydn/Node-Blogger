const Vue = require("vue/dist/vue.js");
const swal = require("sweetalert/dist/sweetalert.min.js");

new Vue({
    el: "#app",
    delimiters: ['<%', '%>'],
    data: function () {
        return {
            menus: [
                {
                    name: "DASHBOARD",
                    url: "/dashboard"
                },
                {
                    name : "LOGOUT",
                    url : "/logout"
                }
            ],
            add_blog: false,
            blogs: true,
            noContent: false,
            title: "",
            description: "",
            detail: "",
            keywords: ""
        }
    },
    created: function () {},
    methods: {
        toggle() {
            document.querySelector(".menu-button").classList.toggle("active");
            document.querySelector(".menu").classList.toggle("active");
        },
        openAddBlog() {
            this.blogs = false;
            this.add_blog = true;
        },
        goBack() {
            this.blogs = true;
            this.add_blog = false;
        },
        share() {
            if(!this.title) return swal("Missing field!", "Please enter title for this post.", "error");
            if(!tinyMCE.get('detail').getContent()) return swal("Missing field !", "Please enter detail for this post.", "error");
            if(!this.description) return swal("Missing field !", "Please enter description for this post.", "error");
            let ajax = new XMLHttpRequest();
            ajax.open("POST", "/api/share", true);
            ajax.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            ajax.onload = function(){
                var res = JSON.parse(ajax.response);
                if(res.code == 0) return swal("Error !", res.error || "", "error");
                swal("Success !", res.result || "Your blog post successfly saved.", "success")
            }
            ajax.send(JSON.stringify({
                title: this.title,
                detail: tinyMCE.get('detail').getContent(),
                description: this.description,
                keywords: this.keywords
            }))
        },
        deleteBlog() {
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover this blog post!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            },
            function () {
                swal("Deleted!", "Your blog post has been deleted.", "success");
            });
        }
    }
})