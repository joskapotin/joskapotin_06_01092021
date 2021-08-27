import config from "./api/config.js"
import { initHomepage } from "./pages/page.home.js"
;(() => {
  config.uiHomeLink.addEventListener("click", event => {
    event.preventDefault()
    initHomepage()
  })

  initHomepage()
})()
