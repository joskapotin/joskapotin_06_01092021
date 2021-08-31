import Homepage from "./views/Home.view.js"
import Photographer from "./views/Photographer.view.js"
import Lightbox from "./modules/lightbox/lightbox.js"

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
    { path: "/", View: Homepage },
    { path: "/tags/:tag", View: Homepage },
    { path: "/photographer/:id/tags/:tag", View: Photographer },
    { path: "/photographer/:id", View: Photographer },
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

  const view = new match.route.View(getParams(match))

  document.querySelector("#app").replaceChildren(await view.getHtml())

  document.querySelector("#app").addEventListener("load", Lightbox.init())
}

window.addEventListener("popstate", router)

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
