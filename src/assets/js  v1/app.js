import buildData from "./builder.js";
import { getAllTheTag, createTaglist, getPhotographersByTag } from "./helpers.js";

const url = "./data/fisheyedata.json";
const mediasPath = "medias/";
const photographeThumbPath = mediasPath + "photographers-id-photos/";
const uiPhotographersList = document.querySelector("#photographers-list");
const uiTagNav = document.querySelector("#tag-nav");

// Clear photographers list
const uiClearPhotographersList = () => {
  const uiPhotographers = document.querySelectorAll(".card");
  return uiPhotographers.forEach(element => element.remove());
};

// showPhotographersbyTag
const uiShowPhotographersbyTag = (photographers, tag) => {
  const photographersArray = getPhotographersByTag(photographers, tag);
  uiClearPhotographersList();
  uiCreatePhotographersList(photographersArray);
};

// Add event listeners
const initTagNav = (photographers, uiElements) => {
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
    const { firstname, lastname, city, country, tags, tagline, price, portrait } = photographe;
    const thumbnail = photographeThumbPath.concat(portrait);
    const tagList = createTaglist(tags);

    const uiCard = `<article class="card"><img class="card__img" src="${thumbnail}" height="200" width="200"><h2 class="name">${firstname} ${lastname}</h2><h3 class="location">${city}, ${country}</h3><p class="tagline">${tagline}</p><p class="pricing">${price}€/jour</p><ul class="tag-list">${tagList}</ul></article>`;
    uiPhotographersList.insertAdjacentHTML("beforeend", uiCard);
  });
  const uiElements = document.querySelectorAll(".card .tag-link");
  return initTagNav(photographers, uiElements);
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
    const uiElements = uiTagNav.querySelectorAll(".tag-link");
    return initTagNav(result, uiElements);
  })
  .catch(error => console.log(error));
