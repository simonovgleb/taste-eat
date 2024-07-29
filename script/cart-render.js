const dishesContainer = document.querySelector(".cart__dishes__container");
const summaryContainer = document.querySelector(".cart__dishes__summary__container");
const discount = document.querySelector(".cart__seasonal__discount__price");
const fee = document.querySelector(".cart__delivery__fee__price");
const totalPrice = document.querySelector(".cart__total__price");
const checkoutBtn = document.querySelector("#cart__checkout__btn");
const clearBtn = document.querySelector("#cart__clear__btn");

const CART_FEE_ROW_CLASS = "cart__fee__row";
const CART_DISH_IMG_CLASS = "cart__dish__img";
const CART_DISH_QUANTITY_CLASS = "cart__dish__quantity";
const CART_DISH_CLASS = "cart__dish";
const CART_DISH_INFO_CLASS = "cart__dish__info";
const CART_DISH_QUANTITY_BOX_CLASS = "cart__dish__quantity__box";
const CART_DISH_RM_CLASS = "cart__dish__rm";
const CART_DISH_INNER_CLASS = "cart__dish__inner";
const CART_DISH_TEXT_CLASS = "cart__dish__text";
const CART_DISH_BTN_CLASS = "cart__dish__button";

addEventListener("load", () => {
    populateCart();
});

clearBtn.addEventListener("click", clearCart);
checkoutBtn.addEventListener("click", checkout);
document.querySelector(".modal__overlay").addEventListener("click", () => {
    closeModal();
});

document.querySelector(".modal__window__btn").addEventListener("click", () => {
    closeModal();
    window.location.replace("/index.html");
});

// TODO: DISH TITLE TRANSLATION!!!

function populateCart() {
    let cart = getCart();
    let total = FEE_PRICE - DISCOUNT_PRICE;
    cart.forEach(item => {
        addDishCard(item, dishesContainer);
        addDishPrice(item, summaryContainer);
        total += item.price * item.quantity;
    });

    discount.textContent = `-$${DISCOUNT_PRICE}`;
    fee.textContent = `+$${FEE_PRICE}`;
    totalPrice.textContent = `$${Math.max(0, total)}`;
}

function addDishCard(dish, container) {
    let card = document.createElement("div");
    card.classList.add(CART_DISH_CLASS)
    let img = document.createElement("img");
    img.setAttribute("alt", dish.title);
    img.setAttribute("src", dish.image);
    img.classList.add(CART_DISH_IMG_CLASS);
    let inner = document.createElement("div");
    inner.classList.add(CART_DISH_INNER_CLASS);
    let info = document.createElement("div");
    info.classList.add(CART_DISH_INFO_CLASS);
    let title = document.createElement("p");
    title.textContent = dish.title;
    title.classList.add(CART_DISH_TEXT_CLASS);
    let price = document.createElement("p");
    price.textContent = `$${dish.price}`;
    price.classList.add(CART_DISH_TEXT_CLASS);
    info.append(title, price);

    addRmButtonToCard(card, inner, dish);
    inner.append(info);
    addActionButtonsToCard(card, inner, dish);
    card.append(img, inner);
    container.append(card);
}

function addRmButtonToCard(card, parent, dish) {
    let rmBtn = document.createElement("p");
    rmBtn.textContent = "x";
    rmBtn.classList.add(CART_DISH_RM_CLASS, CART_DISH_BTN_CLASS);
    rmBtn.addEventListener("click", () => removeDish(card, dish));

    parent.append(rmBtn);
}

function addActionButtonsToCard(card, parent, dish) {

    let quantityBox = document.createElement("div");
    quantityBox.classList.add(CART_DISH_QUANTITY_BOX_CLASS);
    let decBtn = document.createElement("p");
    decBtn.textContent = "-";
    decBtn.classList.add(CART_DISH_BTN_CLASS);
    decBtn.addEventListener("click", () => decQuantity(card, dish));
    let quantity = document.createElement("p");
    quantity.textContent = dish.quantity;
    quantity.classList.add(CART_DISH_QUANTITY_CLASS, CART_DISH_TEXT_CLASS);
    let incBtn = document.createElement("p");
    incBtn.textContent = "+";
    incBtn.classList.add(CART_DISH_BTN_CLASS);
    incBtn.addEventListener("click", () => incQuantity(card, dish));

    quantityBox.append(decBtn, quantity, incBtn);
    parent.append(quantityBox);
}

function addDishPrice(dish, container) {
    let row = document.createElement("div");
    row.classList.add(CART_FEE_ROW_CLASS);
    let item = document.createElement("p");
    item.textContent = `${dish.title} x ${dish.quantity}`;
    let price = document.createElement("p");
    price.textContent = `+$${dish.price * dish.quantity}`;

    row.append(item, price);
    container.append(row);
}

function removeDish(card, dish) {
    card.remove();
    removeFromCart(dish);
    recalculateSummary();
}

function decQuantity(card, dish) {
    let upd = decQuantityInCart(dish);
    card.querySelector(`.${CART_DISH_QUANTITY_CLASS}`).textContent = upd.quantity;

    recalculateSummary();
}

function incQuantity(card, dish) {
    let upd = incQuantityInCart(dish);
    card.querySelector(`.${CART_DISH_QUANTITY_CLASS}`).textContent = upd.quantity;
    recalculateSummary();
}

function recalculateSummary() {
    Array.from(summaryContainer.childNodes)
        .forEach(node => node.remove());
    let total = FEE_PRICE - DISCOUNT_PRICE;
    getCart()
        .forEach(item => {
            addDishPrice(item, summaryContainer);
            total += item.price * item.quantity;
        });
    totalPrice.textContent = `$${Math.max(0, total)}`;
}

function clearCart() {
    clearUserCart();
    Array.from(dishesContainer.childNodes).forEach(child => child.remove());
    Array.from(summaryContainer.childNodes).forEach(child => child.remove());
}

function checkout() {
    if (authUser) {
        saveOrder();
        showModal();
    } else {
        window.location.replace("/pages/signin.html");
    }
}
