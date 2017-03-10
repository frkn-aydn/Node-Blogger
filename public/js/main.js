document.querySelector(".menu-button").addEventListener("click", function(e){
    e.preventDefault();
    document.querySelector(".menu-button").classList.toggle("active");
    document.querySelector(".menu").classList.toggle("active");
})