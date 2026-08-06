// EcoDNA JavaScript

console.log("EcoDNA Loaded Successfully!");

// Scroll to top button
const topBtn = document.getElementById("topBtn");

if (topBtn) {
    topBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}