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
            let data = {
                title: this.title,
                detail: tinyMCE.get('detail').getContent(),
                description: this.description,
                keywords: this.keywords
            }
            console.log(data)
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