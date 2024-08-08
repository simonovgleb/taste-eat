const reservationContainer = document.querySelector(".reservations__container");

const locale = localStorage.getItem("lang") || "en";
const DOB_DATE_FORMAT = {
    month: "short",
    day: "numeric",
    year: "numeric"
};
const RESERVATION_DATE_FORMAT = {
    weekday: "short",
    month: "short",
    day: "numeric"
};
const TIME_FORMAT = {
    hour: "numeric",
    minute: "numeric"
};
const RESERVATION_INFO_ROW_CLASS = "reservations__info_row";
const RESERVATION_INFO_CONTAINER_CLASS = "reservations__info_container";
const ACTION_BUTTON_CLASSES = [
    "sign__in__button",
    "btn__animation",
    "reservations__cancel_btn"
];
const STATUS_CLASS = "reservation__status";
const DISABLED_BTN_CLASS = "reservations__disabled_btn";
const RESERVATION_BOX_CLASS = "reservations__outer_box";
const RESERVATION_USER_CONTAINER_CLASS = "reservations__user_box";
const RESERVATION_STATUS_CONTAINER_CLASS = "reservations__status_container";
const RESERVATION_BUTTONS_BOX_CLASS = "reservations__btns_box";
const RESERVATION_USER_HEADER_CLASS = "reservations__user_header";

addEventListener("load", () => {
    fillReservations();
});

function fillReservations() {
    let today = new Date();
    let reservations = JSON.parse(localStorage.getItem("reservations"));
    let users = JSON.parse(localStorage.getItem("users"));
    reservations
        .filter(res => new Date(res.date) >= today)
        .forEach(res => addReservation(
            res,
            users.find(user => user.email === res.email)
        ));
}

function addReservation(reservation, user) {
    let resOuterBox = document.createElement("div");
    resOuterBox.classList.add(RESERVATION_BOX_CLASS);
    let userContainer = document.createElement("div");
    userContainer.classList.add(RESERVATION_USER_CONTAINER_CLASS);
    let resContainer = document.createElement("div");
    resContainer.classList.add(RESERVATION_INFO_CONTAINER_CLASS);
    let statusContainer = document.createElement("div");
    statusContainer.classList.add(RESERVATION_STATUS_CONTAINER_CLASS);
    if (user) {
        fillUser(
            userContainer,
            `${user.firstName} ${user.lastName}`,
            user.email,
            user.phoneNumber,
            user.birthDate
        );
    } else {
        fillUser(userContainer, reservation.name, reservation.email);
    }
    fillSingleReservation(resContainer, reservation);
    fillStatus(statusContainer, reservation);

    resOuterBox.append(userContainer, resContainer, statusContainer);
    reservationContainer.append(resOuterBox);
}

function fillUser(container, name, email, phone, dob) {
    let nameBox = document.createElement("p");
    nameBox.classList.add(RESERVATION_USER_HEADER_CLASS);
    nameBox.textContent = name;
    let emailBox = document.createElement("a");
    emailBox.setAttribute("href", `mailto:${email}`);
    emailBox.textContent = email;
    let telBox = document.createElement("a");
    if (phone) {
        telBox.setAttribute("href", `tel:${phone}`);
        telBox.textContent = "+" + phone;
    }
    let dobBox = document.createElement("p");
    if (dob) {
        dobBox.textContent = new Date(dob).toLocaleDateString(
            locale,
            DOB_DATE_FORMAT
        );
    }

    container.append(nameBox, emailBox, telBox, dobBox);
}

function fillSingleReservation(container, reservation) {
    let personsContainer = document.createElement("div");
    personsContainer.classList.add(RESERVATION_INFO_ROW_CLASS);
    let personsLabel = document.createElement("p");
    personsLabel.textContent = getTranslation(
        locale,
        "book__table__input__persons__placeholder"
    );
    let personsValue = document.createElement("p");
    personsValue.textContent = reservation.persons;
    personsContainer.append(personsLabel, personsValue);
    let dateContainer = document.createElement("div");
    dateContainer.classList.add(RESERVATION_INFO_ROW_CLASS);
    let dateLabel = document.createElement("p");
    dateLabel.textContent = getTranslation(
        locale,
        "book__table__input__date__placeholder"
    );
    let dateValue = document.createElement("p");
    let date = new Date(reservation.date);
    dateValue.textContent = date.toLocaleDateString(
        locale,
        RESERVATION_DATE_FORMAT
    );
    dateContainer.append(dateLabel, dateValue);
    let timeContainer = document.createElement("div");
    timeContainer.classList.add(RESERVATION_INFO_ROW_CLASS);
    let timeLabel = document.createElement("p");
    timeLabel.textContent = getTranslation(locale, "reservations__time");
    let timeValue = document.createElement("p");
    timeValue.textContent = date.toLocaleTimeString(locale, TIME_FORMAT);
    timeContainer.append(timeLabel, timeValue);

    container.append(
        personsContainer,
        dateContainer,
        timeContainer
    );
}

function fillStatus(container, reservation) {
    let statusBox = document.createElement("div");
    let buttonsBox = document.createElement("div");
    buttonsBox.classList.add(RESERVATION_BUTTONS_BOX_CLASS);
    let cancelBtn = document.createElement("button");
    cancelBtn.classList.add(...ACTION_BUTTON_CLASSES);
    let confirmBtn = document.createElement("button");
    confirmBtn.classList.add(...ACTION_BUTTON_CLASSES);

    applyStatus(reservation, statusBox);
    cancelBtn.textContent = getTranslation(locale, "reservations__cancel");
    confirmBtn.textContent = getTranslation(locale, "reservations__confirm");
    configureButtons(reservation, statusBox, cancelBtn, confirmBtn);

    buttonsBox.append(confirmBtn, cancelBtn);
    container.append(statusBox, buttonsBox);
}

function configureButtons(reservation, statusBox, cancelBtn, confirmBtn) {
    let cancelled = reservation.status.includes("cancelled");
    let confirmed = reservation.status.includes("confirmed");
    let confirmCb = () => confirmReservation(
        reservation,
        cancelBtn,
        confirmBtn,
        statusBox
    );
    let cancelCb = () => cancelReservation(
        reservation,
        cancelBtn,
        confirmBtn,
        statusBox
    );
    if (cancelled) {
        disableBtn(cancelBtn);
    } else if (confirmed) {
        disableBtn(confirmBtn);
    }
    confirmBtn.addEventListener("click", confirmCb);
    cancelBtn.addEventListener("click", cancelCb);
}

function cancelReservation(reservation, cancelBtn, confirmBtn, statusBox) {
    updateStatus(reservation, cancelBtn, confirmBtn, statusBox, (stored) => {
        stored.status = "reservation_cancelled";
        disableBtn(cancelBtn);
        enableBtn(confirmBtn);
    });
}

function confirmReservation(reservation, cancelBtn, confirmBtn, statusBox) {
    updateStatus(reservation, cancelBtn, confirmBtn, statusBox, (stored) => {
        stored.status = "reservation_confirmed";
        disableBtn(confirmBtn);
        enableBtn(cancelBtn);
    });
}

function updateStatus(reservation, cancelBtn, confirmBtn, statusBox, statusCb) {
    let reservations = JSON.parse(localStorage.getItem("reservations"));
    let stored = reservations.find(res => res.id === reservation.id);
    if (stored) {
        statusCb(stored);
        applyStatus(stored, statusBox);
        localStorage.setItem("reservations", JSON.stringify(reservations));
    }
}

function applyStatus(reservation, statusBox) {
    statusBox.classList = [STATUS_CLASS];
    statusBox.textContent = getTranslation(locale, reservation.status);
    statusBox.classList.add(reservation.status);
}

function disableBtn(btn) {
    btn.classList.add(DISABLED_BTN_CLASS);
}

function enableBtn(btn) {
    btn.classList.remove(DISABLED_BTN_CLASS);
}
