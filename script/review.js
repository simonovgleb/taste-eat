const DEFAULT_IMG = "data:image/jpeg;base64,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";

const reviewForm = document.querySelector(".review__content");
const cityInput = document.querySelector("#review__city_input");
const fileInput = document.querySelector("#review__avatar_input");
const feedbackInput = document.querySelector("#review__feedback_input");
const inputError = document.querySelector("#review__inputs_error");
const feedbackError = document.querySelector("#review__feedback_error");
const userAvatar = document.querySelector(".review__avatar_img");

const locale = localStorage.getItem("lang") || "en";

addEventListener("load", () => {
    if (!authUser) {
        routeSignIn();
    } else {
        userAvatar.setAttribute("src", DEFAULT_IMG);
    }
});

reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (reviewForm.checkValidity()) {
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews.push({
            id: reviews.length + 1,
            username: authUser.username,
            city: cityInput.value,
            avatar: userAvatar.getAttribute("src"),
            feedback: feedbackInput.value,
            status: "review_pending",
            locale
        });
        localStorage.setItem("reviews", JSON.stringify(reviews));
        showModal();
    }
});

document
    .querySelector(".modal__overlay")
    .addEventListener("click", () => {
        closeModal();
    });

document
    .querySelector(".modal__window__btn")
    .addEventListener("click", () => {
        closeModal();
        routeHome();
    });

async function convertImg(file) {
    if (file) {
        return await imageConverter(file);
    } else {
        return DEFAULT_IMG;
    }
}

cityInput.addEventListener("input", () => {
    inputError.textContent = "";
    let validity = cityInput.validity;
    if (!validity.valid) {
        if (validity.valueMissing) {
            inputError.textContent = getTranslation(
                locale,
                "review__empty_city"
            );
        } else if (validity.tooShort) {
            inputError.textContent = getTranslation(
                locale,
                "review__too_short_city"
            );
        } else if (validity.patternMismatch) {
            inputError.textContent = getTranslation(
                locale,
                "review__invalid_city"
            );
        }
    }
});

fileInput.addEventListener("change", () => {
    file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => userAvatar.setAttribute("src", reader.result);
        reader.onerror = console.error;
    }
});

feedbackInput.addEventListener("input", () => {
    feedbackError.textContent = "";
    let validity = feedbackInput.validity;
    if (!validity.valid) {
        if (validity.valueMissing) {
            feedbackError.textContent = getTranslation(
                locale,
                "review__empty_feedback"
            );
        } else if (validity.tooShort) {
            feedbackError.textContent = getTranslation(
                locale,
                "review__too_short_feedback"
            );
        }
    }
});
