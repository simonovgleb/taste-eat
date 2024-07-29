function saveOrder() {
    let cart = getCart();
    let orders = getOrders();
    let existing = orders.list[authUser.username];
    let total = orders.total;
    total++;
    orders.total = total;

    let order = {
        number: total,
        items: cart,
        cost: cartCost()
    };
    if (existing) {
        existing.push(order);
    } else {
        orders.list[authUser.username] = [order];
    }

    saveOrders(orders);
    clearUserCart();
}

function getOrders() {
    return JSON.parse(localStorage.getItem("orders")) ||
         { "total": 0, "list": {}};
}

function saveOrders(orders) {
    localStorage.setItem("orders", JSON.stringify(orders));
}
