const eye = document.querySelector(".eye__btn");
const form = document.querySelector(".auth__form__inputs");
let isVisible = false;
let users = [];

addEventListener("load", () => {
    loadUsers();
});

eye.addEventListener("click", () => {
    if (isVisible) {
        isVisible = false;
        eye.src = "../static/auth/hidden.png";
        togglePasswordVisibility("password");
    } else {
        isVisible = true;
        eye.src = "../static/auth/eye.png";
        togglePasswordVisibility("text");
    }
});

function togglePasswordVisibility(inputType) {
    Array.from(form.querySelectorAll(".password__input"))
            .forEach(input => input.type = inputType);
}

function checkUserCredentials(email, password) {
	return users.find(user => user.email === email && user.password === password);
}

function checkNickname(nickname) {
    return users.map(user => user.username).includes(nickname);
}

function getNumberOfUsers() {
    return users.length;
}

function loadUsers() {
    fetch("../data/users.json")
    .then(response => response.json())
    .then(raw => users = raw?.users || [])
    .catch(error => {
        console.error("Unable to populate users data", error);
    });
}

function saveUser(user) {
    users.push({
        ...user,
        roles: [
            "USER"
        ]
    });
}