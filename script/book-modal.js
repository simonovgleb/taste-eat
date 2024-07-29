
const modalWindow = document.querySelector(".modal");
const overlay = document.querySelector(".modal__overlay");


let modalImage = document.querySelector(".modal__content__image");
let modalTitle = document.querySelector(".modal__content__right__title");
let modalAbout = document.querySelector(".modal__content__right__about");
let modalButton = document.querySelector(".modal__content__right__btn");
let modalPrice = document.querySelector(".modal__content__right__price");

function addEventsModalWindow() {
    const popularImages = document.querySelectorAll(".popular__card__image");
    const popularTitle = document.querySelectorAll(".popular__card__title");
    const popularAbout = document.querySelectorAll(".popular__card__about");
    const popularPrice = document.querySelectorAll(".popular__card__price");
    const cards = document.querySelectorAll(".popular__card");
    let isOpenWindow = false;

    cards.forEach((card, index) => {
        card.addEventListener("click", (event) => {
            isOpenWindow = true;
            if (isOpenWindow) {
                modalImage.src = popularImages[index].src;
                modalTitle.textContent = popularTitle[index].textContent;
                modalAbout.textContent = popularAbout[index].textContent;
                modalPrice.textContent = popularPrice[index].textContent;
                showModal();
            }
        });
    });


    overlay.addEventListener("click", () => {
        isOpenWindow = false;
        closeModal();
    });

    modalButton.addEventListener("click", () => {
        isOpenWindow = false;
        closeModal();
        addToCart(
            modalImage.src,
            modalTitle.textContent,
            +modalPrice.textContent.replace("$", "")
        );
    });
}

function showModal() {
    document.body.style.overflowY = "hidden";
    modalWindow.style.display = "flex";
}

function closeModal() {
    modalWindow.style.display = "none";
    document.body.style.overflowY = "scroll";
}
