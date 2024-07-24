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
