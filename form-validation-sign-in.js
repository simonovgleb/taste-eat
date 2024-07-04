const emailError = document.querySelector(".form__email__input__error");
const passwordError = document.querySelector(".form__password__input__error");
const emailInput = document.querySelector(".email__input");
const passwordInput = document.querySelector(".password__input");
const submitBtn = document.querySelector(".sign__in__button");
const signInForm = document.querySelector(".auth__form__inputs");
const locale = localStorage.getItem("lang") || "en";
 
function validateEmail(email) {
    const emailRegex = /^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$/;
    return emailRegex.test(email);
}

let isCorrectEmail = false;
let isCorrectPassword = false;

emailInput.addEventListener("input", () => {
    if (emailInput.value.trim().length === 0) {
        emailError.style.display = "block";
        emailError.textContent = getTranslation(locale, "auth-empty-email");
        isCorrectEmail = false;
    } else if (!validateEmail(emailInput.value)) {
        emailError.style.display = "block";
        emailError.textContent = getTranslation(locale, "auth-invalid-email");
        emailInput.setCustomValidity("invalid"); 
    } else {
        emailError.style.display = "none";
        isCorrectEmail = true;
        emailInput.setCustomValidity("");
    }
});

passwordInput.addEventListener("input", () => {
    if (passwordInput.value.trim().length === 0) {
        passwordError.style.display = "block";
        passwordError.textContent = getTranslation(locale, "auth-empty-password"); 
    } else {
        passwordError.style.display = "none";
        isCorrectPassword = true;
        passwordInput.setCustomValidity("");
    }
});


submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (signInForm.checkValidity() && isCorrectEmail && isCorrectPassword) {
        if (checkUserCredentials(emailInput.value.trim(), passwordInput.value.trim())) {
            document.body.style.overflowY = "hidden";
            modalWindow.style.display = "flex";
            localStorage.setItem("user", "test");
        } else {
            passwordError.style.display = "block";
            passwordError.textContent = getTranslation(locale, "auth-invalid-credentials");
            emailInput.setCustomValidity("invalid");
            passwordInput.setCustomValidity("invalid");
        }
    }
});
    
document.querySelector(".modal__overlay").addEventListener("click", ()=> {
    document.body.style.overflowY = "scroll";
    modalWindow.style.display = "none";
});

document.querySelector(".modal__window__btn").addEventListener("click", ()=> {
    modalWindow.style.display = "none";
    document.body.style.overflowY = "scroll";
    window.location.replace("/index.html");
});