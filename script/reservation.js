const reservationForm = document.querySelector(".book__table__form");
const nameInput = document.querySelector("#book__table__name_input");
const emailInput = document.querySelector("#book__table__email_input");
const personsInput = document.querySelector("#book__table__persons_input");
const timeInput = document.querySelector("#book__table__time_input");
const dateInput = document.querySelector("#book__table__date_input");
const reservationError = document.querySelector(".book__table__error");
const successModal = document.querySelector("#reservation-modal");
const successModalBtn = successModal.querySelector(".modal__window__btn");

const today = new Date();

reservationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (reservationForm.checkValidity()) {
        saveReservation();
        successModal.style.display = "flex";
        document.body.style.overflowY = "hidden";
    }
});

successModalBtn.addEventListener("click", () => {
    window.location.replace("/index.html");
});

if (authUser) {
    nameInput.value = authUser.firstName;
    emailInput.value = authUser.email;
}

dateInput.min = `${today.getFullYear()}-${addLeadingZero(today.getMonth() + 1)}-${addLeadingZero(today.getDate() + 1)}`;
dateInput.max = `${today.getFullYear()}-${addLeadingZero(today.getMonth() + 3)}-${addLeadingZero(today.getDate())}`;
function addLeadingZero(num) {
	return num < 10
		? `0${num}`
		: num;
}

function saveReservation() {
    let stored = JSON.parse(localStorage.getItem("reservations")) || [];
    stored.push({
        id: stored.length + 1,
        name: nameInput.value,
        email: emailInput.value,
        persons: personsInput.value,
        date: new Date(dateInput.value + " " + timeInput.value),
        status: "reservation_pending",
    });
    localStorage.setItem("reservations", JSON.stringify(stored));
}

nameInput.addEventListener("input", () => {
    clearValidation();
    let validity = nameInput.validity;
    if (validity.valueMissing) {
        reservationError.textContent = getTranslation(locale, "auth-empty-fname");
    } else if (validity.patternMismatch) {
        reservationError.textContent = getTranslation(locale, "auth-invalid-fname");
    } else if (validity.tooShort) {
        reservationError.textContent = getTranslation(locale, "auth-too-short-fname");
    }
});

emailInput.addEventListener("input", () => {
    clearValidation();
    let validity = emailInput.validity;
    if (validity.valueMissing) {
        reservationError.textContent = getTranslation(locale, "auth-empty-email");
    } else if (validity.patternMismatch) {
        reservationError.textContent = getTranslation(locale, "auth-invalid-email");
    }
});

personsInput.addEventListener("input", () => {
    clearValidation();
    let validity = personsInput.validity;
    if (validity.valueMissing) {
        reservationError.textContent = getTranslation(locale, "reservation-empty-persons");
    } else if (validity.rangeOverflow) {
        reservationError.textContent = getTranslation(locale, "reservation-too-many-persons");
    } else if (validity.rangeUnderflow) {
        reservationError.textContent = getTranslation(locale, "reservation-too-few-persons")
    }
});

timeInput.addEventListener("input", () => {
    clearValidation();
    let validity = timeInput.validity;
    if (validity.valueMissing) {
        reservationError.textContent = getTranslation(locale, "reservation-empty-time");
    } else if (validity.rangeOverflow) {
        reservationError.textContent = getTranslation(locale, "reservation-overflow-time");
    } else if (validity.rangeUnderflow) {
        reservationError.textContent = getTranslation(locale, "reservation-underflow-time")
    } else if (validity.stepMismatch) {
        reservationError.textContent = getTranslation(locale, "reservation-time-step");
    }
});

dateInput.addEventListener("input", () => {
    clearValidation();
    let validity = dateInput.validity;
    if (validity.valueMissing) {
        reservationError.textContent = getTranslation(locale, "reservation-empty-date");
    } else if (validity.rangeOverflow) {
        reservationError.textContent = getTranslation(locale, "reservation-overflow-date");
    } else if (validity.rangeUnderflow) {
        reservationError.textContent = getTranslation(locale, "reservation-underflow-date")
    }
});

function clearValidation() {
    reservationError.textContent = "";
}
