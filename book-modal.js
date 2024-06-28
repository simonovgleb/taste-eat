
const modalWindow = document.querySelector(".modal")
const overlay = document.querySelector(".modal__overlay")


let modalImage = document.querySelector(".modal__content__image")
let modalTitle = document.querySelector(".modal__content__right__title")
let modalAbout = document.querySelector(".modal__content__right__about")
function addEventsModalWindow() {
    const popularImages = document.querySelectorAll(".popular__card__image")
    const popularTitle = document.querySelectorAll(".popular__card__title")
    const popularAbout = document.querySelectorAll(".popular__card__about")
    const cards = document.querySelectorAll(".popular__card");
    let isOpenWindow = false;

    console.log("Cards: " + JSON.stringify(cards));

    cards.forEach((card, index) => {
        card.addEventListener("click", (event) => {
            isOpenWindow = true;
            if (isOpenWindow) {
                document.body.style.overflowY = "hidden";

                modalImage.src = popularImages[index].src
                console.log("TITLE" + popularTitle[index].textContent, popularAbout[index].textContent)
                modalTitle.textContent = popularTitle[index].textContent
                modalAbout.textContent = popularAbout[index].textContent
                console.log(JSON.stringify(modalWindow));
                modalWindow.style.display = "flex";
            }
        });
    });


    overlay.addEventListener("click", () => {

        isOpenWindow = false;
        modalWindow.style.display = "none";

        document.body.style.overflowY = "scroll";


    })

    document.querySelector(".modal__content__right__btn").addEventListener("click", () => {
        isOpenWindow = false;
        modalWindow.style.display = "none";
        document.body.style.overflowY = "scroll";
    })
}