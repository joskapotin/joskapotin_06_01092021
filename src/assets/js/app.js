import { removeFromDom } from "./helpers.js";
import initHomepage from "./homepage.js";

// DOM elements
const homeLink = document.getElementById("link-to-homepage");

// Remove all the elements
const resetApp = () => {
  const elements = [document.getElementById("photographers-list"), document.getElementById("tag-nav")];
  return removeFromDom(elements);
};

// Home link
homeLink.addEventListener("click", function (event) {
  resetApp();
  initHomepage();
});

// Init
const initApp = () => {
  const currentPath = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
  // const isRoot = /^(\/|\/index\.html)$/i.test(location.pathname);
  console.log(currentPath);
  if (currentPath === "" || currentPath === "index.html") {
    initHomepage();
  }
  // initHomepage();
};

initApp();
