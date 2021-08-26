import { config } from "./config.js"

/**
 * @async
 * @function fetch the json file provided
 * @returns {Promise<Array>} 2 arrays of objects representing photographers and medias
 */
const requestData = async () => {
  try {
    const response = await fetch(config.apiUrl)
    const data = await response.json()
    return data
  } catch (err) {
    console.error(err)
  }
}

/**
 * Get all the photographers
 * @async
 * @returns {Promise<Array>} an array of objects representing photographers
 */
const getPhotographers = async () => {
  const { photographers } = await requestData()
  return photographers
}

/**
 * Get all the medias
 * @async
 * @returns {Promise<Array>} an array of objects representing medias
 */
const getMedias = async () => {
  const { media } = await requestData()
  return media
}

/**
 * Get all the tags from array objects medias
 * @async
 * @returns {Promise<Array>} an array of tags without duplicate
 */
const requestAllTheTag = async () => {
  const medias = await getMedias()
  const allTheTagsDup = medias.map(media => {
    return media.tags.join()
  })
  return [...new Set(allTheTagsDup)]
}

/**
 * Use to create alternative text for images from there pathname
 * Remove the last 4 characters and replace "_" with " "
 * @param {string} text
 * @returns {string}
 */
const formatAlternativeText = text => {
  return text.slice(0, -4).replaceAll("_", " ")
}

/**
 * Sort an array of object using prop likes in descending order
 * @param {Array} elements
 * @returns {Array}
 */
const sortByPopularity = elements => {
  return elements.sort((a, b) => b.likes - a.likes)
}

/**
 * Sort an array of object using prop title in descending order
 * @param {Array} elements
 * @returns {Array}
 */
const sortByTitle = elements => {
  return elements.sort((a, b) => a.title.localeCompare(b.title))
}

/**
 * Sort an array of object using prop date in descending order
 * @param {Array} elements
 * @returns {Array}
 */
const sortByDate = elements => {
  return elements.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
}

/**
 * Get object from an array using prop "id"
 * @param {Array} array
 * @param {string} id
 * @returns {Array}
 */
const getElementById = (array, id) => {
  return array.find(element => element.id === parseInt(id))
}

/**
 * Create a sorted tag navigation markup from an array of tags.
 * ready to be inserted in the DOM
 * @param {Array} array
 * @returns {string} html content
 */
const createTagNav = array => {
  const tagNav = array
    .sort()
    .map(element => {
      return `<li><a href="#tag-${element}" class="tag-link" data-tag="${element}">#${element}</a></li>`
    })
    .join("")
  return `<nav class="tag-nav" data-reset><ul class="tag-list">${tagNav}</ul></nav>`
}

/**
 * Request all the tag and create the main nav bar
 * @async
 * @returns {Promise<string>} the main navbar markup
 */
const createNavBar = async () => {
  return createTagNav(await requestAllTheTag())
}

/**
 * Remove all the DOM elements with th attribut "data-reset"
 */
const resetPage = () => {
  const elements = document.querySelectorAll("[data-reset]")
  elements.forEach(element => {
    element.remove()
  })
}

export { requestData, getPhotographers, getMedias, formatAlternativeText, sortByPopularity, sortByTitle, sortByDate, getElementById, createTagNav, createNavBar, resetPage }
