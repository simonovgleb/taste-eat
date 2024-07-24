const authUserButton = document.querySelector("#page-settings-user-icon");
const authUserModal = document.querySelector("#auth-user-modal");
const phoneBox = document.querySelector("#auth-modal-phone");
const emailBox = document.querySelector("#auth-modal-email");
const dobBox = document.querySelector("#auth-modal-dob");
const passwordBox = document.querySelector("#auth-modal-password");
const fNameBox = document.querySelector("#auth-modal-fname");
const lNameBox = document.querySelector("#auth-modal-lname");
const patronymicBox = document.querySelector("#auth-modal-patronymic");
const nicknameBox = document.querySelector("#auth-modal-nickname");
const userLinks = document.querySelector("#auth-modal-user-links");
const adminLinks = document.querySelector("#auth-modal-admin-links");
const resetBtn = document.querySelector("#auth-modal-reset-btn");
const signOutBtn = document.querySelector("#auth-modal-sign-out-btn");

let authUser = JSON.parse(localStorage.getItem("user"));

addEventListener("beforeunload", () => {
	if (authUser) {
		localStorage.setItem("user", JSON.stringify(authUser));
	}
});

authUserButton.addEventListener("click", () => {
	if (authUser) {
		showUserModal();
	} else {
		window.location.replace("/pages/signin.html");
	}
});

function showUserModal() {
	phoneBox.value = "+" + authUser.phoneNumber;
	emailBox.value = authUser.email;
	dobBox.value = authUser.birthDate;
	passwordBox.value = authUser.password;
	fNameBox.value = authUser.firstName;
	lNameBox.value = authUser.lastName;
	patronymicBox.value = authUser.patronymic;
	nicknameBox.value = authUser.username;

	if (authUser.roles.includes("ADMIN")) {
		adminLinks.style.display = "flex";
		userLinks.style.display = "none";
	} else {
		userLinks.style.display = "flex";
		adminLinks.style.display = "none";
	}

	authUserModal.style.display = "flex";
	document.body.style.overflow = "hidden";
}

resetBtn.addEventListener("click", () => {
	removePageSettings();
	window.location.reload();
});

function removePageSettings() {
	localStorage.removeItem("lang");
	localStorage.removeItem("theme");
}

signOutBtn.addEventListener("click", () => {
	authUser = undefined;
	localStorage.removeItem("user");
	removePageSettings();
	window.location.replace("/index.html");
});

authUserModal
	.querySelector(".modal__overlay")
	.addEventListener("click", () => {
		authUserModal.style.display = "none";
		document.body.style.overflowY = "scroll";
	});
