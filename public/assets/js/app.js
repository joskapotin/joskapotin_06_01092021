import initHomepage from "./homepage.js";
import { removeFromDom } from "./helpers.js";

const homeLink = document.getElementById("link-to-homepage");

const resetApp = () => {
  const elements = [document.getElementById("photographers-list"), document.getElementById("tag-nav")];
  return removeFromDom(elements);
};

homeLink.addEventListener("click", function (event) {
  resetApp();
  initHomepage();
});

const initApp = url => {
  const isRoot = /^(\/|\/index\.html)$/i.test(location.pathname);
  if (isRoot) {
    initHomepage();
  }
};

initApp();
