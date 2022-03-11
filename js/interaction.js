document.querySelector(".add-btn").addEventListener("click", function () {
    document.querySelector(".popup-form").classList.add("active");
});
document.querySelector(".popup-form .close-btn").addEventListener("click", function () {
        document.querySelector(".popup-form").classList.remove("active");
});
document.querySelector(".popup-form .plus-btn").addEventListener("click", function () {
    document.querySelector(".popup-form").classList.remove("active");
});
