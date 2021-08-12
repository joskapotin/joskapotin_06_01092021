import { homeLink, apiUrl } from "./options.js"
import { resetApp } from "./helpers.js"
import initHomePage from "./homePage.js"

// Home link
homeLink.addEventListener("click", event => {
  resetApp()
  initHomePage(apiUrl)
})

// Init
const initApp = apiUrl => {
  const currentPath = location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
  if (currentPath === "" || currentPath === "index.html") {
    initHomePage(apiUrl)
  }
}

initApp(apiUrl)
