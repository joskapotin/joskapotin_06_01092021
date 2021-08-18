import { homeLink, apiUrl } from "./options.js"
import initHomePage from "./page-home.js"
import initPhotographerPage from "./page-photographer.js"

// Init
const initApp = apiUrl => {
  homeLink.addEventListener("click", event => {
    initHomePage(apiUrl)
  })

  const currentPath = location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
  if (currentPath === "" || currentPath === "index.html") {
    initHomePage(apiUrl)
  } else {
    initPhotographerPage(apiUrl, "925")
  }
  const pathPhotographer = "photographer/"
  console.log(pathPhotographer)
}

initApp(apiUrl)
