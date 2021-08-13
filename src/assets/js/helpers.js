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

// Create an array of all the tags without duplicate
const getAllTheTag = array => {
  const tagArray = []
  array.forEach(element => {
    element.tags.forEach(item => {
      if (!tagArray.includes(item)) {
        tagArray.push(item)
      }
    })
  })
  return tagArray
}

// wrap tags
const wrapTag = element => {
  return `<li><a href="#tag-${element}" class="tag-link">#${element}</a></li>`
}

// create tag list
const createTaglist = array => {
  return array.map(element => wrapTag(element)).join("")
}

// get element by id
const getElementById = (array, id) => {
  return array.find(element => element.id === parseInt(id))
}

// get media by photographer
const getMediasByPhotographer = (array, id) => {
  const photographerMedias = array.filter(element => element.photographerId === parseInt(id))
  return photographerMedias
}

// get element by tag
const getElementsByTag = (array, tag) => {
  return array.filter(element => element.tags.find(element => element === tag))
}

// show elements by tag
const uiShowElementsbyTag = (array, tag) => {
  // first hide everyone
  document.querySelectorAll(".card").forEach(element => hideElement(element))

  // show the selected
  const elements = getElementsByTag(array, tag)
  elements.forEach(element => {
    const id = element.id
    const uiElement = document.querySelector("#card-" + id)
    showElement(uiElement)
  })
}

// Add eventlistener on all tag-link
const initTagNav = array => {
  const uiElements = document.querySelectorAll(".tag-link")
  uiElements.forEach(uiElement => {
    uiElement.addEventListener("click", event => {
      // event.preventDefault();
      const tag = event.target.getAttribute("href").substring(5)
      uiShowElementsbyTag(array, tag)
    })
  })
}

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

// Remove all the elements
const resetApp = () => {
  const elements = document.querySelectorAll("[data-reset]")
  elements.forEach(element => {
    element.remove()
  })
}

const sumPropValue = (array, prop) => {
  return array.reduce((prev, cur) => prev + cur[prop], 0)
}

export { getAllTheTag, createTaglist, getElementById, uiShowElementsbyTag, initTagNav, getMediasByPhotographer, fetchData, getPhotographers, getMedias, resetApp, sumPropValue }
