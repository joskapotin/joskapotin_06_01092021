import { config } from "./config.js"

// request function
const requestData = async () => {
  try {
    const response = await fetch(config.apiUrl)
    const data = await response.json()
    return data
  } catch (err) {
    console.error(err)
  }
}

const getPhotographers = async () => {
  const { photographers } = await requestData()
  return photographers
}

const getMedias = async () => {
  const { media } = await requestData()
  return media
}

const requestAllTheTag = async () => {
  const medias = await getMedias()
  // Create an array of all the tags with duplicate
  const allTheTagsDup = medias.map(media => {
    return media.tags.join()
  })
  // Create an array of all the tags without duplicate
  return [...new Set(allTheTagsDup)]
}

const formatAlternativeText = text => {
  return text.slice(0, -4).replaceAll("_", " ")
}

const sortByPopularity = elements => {
  return elements.sort((a, b) => b.likes - a.likes)
}

const sortByTitle = elements => {
  return elements.sort((a, b) => a.title.localeCompare(b.title))
}

const sortByDate = elements => {
  return elements.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
}

const getElementById = (array, id) => {
  return array.find(element => element.id === parseInt(id))
}

const wrapTag = element => {
  return `<li><a href="tag/${element}" class="tag-link" data-tag="${element}">#${element}</a></li>`
}

const createTagNav = array => {
  const tagNav = array
    .sort()
    .map(element => wrapTag(element))
    .join("")
  return `<nav class="tag-nav" data-reset><ul class="tag-list">${tagNav}</ul></nav>`
}

const createNavBar = async () => {
  const allTheTags = await requestAllTheTag()
  return createTagNav(allTheTags)
}

const resetPage = () => {
  const elements = document.querySelectorAll("[data-reset]")
  elements.forEach(element => {
    element.remove()
  })
}

export { requestData, getPhotographers, getMedias, formatAlternativeText, sortByPopularity, sortByTitle, sortByDate, getElementById, createTagNav, createNavBar, resetPage }
