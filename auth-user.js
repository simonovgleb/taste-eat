const authUserButton = document.querySelector("#page-settings-user-icon");

authUserButton.addEventListener("click", () => {
	if (localStorage.getItem("user")) {
		showUserModal();
	} else {
		window.location.replace("/signin.html");
	}
});

function showUserModal() {
	alert(localStorage.getItem("user"));
}