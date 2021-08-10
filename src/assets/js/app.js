import buildData from "./builder.js";
import { getAllTheTag, createTaglist, getPhotographersByTag } from "./helpers.js";

const url = "./data/fisheyedata.json";
const mediasPath = "medias/";
const photographeThumbPath = mediasPath + "photographers-id-photos/";
const uiPhotographersList = document.querySelector("#photographers-list");
const uiTagNav = document.querySelector("#tag-nav");

// hide uiElement visibility
const hideElement = uiElement => {
  uiElement.classList.remove("show");
  uiElement.classList.add("hide");
};

// Show uiElement visibility
const showElement = uiElement => {
  uiElement.classList.remove("hide");
  uiElement.classList.add("show");
};

// showPhotographersbyTag
const uiShowPhotographersbyTag = (photographers, tag) => {
  // first hide everyone
  uiPhotographersList.querySelectorAll(".card").forEach(element => hideElement(element));

  // show the selected
  const photographersArray = getPhotographersByTag(photographers, tag);
  photographersArray.forEach(element => {
    const id = element.id;
    const uiElement = uiPhotographersList.querySelector("#card" + id);
    showElement(uiElement);
  });
};

// Add event listeners
const initTagNav = photographers => {
  const uiElements = document.querySelectorAll(".tag-link");
  uiElements.forEach(element => {
    element.addEventListener("click", function (event) {
      // event.preventDefault();
      const tag = event.target.getAttribute("href").substring(1);
      uiShowPhotographersbyTag(photographers, tag);
    });
  });
};

// Create tag nav
const uiCreateTagList = photographers => {
  const tagArray = getAllTheTag(photographers);
  const tagList = createTaglist(tagArray);

  uiTagNav.insertAdjacentHTML("beforeend", tagList);
};

// Create photographers list
const uiCreatePhotographersList = photographers => {
  photographers.forEach(photographe => {
    const { id, firstname, lastname, city, country, tags, tagline, price, portrait } = photographe;
    const thumbnail = photographeThumbPath.concat(portrait);
    const tagList = createTaglist(tags);

    const uiCard = `<article class="card" id="card${id}"><img class="card__img" src="${thumbnail}" height="200" width="200"><h2 class="name">${firstname} ${lastname}</h2><h3 class="location">${city}, ${country}</h3><p class="tagline">${tagline}</p><p class="pricing">${price}€/jour</p><ul class="tag-list">${tagList}</ul></article>`;
    uiPhotographersList.insertAdjacentHTML("beforeend", uiCard);
  });
};

// Init HTML
const initHtml = ({ photographers, medias }) => {
  uiCreatePhotographersList(photographers);
  uiCreateTagList(photographers);
  return photographers;
};

// Fetch function
const fetchData = async url => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erreur HTTP ! statut : ${response.status}`);
  }
  return response.json();
};

// Get Datas from fetch then run build objects then run build html
fetchData(url)
  .then(result => {
    return buildData(result);
  })
  .then(result => {
    return initHtml(result);
  })
  .then(result => {
    return initTagNav(result);
  })
  .catch(error => console.log(error));
