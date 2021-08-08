const url = "./data/fisheyedata.json";
const mediasPath = "medias/";
const photographeThumbPath = mediasPath + "photographers-id-photos/";
const photographersTable = document.querySelector("#photographes-table__body");
const mediasTable = document.querySelector("#medias-table__body");

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
    media.addPhotographer(photographer.firstname);
    media.addPhotographer(photographer.lastname);
  });
  return mediasArray;
};

// Handle construction
const construction = ({ photographers, media }) => {
  const photographersInit = createPhotographers(photographers);
  const mediasInit = createMedias(media);
  const photographersArray = addMediasToPhotographer(photographersInit, mediasInit);
  const mediasArray = addPhotographerToMedia(photographersInit, mediasInit);
  addPhotographersTable(photographersArray);
  addMediasTable(mediasArray);
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
    construction(data);
  })
  .catch(error => console.log(error));

// add photographers to the table
const addPhotographersTable = elements => {
  elements.forEach(element => {
    const { id, firstname, lastname, city, country, tags, tagline, price, portrait, medias } = element;
    const tagString = tags.join(", ");
    const titlesArray = [];
    medias.forEach(element => {
      titlesArray.push(element.title);
    });
    const titles = titlesArray.join(", ");
    const row = `<tr><td>${id}</td><td>${firstname}</td><td>${lastname}</td><td>${city}</td><td>${country}</td><td>${tagString}</td><td>${tagline}</td><td>${price}</td><td>${portrait}</td><td>${titles}</td></tr>`;
    photographersTable.insertAdjacentHTML("beforeend", row);
  });
};

// add medias to the table
const addMediasTable = elements => {
  elements.forEach(element => {
    const { id, photographerId, title, image, video, tags, likes, date, price, photographer } = element;
    const tagString = tags.join(", ");
    const row = `<tr><td>${id}</td><td>${photographerId}</td><td>${photographer[0]} ${photographer[1]}</td><td>${title}</td><td>${image}</td><td>${video}</td><td>${tagString}</td><td>${likes}</td><td>${date}</td><td>${price}</td></tr>`;
    mediasTable.insertAdjacentHTML("beforeend", row);
  });
};
