import { UserRepo } from "./repository/userRepo.js";

const userRepo = new UserRepo();

const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", validate);

function formToObject(form) {
    const forminfo = new FormData(form);
    const info = {};
    for (const [key, value] of forminfo) {
        info[key] = value;
    }
    return info;
}
async function validate(e) {
    e.preventDefault();
    const response = await fetch("../YalaPay-data/users.json");
    const data = await response.json();
    console.log(data);
    const user = formToObject(e.target);
    console.log(user);
    const exists = data.filter((x) => x.firstName == user.firstName && x.lastName==user.lastName && x.email==user.email  && x.password==user.password);
    console.log(exists);
    if(exists.length == 1){
        window.location = "../dashboard.html"
    }
}
