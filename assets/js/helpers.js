// hide uiElement
const hideElement = uiElement => {
  uiElement.classList.remove("show");
  uiElement.classList.add("hide");
};

// Show uiElement
const showElement = uiElement => {
  uiElement.classList.remove("hide");
  uiElement.classList.add("show");
};

// Create an array of all the tags without duplicate
const getAllTheTag = array => {
  const tagArray = [];
  array.forEach(element => {
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
  return `<li><a href="#tag-${element}" class="tag-link">#${element}</a></li>`;
};

// create tag list
const createTaglist = array => {
  return array.map(element => wrapTag(element)).join("");
};

// Create ui tag nav
const uiCreateTagNav = (array, uiElement) => {
  const tagArray = getAllTheTag(array);
  const tagList = createTaglist(tagArray);

  uiElement.insertAdjacentHTML("beforeend", tagList);
};

// get element by id
const getElementById = (array, id) => {
  return array.find(element => element.id === id);
};

// get element by tag
const getElementsByTag = (array, tag) => {
  return array.filter(element => element.tags.find(element => element === tag));
};

// show elements by tag
const uiShowElementsbyTag = (array, tag) => {
  // first hide everyone
  document.querySelectorAll(".card").forEach(element => hideElement(element));

  // show the selected
  const elements = getElementsByTag(array, tag);
  elements.forEach(element => {
    const id = element.id;
    const uiElement = document.querySelector("#card" + id);
    showElement(uiElement);
  });
};

// Add eventlistener on all tag-link
const initTagNav = array => {
  const uiElements = document.querySelectorAll(".tag-link");
  uiElements.forEach(uiElement => {
    uiElement.addEventListener("click", function (event) {
      event.preventDefault();
      const tag = event.target.getAttribute("href").substring(5);
      uiShowElementsbyTag(array, tag);
    });
  });
};

// get media by photographer
const getMediasByPhotographer = (array, id) => {
  const photographerMedias = array.filter(element => element.photographerId === id);
  return photographerMedias;
};

// Fetch function
const fetchData = async url => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erreur HTTP ! statut : ${response.status}`);
  }
  return response.json();
};

const removeFromDom = array => {
  array.forEach(element => {
    // TODO: test if element exist before removing it
    element.remove();
  });
};

export { createTaglist, uiCreateTagNav, getElementById, uiShowElementsbyTag, initTagNav, getMediasByPhotographer, fetchData, removeFromDom };
