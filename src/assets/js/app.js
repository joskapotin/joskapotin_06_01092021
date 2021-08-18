import { homeLink, apiUrl } from "./options.js"
import initHomePage from "./page-home.js"

// Init
const initApp = apiUrl => {
  homeLink.addEventListener("click", event => {
    initHomePage(apiUrl)
  })

  const currentPath = location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
  if (currentPath === "" || currentPath === "index.html") {
    initHomePage(apiUrl)
  }
}

initApp(apiUrl)
