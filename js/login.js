import { UserRepo } from "./repository/userRepo.js";

const userRepo = new UserRepo();

fetch("../YalaPay-data/users.json")
    .then(function(resp){
        return resp.json();
    }).then(function(data){
        console.log(data);
})

const submitBtn = document.querySelector(".submit-btn");
const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", validate);

function formToObject(form) {
    const formdata = new FormData(form);
    const data = {};
    for (const [key, value] of formdata) {
      data[key] = value;
    }
    return data;
  }

async function validate(e) {
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (fname == "") {
        alert("Please enter a First Name")
        formLogin.fname.focus()
        return false
    }
    if (lname == "") {
        alert("Please enter a Last Name")
        formLogin.lname.focus()
        return false
    }
    if (email == "") {
        alert("Please enter a Email")
        formLogin.email.focus()
        return false
    }
    if (password == "") {
        alert("Please enter a Password")
        formLogin.password.focus()
        return false
    }
}

