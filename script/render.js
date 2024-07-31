
function addDishElement(title, price, about, url, type) {
    let dishElement = document.createElement('div');
    dishElement.className = 'dish__element';
    let imgElement = document.createElement('img');
    imgElement.src = url;
    imgElement.className = 'dish__element__image';
    imgElement.alt = 'dish';


    let contentElement = document.createElement('div');
    contentElement.className = 'dish__element__content';


    let titleElement = document.createElement('p');
    titleElement.className = 'dish__element__title';
    titleElement.textContent = title;
    let infoElement = document.createElement('div');
    infoElement.className = 'dish__element__info';


    let aboutElement = document.createElement('p');
    aboutElement.className = 'dish__element__about';
    let boldElement = document.createElement('b');
    boldElement.textContent = about;
    aboutElement.appendChild(boldElement);


    let lineElement = document.createElement('hr');
    lineElement.className = 'dish__element__line';


    let priceElement = document.createElement('p');
    priceElement.className = 'dish__element__price';
    priceElement.textContent = price;


    if (locale !== "en") {
        aboutElement.style.whiteSpace = "wrap";
    }

    infoElement.appendChild(aboutElement);
    infoElement.appendChild(lineElement);
    contentElement.appendChild(titleElement);
    contentElement.appendChild(infoElement);

    infoElement.appendChild(priceElement);
    dishElement.appendChild(imgElement);
    dishElement.appendChild(contentElement);


    if (type == "main") {
        const dish__elems = document.querySelectorAll(".dishes__elements");
        dish__elems[1].appendChild(dishElement);
    }


    if (type == "starters") {
        const dish__elems = document.querySelectorAll(".dishes__elements");
        dish__elems[0].appendChild(dishElement);
    }



    if (type == "dessert") {
        const dish__elems = document.querySelectorAll(".dishes__elements");
        dish__elems[2].appendChild(dishElement);
    }
}

function createPopularCard(title, price, about, imagePath, id) {
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("popular__card", "animated-card");
    cardDiv.setAttribute("dish-id", id);

    let image = document.createElement("img");
    image.src = imagePath;
    image.alt = "dish";
    image.classList.add("popular__card__image");

    let headerDiv = document.createElement("div");
    headerDiv.classList.add("popular__card__header");

    let titleP = document.createElement("p");
    titleP.textContent = title;
    titleP.classList.add("popular__card__title");

    let priceP = document.createElement("p");
    priceP.textContent = price;
    priceP.classList.add("popular__card__price");

    let lineHr = document.createElement("hr");
    lineHr.classList.add("popular__card__line");

    let aboutP = document.createElement("p");
    aboutP.textContent = about;
    aboutP.classList.add("popular__card__about");

    headerDiv.appendChild(titleP);
    headerDiv.appendChild(priceP);

    cardDiv.appendChild(image);
    cardDiv.appendChild(headerDiv);
    cardDiv.appendChild(lineHr);
    cardDiv.appendChild(aboutP);


    let popularContainer = document.querySelector(".popular__cards");
    popularContainer.appendChild(cardDiv);
}


function appendCustomerRateCard(title, about, location, url) {
    let customerRateCard = document.createElement("div");
    customerRateCard.classList.add("customer__rate__card");
    customerRateCard.classList.add("slide");
    let bioDiv = document.createElement("div");
    bioDiv.classList.add("customer__rate__card__bio");

    let logoDiv = document.createElement("div");
    logoDiv.classList.add("customer__card__bio__logo");

    let logoImg = document.createElement("img");
    let logZapatie = document.createElement("img");
    logoImg.src = url;
    logoImg.alt = "logo";

    logZapatie.src= "./static/Frame.png"
    logZapatie.alt="zapatie"
    logZapatie.classList.add("zapatie");
    logoImg.classList.add("customer__card__bio__logo__image");

    let textDiv = document.createElement("div");
    textDiv.classList.add("customer__rate__card__bio__text");

    let titleP = document.createElement("p");
    titleP.classList.add("customer__rate__card__bio__title");
    titleP.textContent = title;
    let locationP = document.createElement("p");
    locationP.classList.add("customer__rate__card__bio__location");
    locationP.textContent = location;
    textDiv.appendChild(titleP);
    textDiv.appendChild(locationP);
    logoDiv.appendChild(logoImg);
    logoDiv.appendChild(logZapatie);
    bioDiv.appendChild(logoDiv);
    bioDiv.appendChild(textDiv);

    let contentDiv = document.createElement("div");
    contentDiv.classList.add("customer__rate__card__content");

    let hr = document.createElement("hr");
    hr.classList.add("customer__rate__card__line");

    let commentP = document.createElement("p");
    commentP.classList.add("customer__rate__card__comment");
    commentP.textContent = about
    contentDiv.appendChild(hr);
    contentDiv.appendChild(commentP);

    customerRateCard.appendChild(bioDiv);
    customerRateCard.appendChild(contentDiv);


    const parent = document.querySelector('.slider-track');
    parent.appendChild(customerRateCard);
}

let xhr = new XMLHttpRequest();
xhr.open('GET', './data/data.json', false);
xhr.send();
let locale = localStorage.getItem("lang") || "en";

if (xhr.status === 200) {
    let jsonData = JSON.parse(xhr.responseText);
    jsonData.dishes__main.forEach(item => {
        addDishElement(item.title[locale], item.price, item.about[locale], item.url, "main");
    });
    jsonData.dishes__starters.forEach(item => {
        addDishElement(item.title[locale], item.price, item.about[locale], item.url, "starters");
    });
    jsonData.dishes__dessert.forEach(item => {
        addDishElement(item.title[locale], item.price, item.about[locale], item.url, "dessert");
    });

    jsonData.customers.forEach(item => {
        appendCustomerRateCard(item.title[locale], item.about[locale], item.location[locale], item.url);
    });
    initCarousel();

    jsonData.popular.forEach(item => {
        createPopularCard(
            item.title[locale],
            item.price,
            item.about[locale],
            item.url,
            item.id
        );
    });
    localStorage.setItem("dishes", JSON.stringify(jsonData.popular));

    addEventsModalWindow();
} else {
    console.error('Failed to load JSON:', xhr.status);
}
