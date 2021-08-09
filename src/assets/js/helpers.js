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

// wrap tags
const wrapTag = element => {
  return `<li><a href="#${element}" class="tag-link">#${element}</a></li>`;
};

// create tag list
const createTaglist = array => {
  return array.map(element => wrapTag(element)).join("");
};

// get photographer by id
const getPhotographerById = (array, id) => {
  return array.find(element => element.id === id);
};

// get photographer by tag
const getPhotographersByTag = (photographers, tag) => {
  return photographers.filter(photographer => photographer.tags.find(element => element === tag));
};

// get media by photographer
const getMediasByPhotographer = (array, id) => {
  const photographerMedias = array.filter(element => element.photographerId === id);
  return photographerMedias;
};

export { getAllTheTag, getPhotographerById, getMediasByPhotographer, createTaglist, getPhotographersByTag };
