const toggleBtn = document.querySelector("#page-settings-theme-toggler");

document.addEventListener("DOMContentLoaded", () => {
    init()
});

function init() {
  if (localStorage.getItem('theme')) {
    document.documentElement.setAttribute("theme", "dark");
    showLightThemeIcon();
  } else {
    document.documentElement.removeAttribute("theme");
    showDarkThemeIcon();
  }
}

toggleBtn.addEventListener("click", () => {
  if (document.documentElement.hasAttribute("theme")) {
    document.documentElement.removeAttribute("theme");
    localStorage.removeItem('theme');
    showDarkThemeIcon();
  } else {
    document.documentElement.setAttribute("theme", "dark");
    localStorage.setItem('theme', 1);
    showLightThemeIcon();
  }
});

function showLightThemeIcon() {
  toggleBtn.src = "./static/settings/theme-light-icon.svg";
}

function showDarkThemeIcon() {
  toggleBtn.src = "./static/settings/theme-dark-icon.svg";
}