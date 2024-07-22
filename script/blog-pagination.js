const pageNumber = document.querySelector("#blog-pagination-page");
const firstPage = document.querySelector("#blog-pagination-first-page");
const prevPage = document.querySelector("#blog-pagination-prev-page");
const nextPage = document.querySelector("#blog-pagination-next-page");
const lastPage = document.querySelector("#blog-pagination-last-page");
const MAX_PAGE = 5;
const PER_PAGE = 2;
const BUTTON_DISABLED_CLASS = "disabled";
const CARD_HIDDEN_CLASS = "hidden";

let currentPage = 1;

firstPage.addEventListener("click", () => {
	if (currentPage > 1) {
		currentPage = 1;
		updateControls();
		displayPage();
	}
});

prevPage.addEventListener("click", () => {
	if (currentPage > 1) {
		currentPage--;
		updateControls();
		displayPage();
	}
});

nextPage.addEventListener("click", () => {
	if (currentPage < MAX_PAGE) {
		currentPage++;
		updateControls();
		displayPage();
	}
});

lastPage.addEventListener("click", () => {
	if (currentPage < MAX_PAGE) {
		currentPage = MAX_PAGE;
		updateControls();
		displayPage();
	}
});

function displayPage() {
	let offset = (currentPage - 1) * PER_PAGE;

	Array.from(document.querySelectorAll(".blog__card"))
		.forEach((card, index) => {
			if (index < offset || ((index - offset) >= PER_PAGE)) {
				card.classList.add(CARD_HIDDEN_CLASS);
			} else {
				card.classList.remove(CARD_HIDDEN_CLASS);
			} 
		})
}

function updateControls() {
	pageNumber.textContent = currentPage;
	if (currentPage === 1) {
		disablePrev();
		enableNext();
	} else if (currentPage === MAX_PAGE) {
		enablePrev();
		disableNext();
	} else {
		enablePrev();
		enableNext();
	}
}

function disablePrev() {
	prevPage.classList.add(BUTTON_DISABLED_CLASS);
	firstPage.classList.add(BUTTON_DISABLED_CLASS);
}

function enablePrev() {
	firstPage.classList.remove(BUTTON_DISABLED_CLASS);
	prevPage.classList.remove(BUTTON_DISABLED_CLASS);
}

function disableNext() {
	nextPage.classList.add(BUTTON_DISABLED_CLASS);
	lastPage.classList.add(BUTTON_DISABLED_CLASS);
}

function enableNext() {
	nextPage.classList.remove(BUTTON_DISABLED_CLASS);
	lastPage.classList.remove(BUTTON_DISABLED_CLASS);
}