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

authUserButton.addEventListener("click", () => {
	if (localStorage.getItem("user")) {
		showUserModal();
	} else {
		window.location.replace("/pages/signin.html");
	}
});

function showUserModal() {
	let user = JSON.parse(localStorage.getItem("user"));
	phoneBox.value = "+" + user.phoneNumber;
	emailBox.value = user.email;
	dobBox.value = user.birthDate;
	passwordBox.value = user.password;
	fNameBox.value = user.firstName;
	lNameBox.value = user.lastName;
	patronymicBox.value = user.patronymic;
	nicknameBox.value = user.username;

	if (user.roles.includes("ADMIN")) {
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
	localStorage.removeItem("user");
	localStorage.removeItem("lang");
	localStorage.removeItem("theme");
	window.location.replace("/index.html");
});

authUserModal
	.querySelector(".modal__overlay")
	.addEventListener("click", () => {
		authUserModal.style.display = "none";
		document.body.style.overflowY = "scroll";
	});
