const url = "./data/fisheyedata.json";
const mediasPath = "medias/";
const photographeThumbPath = mediasPath + "photographers-id-photos/";
const uiPhotographersList = document.querySelector("#photographers-list");
const uiTagNav = document.querySelector("#tag-nav");

// photographers factory
const photographersFactory = (id, firstname, lastname, city, country, tags, tagline, price, portrait) => {
  const medias = [];
  const addMedia = element => {
    medias.push(element);
  };
  return { id, firstname, lastname, city, country, tags, tagline, price, portrait, medias, addMedia };
};

// medias factory
const mediasFactory = (id, photographerId, title, image, video, tags, likes, date, price) => {
  const photographer = [];
  const addPhotographer = element => {
    photographer.push(element);
  };
  return { id, photographerId, title, image, video, tags, likes, date, price, photographer, addPhotographer };
};

// create photographers
const createPhotographers = elements => {
  console.log(elements);
  const photographers = [];
  elements.forEach(element => {
    const { id, name, city, country, tags, tagline, price, portrait } = element;
    const fullname = name.split(" ");
    const firstname = fullname[0];
    const lastname = fullname[1];
    const photographer = photographersFactory(id, firstname, lastname, city, country, tags, tagline, price, portrait);
    photographers.push(photographer);
  });
  return photographers;
};

// create medias
const createMedias = elements => {
  const mediasInit = [];
  elements.forEach(element => {
    const { id, photographerId, title, image, video, tags, likes, date, price } = element;
    const media = mediasFactory(id, photographerId, title, image, video, tags, likes, date, price);
    mediasInit.push(media);
  });
  return mediasInit;
};

// get media by photographer
const getMediasByPhotographer = (array, id) => {
  const photographerMedias = array.filter(element => element.photographerId === id);
  return photographerMedias;
};

// get photographer by id
const getPhotographerById = (array, id) => {
  return array.find(element => element.id === id);
};

// add medias to photographers
const addMediasToPhotographer = (photographersArray, mediasArray) => {
  photographersArray.forEach(photographer => {
    const media = getMediasByPhotographer(mediasArray, photographer.id);
    media.forEach(element => {
      photographer.addMedia(element);
    });
  });
  return photographersArray;
};

// add photographer to media
const addPhotographerToMedia = (photographersArray, mediasArray) => {
  mediasArray.forEach(media => {
    const photographer = getPhotographerById(photographersArray, media.photographerId);
    media.addPhotographer(photographer.firstname); // test only
    media.addPhotographer(photographer.lastname); // test only
  });
  return mediasArray;
};

// Expand Data
const finalData = (photographers, media) => {
  const photographersInit = initData(photographers, media).photographersInit;
  const mediasInit = initData(photographers, media).mediasInit;
  const photographersArray = addMediasToPhotographer(photographersInit, mediasInit);
  const mediasArray = addPhotographerToMedia(photographersInit, mediasInit);
  return { photographersArray, mediasArray };
};

// Init Data
const initData = ({ photographers, media }) => {
  const photographersInit = createPhotographers(photographers);
  console.log(photographers);
  const mediasInit = createMedias(media);
  return { photographersInit, mediasInit };
};

// Populate HTML
const populateHtml = ({ photographers, media }) => {
  const photographersArray = finalData(photographers, media).photographersArray;
  console.log(photographers);
  // uiCreatePhotographersList(photographersArray);
  // uiCreateTagList(photographersArray);
};

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
    populateHtml(data);
  })
  .catch(error => console.log(error));

// get all the tags
const getAllTheTag = elements => {
  const tagArray = [];
  elements.forEach(element => {
    element.tags.forEach(item => {
      if (!tagArray.includes(item)) {
        tagArray.push(item);
      }
    });
  });
  return tagArray;
};

// create tags list
const uiCreateTagList = elements => {
  const tagArray = getAllTheTag(elements);
  const tagList = tagArray.join('</button></li><li class="tag"><button class="btn-tag">#');

  const uiTagList = `<li class="tag"><button class="btn-tag">#${tagList}</button></li>`;
  uiTagNav.insertAdjacentHTML("beforeend", uiTagList);
};

// create photographers list
const uiCreatePhotographersList = elements => {
  elements.forEach(element => {
    const { firstname, lastname, city, country, tags, tagline, price, portrait } = element;
    const thumbnail = photographeThumbPath.concat(portrait);
    const tagList = tags.join('</button></li><li class="tag"><button class="btn-tag">#');

    const uiCard = `<article class="card"><img class="card__img" src="${thumbnail}" height="200" width="200"><h2>${firstname} ${lastname}</h2><h3>${city}, ${country}</h3><p>${tagline}</p><p>${price}€/jour</p><ul class="tag-list"><li class="tag"><button class="btn-tag">#${tagList}</button></li></ul></article>`;
    uiPhotographersList.insertAdjacentHTML("beforeend", uiCard);
  });
};
