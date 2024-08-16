const ordersContainer = document.querySelector(".orders__container");

const USER_BOX_CLASS = "orders__user_box";
const USER_INFO_CLASS = "orders__user_info";
const ORDER_LIST_CLASS = "orders__order_list";
const SUMMARY_CLASS = "orders__summary";
const NUMBER_LABEL_I18N_CLASS = "lng-orders__number";
const TOTAL_LABEL_I18N_CLASS = "lng-orders__total";
const DISCOUNT_LABEL_I18N_CLASS = "lng-orders__discount";
const TEXT_TITLE_CLASS = "orders__text_title";
const TEXT_REGULAR_CLASS = "orders__text_regular";
const SUMMARY_SECTION_CLASS = "orders__summary_section";
const ORDER_ROW_CLASS = "orders__order_row";

const locale = localStorage.getItem("lang") || "en";
const DATE_FORMAT = {
    "month": "short",
    "day": "numeric",
    "year": "numeric"
};
const DISCOUNT_STEP = 150;

addEventListener("load", () => {
    if (!authUser || !authUser.roles.includes("ADMIN")) {
        routeSignIn();
    }
});

function populateOrders() {
    let orders = JSON.parse(localStorage.getItem("orders")) || {"list": {}};
    let users = JSON.parse(localStorage.getItem("users"));
    Object.entries(orders.list).forEach(([username, userOrders]) => {
        let userBox = document.createElement("div");
        userBox.classList.add(USER_BOX_CLASS);
        let userInfo = document.createElement("div");
        userInfo.classList.add(USER_INFO_CLASS);
        let orderList = document.createElement("div");
        orderList.classList.add(ORDER_LIST_CLASS);
        let summary = document.createElement("div");
        summary.classList.add(SUMMARY_CLASS);

        renderUserInfo(userInfo, users, username);
        renderOrderList(orderList, userOrders);
        renderSummary(summary, userOrders);

        userBox.append(userInfo, orderList, summary);
        ordersContainer.append(userBox);
    });
}

function renderUserInfo(container, users, username) {
    let user = users.find(usr => usr.username === username);
    if (user) {
        let nameBox = document.createElement("p");
        nameBox.classList.add(TEXT_TITLE_CLASS);
        nameBox.textContent = `${user.firstName} ${user.lastName}`;
        let emailBox = document.createElement("a");
        emailBox.classList.add(TEXT_REGULAR_CLASS);
        emailBox.setAttribute("href", `mailto:${user.email}`);
        emailBox.textContent = user.email;
        let telBox = document.createElement("a");
        telBox.classList.add(TEXT_REGULAR_CLASS);
        telBox.setAttribute("href", `tel:${user.phoneNumber}`);
        telBox.textContent = "+" + user.phoneNumber;
        let dobBox = document.createElement("p");
        dobBox.classList.add(TEXT_REGULAR_CLASS);
        dobBox.textContent = new Date(user.birthDate).toLocaleDateString(
            locale,
            DATE_FORMAT
        );

        container.append(nameBox, emailBox, telBox, dobBox);
    }
}

function renderOrderList(container, orders) {
    container.classList.add(TEXT_REGULAR_CLASS);
    orders.forEach(order => {
        let orderRow = document.createElement("div");
        orderRow.classList.add(ORDER_ROW_CLASS);
        let numberBox = document.createElement("p");
        let label = document.createElement("span");
        label.classList.add(NUMBER_LABEL_I18N_CLASS);
        label.textContent = "Order #";
        let orderNumber = document.createElement("span");
        orderNumber.textContent = order.number;
        let cost = document.createElement("p");
        cost.textContent = `$${order.cost}`;

        numberBox.append(label, orderNumber);
        orderRow.append(numberBox, cost);
        container.append(orderRow);
    });
}

function renderSummary(container, orders) {
    let total = orders.reduce((prev, next) => prev + next.cost, 0);
    let discount = Math.floor(total / DISCOUNT_STEP);
    let totalBox = document.createElement("div");
    totalBox.classList.add(SUMMARY_SECTION_CLASS);
    let totalLabel = document.createElement("p");
    totalLabel.classList.add(TOTAL_LABEL_I18N_CLASS, TEXT_TITLE_CLASS);
    totalLabel.textContent = "Totally spent";
    let totalValue = document.createElement("p");
    totalValue.textContent = `$${total}`;
    totalValue.classList.add(TEXT_REGULAR_CLASS);
    let discountBox = document.createElement("div");
    discountBox.classList.add(SUMMARY_SECTION_CLASS);
    let discountLabel = document.createElement("p");
    discountLabel.classList.add(DISCOUNT_LABEL_I18N_CLASS, TEXT_TITLE_CLASS);
    discountLabel.textContent = "Discount";
    let discountValue = document.createElement("p");
    discountValue.textContent = `${discount}%`;
    discountValue.classList.add(TEXT_REGULAR_CLASS);

    totalBox.append(totalLabel, totalValue);
    discountBox.append(discountLabel, discountValue);
    container.append(totalBox, discountBox);
}

populateOrders();
