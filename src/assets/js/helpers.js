// Fetch function
const fetchData = async apiUrl => {
  const response = await fetch(apiUrl)
  if (!response.ok) {
    throw new Error(`Erreur HTTP ! statut : ${response.status}`)
  }
  return response.json()
}

const getPhotographers = async apiUrl => {
  const { photographers } = await fetchData(apiUrl)
  return photographers
}

const getMedias = async apiUrl => {
  const { media } = await fetchData(apiUrl)
  return media
}

// Create an array of all the tags without duplicate
const getAllTheTag = apiUrl => {
  const tagArray = getMedias(apiUrl).then(result => {
    const array = []
    result.forEach(element => {
      element.tags.forEach(item => {
        if (!array.includes(item)) {
          array.push(item)
        }
      })
    })
    return array
  })
  return tagArray
}

// get element by tag
const getElementsByTag = (apiUrl, elementType, tag) => {
  if (elementType.includes("photographers")) {
    const PhotographersArray = getPhotographers(apiUrl).then(result => {
      return result.filter(element => element.tags.find(element => element === tag))
    })
    return PhotographersArray
}

// get element by id
const getElementById = (array, id) => {
  return array.find(element => element.id === parseInt(id))
}

// wrap tags
const wrapTag = element => {
  return `<li><a href="#tag-${element}" class="tag-link" data-tag="${element}">#${element}</a></li>`
}

// create tag list
const createTaglist = array => {
  const tagsLi = array.map(element => wrapTag(element)).join("")
  return `<ul class="tag-list">${tagsLi}</ul>`
}

// get media by photographer
const getMediasByPhotographer = (array, id) => {
  const photographerMedias = array.filter(element => element.photographerId === parseInt(id))
  return photographerMedias
}

// show elements by tag
const uiShowElementsbyTag = (apiUrl, elementType, tag) => {
  // first hide everyone
  document.querySelectorAll("[data-filtrable]").forEach(element => hideElement(element))

  // show the selected
  getElementsByTag(apiUrl, elementType, tag).then(result => {
    result.forEach(element => {
      const id = element.id
      const uiElement = document.querySelector("#card-" + id)
      showElement(uiElement)
    })
  })
}

// Add eventlistener on all tag-link
const initTagNav = (apiUrl, elementType) => {
  const uiElements = document.querySelectorAll("[data-tag]")
  uiElements.forEach(uiElement => {
    uiElement.addEventListener("click", event => {
      const tag = event.target.dataset.tag
      uiShowElementsbyTag(apiUrl, elementType, tag)
    })
  })
}

// hide uiElement
const hideElement = uiElement => {
  uiElement.classList.remove("show")
  uiElement.classList.add("hide")
}

// Show uiElement
const showElement = uiElement => {
  uiElement.classList.remove("hide")
  uiElement.classList.add("show")
}

// Remove all the elements
const resetApp = () => {
  const elements = document.querySelectorAll("[data-reset]")
  elements.forEach(element => {
    element.remove()
  })
}

export { getAllTheTag, createTaglist, getElementById, uiShowElementsbyTag, initTagNav, getMediasByPhotographer, fetchData, getPhotographers, getMedias, resetApp }
