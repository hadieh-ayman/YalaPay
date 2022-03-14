import { UserRepo } from "./repository/userRepo.js";

const userRepo = new UserRepo();
const url = "../YalaPay-data/users.json";

const clearBtn = document.querySelector(".cancel-btn");
const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", validate);
clearBtn.addEventListener("click", () => {loginForm.reset()});

window.onload = async () => {
    userRepo.addUsers();
}

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
    const repoData = await userRepo.getUsers();
    const user = formToObject(e.target);
    const exists = repoData.filter(
        (x) =>
            x.firstName == user.firstName &&
            x.lastName == user.lastName &&
            x.email == user.email &&
            x.password == user.password
    );
    console.log(exists);
    if (exists!=undefined) {
        window.location = "../dashboard.html";
    } else {
        alert("Wrong password or email or name! \nPlease try again");
        loginForm.reset();
    }
}
