const MAX_AMOUNT = 100;
const MIN_AMOUNT = 1;
const DISCOUNT_PRICE = 12;
const FEE_PRICE = 10;

function addToCart(image, price, id) {
    let cart = getCart();
    let existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            id,
            image,
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

function removeFromCart(id) {
    let cart = getCart()
        .filter(item => item.id !== id);
    saveCart(cart);
}

function incQuantityInCart(id) {
    let cart = getCart();
    let dish = cart.find(item => item.id === id);
    if (dish && dish.quantity < MAX_AMOUNT) {
        dish.quantity++;
        saveCart(cart);
    }

    return dish;
}

function decQuantityInCart(id) {
    let cart = getCart();
    let dish = cart.find(item => item.id === id);
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
