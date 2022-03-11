const hamBtn = document.querySelector(".ham-btn");
const navBar = document.querySelector(".navbar");
let menuOpen = false;
hamBtn.addEventListener("click", () => {
  if (!menuOpen) {
    hamBtn.classList.add("open");
    navBar.classList.add("open");
    menuOpen = true;
  } else {
    hamBtn.classList.remove("open");
    navBar.classList.remove("open");
    menuOpen = false;
  }
});