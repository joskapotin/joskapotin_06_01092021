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

// get photographer by id
const getPhotographerById = (array, id) => {
  return array.find(element => element.id === id);
};

// get media by photographer
const getMediasByPhotographer = (array, id) => {
  const photographerMedias = array.filter(element => element.photographerId === id);
  return photographerMedias;
};

// function initialisation photographers
const buildPhotographers = elements => {
  const photographersInitArray = [];
  elements.forEach(element => {
    const { id, name, city, country, tags, tagline, price, portrait } = element;
    const fullname = name.split(" ");
    const firstname = fullname[0];
    const lastname = fullname[1];
    const photographer = photographersFactory(id, firstname, lastname, city, country, tags, tagline, price, portrait);
    photographersInitArray.push(photographer);
  });
  return photographersInitArray;
};

// function initialisation media
const buildMedias = elements => {
  const mediasInitArray = [];
  elements.forEach(element => {
    const { id, photographerId, title, image, video, tags, likes, date, price } = element;
    const media = mediasFactory(id, photographerId, title, image, video, tags, likes, date, price);
    mediasInitArray.push(media);
  });
  return mediasInitArray;
};

// function expand photographers with medias
const expandPhotographers = (photographers, medias) => {
  photographers.forEach(photographer => {
    const media = getMediasByPhotographer(medias, photographer.id);
    media.forEach(element => {
      photographer.addMedia(element);
    });
  });
  return photographers;
};

// function expand medias with photographer
const expandMedias = (photographers, medias) => {
  medias.forEach(media => {
    const photographer = getPhotographerById(photographers, media.photographerId);
    media.addPhotographer(photographer.firstname);
    media.addPhotographer(photographer.lastname);
  });
  return medias;
};

// function create photographers
const buildData = ({ photographers, media }) => {
  const photographersInitArray = buildPhotographers(photographers);
  const mediasInitArray = buildMedias(media);

  const photographersArray = expandPhotographers(photographersInitArray, mediasInitArray);
  const mediasArray = expandMedias(photographersInitArray, mediasInitArray);
  return { photographersArray, mediasArray };
};

// function getDatas
const getDatas = elements => {
  return buildData(elements);
};

export default getDatas;
export { getAllTheTag, getPhotographerById, getMediasByPhotographer };
