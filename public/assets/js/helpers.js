import { apiUrl } from "./config.js"

// request function
const requestData = async () => {
  const response = await fetch(apiUrl)
  if (!response.ok) throw new Error(`Erreur HTTP ! statut : ${response.status}`)
  return await response.json()
}

const requestAllTheTag = async () => {
  const { media } = await requestData()
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

const getElementById = (array, id) => {
  return array.find(element => element.id === parseInt(id))
}

const wrapTag = element => {
  return `<li><a href="tag/${element}" class="tag-link" data-tag="${element}">#${element}</a></li>`
}

const createTagNav = array => {
  const tagNav = array.map(element => wrapTag(element)).join("")
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

export { requestData, getElementById, createTagNav, createNavBar, resetPage }
