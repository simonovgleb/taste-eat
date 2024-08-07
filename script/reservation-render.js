const activeContainer = document.querySelector(".reservations__active");
const prevContainer = document.querySelector(".reservations__previous");

const ACTIVE_DATE_FORMAT = {
    weekday: "short",
    month: "short",
    day: "numeric"
};
const PREV_DATE_FORMAT = {
    month: "short",
    day: "numeric",
    year: "numeric"
};
const TIME_FORMAT = {
    hour: "numeric",
    minute: "numeric"
};
const locale = localStorage.getItem("lang") || "en";
const RESERVATION_BOX_CLASS = "reservations__single_box";
const RESERVATION_INFO_ROW_CLASS = "reservations__info_row";
const RESERVATION_INFO_CONTAINER_CLASS = "reservations__info_box";
const CANCEL_BUTTON_CLASSES = [
    "sign__in__button",
    "btn__animation",
    "lng-reservations__cancel",
    "reservations__cancel_btn"
];
const STATUS_CLASS = "reservation__status";
const DISABLED_BTN_CLASS = "reservations__disabled_btn";
const PREV_STATUS_CLASS = "reservations__prev_status";
const PREV_DATE_CLASS = "reservations__prev_date";

addEventListener("load", () => {
    fillReservations();
});

function fillReservations() {
    if (!authUser) {
        window.location.replace("/pages/signin.html");
    } else {
        let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
        let today = new Date();
        reservations
            .filter(reservation => reservation.email === authUser.email)
            .forEach(reservation => {
                let date = new Date(reservation.date);
                if (date < today) {
                    addPreviousReservation(reservation);
                } else {
                    addActiveReservation(reservation);
                }
            });
    }
}

function addActiveReservation(reservation) {
    let reservationContainer = document.createElement("div");
    reservationContainer.classList.add(RESERVATION_BOX_CLASS);
    let infoContainer = document.createElement("div");
    infoContainer.classList.add(RESERVATION_INFO_CONTAINER_CLASS);
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
    dateValue.textContent = date.toLocaleDateString(locale, ACTIVE_DATE_FORMAT);
    dateContainer.append(dateLabel, dateValue);
    let timeContainer = document.createElement("div");
    timeContainer.classList.add(RESERVATION_INFO_ROW_CLASS);
    let timeLabel = document.createElement("p");
    timeLabel.textContent = getTranslation(locale, "reservations__time");
    let timeValue = document.createElement("p");
    timeValue.textContent = date.toLocaleTimeString(locale, TIME_FORMAT);
    timeContainer.append(timeLabel, timeValue);
    let statusContainer = document.createElement("div");
    describeStatus(reservation, statusContainer, true);
    let cancelButton = document.createElement("button");
    cancelButton.classList.add(...CANCEL_BUTTON_CLASSES);
    cancelButton.textContent = getTranslation(locale, "reservations__cancel");
    if (!reservation.status.includes("pending")) {
        cancelButton.classList.add(DISABLED_BTN_CLASS);
    } else {
        cancelButton.addEventListener(
            "click",
            () => cancelReservation(reservation, statusContainer, cancelButton)
        );
    }

    infoContainer.append(
        personsContainer,
        dateContainer,
        timeContainer,
        statusContainer
    );
    reservationContainer.append(infoContainer, cancelButton);
    activeContainer.append(reservationContainer);
}

function addPreviousReservation(reservation) {
    let reservationContainer = document.createElement("div");
    reservationContainer.classList.add(RESERVATION_BOX_CLASS);
    let dateContainer = document.createElement("p");
    dateContainer.classList.add(PREV_DATE_CLASS);
    dateContainer.textContent = new Date(reservation.date)
        .toLocaleDateString(locale, PREV_DATE_FORMAT);
    let statusContainer = document.createElement("div");
    statusContainer.classList.add(PREV_STATUS_CLASS);
    describeStatus(reservation, statusContainer, false);

    reservationContainer.append(dateContainer, statusContainer);
    prevContainer.append(reservationContainer);
}

function describeStatus(reservation, container, isActive) {
    let status = (isActive || reservation.status.includes("cancelled"))
        ? reservation.status
        : "reservation_complete";

    container.textContent = getTranslation(locale, status);
    container.classList.add(status, STATUS_CLASS);
}

function cancelReservation(reservation, statusContainer, cancelBtn) {
    let reservations = JSON.parse(localStorage.getItem("reservations"));
    let stored = reservations.find(res => res.id === reservation.id);
    if (stored) {
        stored.status = "reservation_cancelled";
        cancelBtn.classList.add(DISABLED_BTN_CLASS);
        describeStatus(stored, statusContainer, true);
        localStorage.setItem("reservations", JSON.stringify(reservations));
    }
}
