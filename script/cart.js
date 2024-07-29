const MAX_AMOUNT = 100;
const MIN_AMOUNT = 1;
const DISCOUNT_PRICE = 12;
const FEE_PRICE = 10;

function addToCart(image, title, price) {
    let cart = getCart();
    let existing = cart
    .find(item => item.title === title && item.price === price);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            image,
            title,
            price,
            quantity: 1
        });
    }
    saveCart(cart);
}

function getCart() {
    let existing = authUser
        ? authUser.cart
        : JSON.parse(localStorage.getItem("cart"));
    return existing || [];
}

function saveCart(cart) {
    if (authUser) {
        authUser.cart = cart;
    } else {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}

function attachCart() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
        user = JSON.parse(localStorage.getItem("user"));
        user.cart = cart;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.removeItem("cart");
    }
}

function removeFromCart({title, price}) {
    let cart = getCart()
        .filter(item => item.title !== title && item.price !== price);
    saveCart(cart);
}

function incQuantityInCart({title, price}) {
    let cart = getCart();
    let dish = cart
        .find(item => item.title === title && item.price === price);
    if (dish && dish.quantity < MAX_AMOUNT) {
        dish.quantity++;
        saveCart(cart);
    }

    return dish;
}

function decQuantityInCart({title, price}) {
    let cart = getCart();
    let dish = cart
        .find(item => item.title === title && item.price === price);
    if (dish && dish.quantity > MIN_AMOUNT) {
        dish.quantity--;
        saveCart(cart);
    }

    return dish;
}

function clearUserCart() {
    saveCart([]);
}

function cartCost() {
    return getCart()
    .reduce((prev, next) =>
        prev + next.price * next.quantity, FEE_PRICE - DISCOUNT_PRICE);
}
