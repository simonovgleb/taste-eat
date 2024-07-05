const eye = document.querySelector(".eye__btn");
const form = document.querySelector(".auth__form__inputs");
let isVisible = false;

eye.addEventListener("click", () => {
    if (isVisible) {
        isVisible = false;
        eye.src = "./static/auth/hidden.png";
        togglePasswordVisibility("password");
    } else {
        isVisible = true;
        eye.src = "./static/auth/eye.png";
        togglePasswordVisibility("text");
    }
});

function togglePasswordVisibility(inputType) {
    Array.from(form.querySelectorAll(".password__input"))
            .forEach(input => input.type = inputType);
}

function checkUserCredentials(email, password) {
	return email === "test@example.com" && password === "Qwerty1234!";
}