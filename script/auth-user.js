const authUserButton = document.querySelector("#page-settings-user-icon");

authUserButton.addEventListener("click", () => {
	if (localStorage.getItem("user")) {
		showUserModal();
	} else {
		window.location.replace("/pages/signin.html");
	}
});

function showUserModal() {
	alert(`Hello, ${JSON.parse(localStorage.getItem("user")).firstName}`);
}