import initPhotographersCards from "./cards-photographers.js"
import initMediasCards from "./cards-medias.js"

// request function
const requestData = async apiUrl => {
  const response = await fetch(apiUrl)
  if (!response.ok) {
    throw new Error(`Erreur HTTP ! statut : ${response.status}`)
  }
  return response.json()
}

const requestAllTheTag = async apiUrl => {
  const { media } = await requestData(apiUrl)
  const tagArray = []
  media.forEach(element => {
    element.tags.forEach(item => {
      // Create an array of all the tags without duplicate
      if (!tagArray.includes(item)) {
        tagArray.push(item)
      }
    })
  })
  return tagArray
}

const requestElementsByTag = async (apiUrl, elementName, tag, photographerId) => {
  const { photographers } = await requestData(apiUrl)
  if (elementName.match("photographers")) {
    return photographers.filter(element => element.tags.find(element => element === tag))
  } else if (elementName.match("medias")) {
    const medias = await requestMediasByPhotographer(apiUrl, photographerId)
    return medias.filter(element => element.tags.find(element => element === tag))
  }
}

const requestMediasByPhotographer = async (apiUrl, id) => {
  const { media } = await requestData(apiUrl)
  const medias = media.filter(element => element.photographerId === parseInt(id))
  return medias
}

const sortByPopularity = elements => {
  return elements.sort((a, b) => b.likes - a.likes)
}

const sortByTitle = elements => {
  elements.sort((a, b) => a.title.localeCompare(b.title))
}

const getElementById = (array, id) => {
  return array.find(element => element.id === parseInt(id))
}

const wrapTag = element => {
  return `<li><a href="#tag-${element}" class="tag-link" data-tag="${element}">#${element}</a></li>`
}

const createTagNav = array => {
  const tagNav = array.map(element => wrapTag(element)).join("")
  return `<nav class="tag-nav" data-reset><ul class="tag-list">${tagNav}</ul></nav>`
}

const createNavBar = async apiUrl => {
  const allTheTags = await requestAllTheTag(apiUrl)
  return createTagNav(allTheTags)
}

const ShowElementsbyTag = async ({ apiUrl, type, tag, photographerId }) => {
  const elements = await requestElementsByTag(apiUrl, type, tag, photographerId)
  if (type === "photographers") {
    return initPhotographersCards(apiUrl, elements)
  } else if (type === "medias") {
    return initMediasCards(elements, photographerId)
  }
}

const initTagNav = filter => {
  // This function is used for both photographer and media so the parameter type can be or photographers or medias
  filter.uiElements.forEach(uiElement => {
    uiElement.addEventListener("click", event => {
      filter.tag = event.target.dataset.tag
      // uggly need to find a way
      filter.photographerId = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.dataset.id
      ShowElementsbyTag(filter)
    })
  })
}

const resetPage = () => {
  const elements = document.querySelectorAll("[data-reset]")
  elements.forEach(element => {
    element.remove()
  })
}

export { requestData, createNavBar, requestMediasByPhotographer, sortByPopularity, sortByTitle, getElementById, createTagNav, initTagNav, resetPage }
