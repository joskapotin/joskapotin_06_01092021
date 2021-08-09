import getDatas, { getAllTheTag } from "./builder.js";

const url = "./data/fisheyedata.json";
const mediasPath = "medias/";
const photographeThumbPath = mediasPath + "photographers-id-photos/";
const uiPhotographersList = document.querySelector("#photographers-list");
const uiTagNav = document.querySelector("#tag-nav");

// Fetch function
const getData = async url => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erreur HTTP ! statut : ${response.status}`);
  }
  return response.json();
};

// Get Datas from fetch function
getData(url)
  .then(data => {
    uiCreatePhotographersList(data);
    uiCreateTagList(data);
  })
  .catch(error => console.log(error));

// wrap
const wrapTag = element => {
  return `<li class="tag"><a href="#${element}" class="tag-link">#${element}</a></li>`;
};

// create tag list
const createTaglist = array => {
  return array.map(element => wrapTag(element)).join("");
};

// create tags list
const uiCreateTagList = ({ photographers }) => {
  const tagArray = getAllTheTag(photographers);
  const tagList = createTaglist(tagArray);

  uiTagNav.insertAdjacentHTML("beforeend", tagList);
};

// create photographers list
const uiCreatePhotographersList = elements => {
  const photographers = getDatas(elements).photographersArray;
  photographers.forEach(photographe => {
    const { firstname, lastname, city, country, tags, tagline, price, portrait } = photographe;
    const thumbnail = photographeThumbPath.concat(portrait);
    const tagList = createTaglist(tags);

    const uiCard = `<article class="card"><img class="card__img" src="${thumbnail}" height="200" width="200"><h2 class="name">${firstname} ${lastname}</h2><h3 class="location">${city}, ${country}</h3><p class="tagline">${tagline}</p><p class="pricing">${price}€/jour</p><ul class="tag-list">${tagList}</ul></article>`;
    uiPhotographersList.insertAdjacentHTML("beforeend", uiCard);
  });
};
