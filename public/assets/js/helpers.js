// Fetch function
const getData = async apiUrl => {
  const response = await fetch(apiUrl)
  if (!response.ok) {
    throw new Error(`Erreur HTTP ! statut : ${response.status}`)
  }
  return response.json()
}

const getAllTheTag = async apiUrl => {
  const { media } = await getData(apiUrl)
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

const getElementsByTag = async (apiUrl, elementName, tag) => {
  const { photographers, media } = await getData(apiUrl)

  if (elementName.match("photographers")) {
    return photographers.filter(element => element.tags.find(element => element === tag))
  } else if (elementName.match("medias")) {
    return media.filter(element => element.tags.find(element => element === tag))
  }
}

const getMediasByPhotographer = async (apiUrl, id) => {
  const { media } = await getData(apiUrl)
  const medias = media.filter(element => element.photographerId === parseInt(id))
  return medias
}

const getElementById = (array, id) => {
  return array.find(element => element.id === parseInt(id))
}

const wrapTag = element => {
  return `<li><a href="#tag-${element}" class="tag-link" data-tag="${element}">#${element}</a></li>`
}

const createTaglist = array => {
  const tagsList = array.map(element => wrapTag(element)).join("")
  return `<ul class="tag-list">${tagsList}</ul>`
}

const uiShowElementsbyTag = async (apiUrl, elementName, tag) => {
  // first hide everyone
  document.querySelectorAll("[data-filtrable]").forEach(element => hideElement(element))

  // show the selected
  const response = await getElementsByTag(apiUrl, elementName, tag)
  response.forEach(element => {
    console.log(element.id)
    const uiElement = document.querySelector(`[data-id="${element.id}"]`)
    console.log(uiElement)
    showElement(uiElement)
  })
}

const initTagNav = (apiUrl, elementName) => {
  // This function is used for both photographer and media so we need to specifie which in elementName "photographers" or "medias"
  const uiElements = document.querySelectorAll("[data-tag]")
  uiElements.forEach(uiElement => {
    uiElement.addEventListener("click", event => {
      const tag = event.target.dataset.tag
      uiShowElementsbyTag(apiUrl, elementName, tag)
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

export { getData, getAllTheTag, getMediasByPhotographer, getElementById, createTaglist, initTagNav, resetApp }
