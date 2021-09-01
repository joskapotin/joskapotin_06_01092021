import HomeController from "./controllers/Home.controller.js"
import PhotographerController from "./controllers/Photographer.controller.js"
// import Lightbox from "./modules/lightbox/lightbox.js"

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$")

const getParams = match => {
  const values = match.result.slice(1)
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1])

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]]
    }),
  )
}

const navigateTo = url => {
  history.pushState(null, null, url)
  router()
}

const router = async () => {
  const routes = [
    { path: "/", Controller: HomeController },
    { path: "/tags/:tag", Controller: HomeController },
    { path: "/photographer/:id/tags/:tag", Controller: PhotographerController },
    { path: "/photographer/:id", Controller: PhotographerController },
  ]

  // Test each route for potential match
  const potentialMatches = routes.map(route => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    }
  })

  let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null)

  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    }
  }

  const view = new match.route.Controller(getParams(match))
  view.getHtml()

  // document.querySelector("#app").replaceChildren(await view.getHtml())

  // document.querySelector("#app").addEventListener("load", Lightbox.init())
}

window.addEventListener("popstate", router)

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault()
      navigateTo(e.target.href)
    }
  })

  router()
})
