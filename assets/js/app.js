import { config } from "./config.js"
import initHomePage from "./page-home.js"

// Init
// const initApp = apiUrl => {
//   uiHomeLink.addEventListener("click", event => {
//     initHomePage(apiUrl)
//   })

//   initHomePage(apiUrl)
// }
// initApp(apiUrl)

// IIFE : Immediatly invoued functin expression
;(() => {
  config.uiHomeLink.addEventListener("click", event => {
    event.preventDefault()
    initHomePage()
  })

  initHomePage()
})()
