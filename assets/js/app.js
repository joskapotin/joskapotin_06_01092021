import { config } from "./config.js"
import initHomePage from "./page-home.js"
;(() => {
  config.uiHomeLink.addEventListener("click", event => {
    event.preventDefault()
    initHomePage()
  })

  initHomePage()
})()
