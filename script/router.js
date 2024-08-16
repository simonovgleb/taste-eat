function pathPrefix() {
    return "." +
        window.location.pathname
            .replace(/\/[A-z]+\.html/, "/")
            .replace(/\/(?=([A-z]+-[A-z]+))[A-z-]+/, "")
            .replaceAll(/\/[A-z]+/g, "/..")
}

function routeSignIn() {
    window.location.replace(pathPrefix() + "pages/signin.html");
}

function routeHome() {
    window.location.replace(pathPrefix() + "index.html");
}
