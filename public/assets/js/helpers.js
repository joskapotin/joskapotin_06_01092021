// request function
const requestData = async apiUrl => {
  const response = await fetch(apiUrl)
  if (!response.ok) throw new Error(`Erreur HTTP ! statut : ${response.status}`)
  return await response.json()
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

const requestMediasByPhotographer = async (apiUrl, id) => {
  const { media } = await requestData(apiUrl)
  const medias = media.filter(element => element.photographerId === parseInt(id))
  return medias
}

const sortByPopularity = elements => {
  return elements.sort((a, b) => b.likes - a.likes)
}

const sortByTitle = elements => {
  return elements.sort((a, b) => a.title.localeCompare(b.title))
}

const sortMedias = async (unsortedMedias, sortedBy) => {
  if (sortedBy === "Likes") {
    return sortByPopularity(unsortedMedias)
  } else if (sortedBy === "Title") {
    return sortByTitle(unsortedMedias)
  }
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

const resetPage = () => {
  const elements = document.querySelectorAll("[data-reset]")
  elements.forEach(element => {
    element.remove()
  })
}

export { requestData, requestMediasByPhotographer, sortMedias, getElementById, createTagNav, createNavBar, resetPage }
