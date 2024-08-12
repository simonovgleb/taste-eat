const reviewContainer = document.querySelector(".reviews__container");

const REVIEWS_CARD_CLASS = "reviews__card";
const REVIEWS_INFO_CONTAINER_CLASS = "reviews__info_container";
const REVIEWS_INFO_BOX_CLASS = "reviews__info_box";
const REVIEWS_INFO_HEADER_CLASS = "reviews__info_header";
const REVIEWS_SHOW_CONTAINER_CLASS = "reviews__show_container";
const REVIEWS_CONTENT_CONTAINER_CLASS = "reviews__content_container";
const REVIEW_IMG_CLASS = "review__avatar_img";
const REVIEW_BTN_CLASSES = [
    "auth__form__submit",
    "btn__animation",
    "review__submit_btn"
];

const locale = localStorage.getItem("lang") || "en";

addEventListener("load", () => {
    if (!authUser || !authUser.roles.includes("ADMIN")) {
        window.location.replace("/pages/signin.html")
    } else {
        fillReviews();
    }
});

function fillReviews() {
    let users = JSON.parse(localStorage.getItem("users"));
    let reviews = getReviews();
    reviews.forEach(review => renderReviewCard(
        review,
        users.find(user => user.username === review.username)
    ));
}

function renderReviewCard(review, user) {
    let reviewCard = document.createElement("div");
    let infoContainer = document.createElement("div");
    let contentContainer = document.createElement("div");

    reviewCard.classList.add(REVIEWS_CARD_CLASS);
    infoContainer.classList.add(REVIEWS_INFO_CONTAINER_CLASS);
    contentContainer.classList.add(REVIEWS_CONTENT_CONTAINER_CLASS);

    fillInfo(infoContainer, review, user);
    appendControlBtns(reviewCard, infoContainer, review);
    fillContent(contentContainer, review);

    reviewCard.append(infoContainer, contentContainer);
    reviewContainer.append(reviewCard);
}

function fillInfo(container, review, user) {
    let infoBox = document.createElement("div");
    let nameBox = document.createElement("p");
    let emailBox = document.createElement("a");
    let phoneBox = document.createElement("a");
    let cityBox = document.createElement("p");

    infoBox.classList.add(REVIEWS_INFO_BOX_CLASS);
    nameBox.textContent = `${user.firstName} ${user.lastName}`;
    nameBox.classList.add(REVIEWS_INFO_HEADER_CLASS);
    emailBox.textContent = user.email;
    emailBox.setAttribute("href", `mailto:${user.email}`);
    phoneBox.textContent = `+${user.phoneNumber}`;
    phoneBox.setAttribute("href", `tel:${user.phoneNumber}`);
    cityBox.textContent = review.city;

    infoBox.append(nameBox, emailBox, phoneBox, cityBox);
    container.append(infoBox)
}

function fillContent(container, review) {
     let avatarImg = document.createElement("img");
     let reviewText = document.createElement("p");

     avatarImg.setAttribute("alt", "user avatar");
     avatarImg.setAttribute("src", imgPath(review.avatar));
     avatarImg.classList.add(REVIEW_IMG_CLASS);

     reviewText.innerHTML = review.feedback;

     container.append(avatarImg, reviewText);
}

function appendControlBtns(card, container, review) {
    let isPending = review.status.includes("pending");
    let checkboxContainer = document.createElement("div");
    let checkboxLabel = document.createElement("label");
    let checkbox = document.createElement("input");

    checkboxContainer.classList.add(REVIEWS_SHOW_CONTAINER_CLASS);
    checkbox.setAttribute("id", "reviews__show_checkbox_" + review.id);
    checkbox.setAttribute("type", "checkbox");
    if (review.show) {
        checkbox.setAttribute("checked", true);
    }
    checkboxLabel.setAttribute("for", checkbox.getAttribute("id"));
    checkboxLabel.textContent = getTranslation(
        locale,
        "reviews__show_in_carousel"
    );

    if (isPending) {
        appendReviewStatusBtns(card, container, review, checkbox);
        checkbox.setAttribute("disabled", true);
    }
    checkbox.addEventListener(
        "input",
        (event) => toggleReviewVisibility(event, review)
    );

    checkboxContainer.append(checkbox, checkboxLabel);
    container.append(checkboxContainer);
}

function appendReviewStatusBtns(card, container, review, checkbox) {
    let acceptBtn = document.createElement("button");
    let declineBtn = document.createElement("button");

    acceptBtn.classList.add(...REVIEW_BTN_CLASSES);
    declineBtn.classList.add(...REVIEW_BTN_CLASSES);

    acceptBtn.textContent = getTranslation(locale, "reviews__accept");
    declineBtn.textContent = getTranslation(locale, "reviews__decline");

    acceptBtn.addEventListener(
        "click",
        () => acceptReview(review, acceptBtn, declineBtn, checkbox)
    );
    declineBtn.addEventListener("click", () => declineReview(review, card));
    container.append(acceptBtn, declineBtn);
}

function toggleReviewVisibility(event, review) {
    let checked = event.target.checked;
    let reviews = getReviews();
    (reviews.find(rev => rev.id === review.id)).show = checked;

    saveReviews(reviews);
}

function acceptReview(review, acceptBtn, declineBtn, checkbox) {
    let reviews = getReviews();

    (reviews.find(rev => rev.id === review.id)).status = "review_accepted";
    saveReviews(reviews);
    acceptBtn.remove();
    declineBtn.remove();
    checkbox.removeAttribute("disabled");
}

function declineReview(review, reviewCard) {
    let reviews = getReviews();
    saveReviews(reviews.filter(rev => rev.id !== review.id));

    reviewCard.remove();
}

function getReviews() {
    return JSON.parse(localStorage.getItem("reviews")) || [];
}

function saveReviews(reviews) {
    localStorage.setItem("reviews", JSON.stringify(reviews));
}

function imgPath(src) {
    if (src.includes("base64")) {
        return src;
    } else {
        let prefix = window.location.pathname
            .replace(/\/[A-z]+\.html/, "/")
            .replaceAll(/\/[A-z]+/g, "/..");
        return "." + prefix + src;
    }
}
