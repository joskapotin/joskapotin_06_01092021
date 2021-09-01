import config from "../config/config.js"

const getAllPhotographers = async () => {
  try {
    const response = await fetch(config.apiUrl)
    const { photographers } = await response.json()
    return photographers
  } catch (error) {
    return error
  }
}

const getAllMedias = async () => {
  try {
    const response = await fetch(config.apiUrl)
    const { media } = await response.json()
    return media
  } catch (error) {
    return error
  }
}

const getAllTags = async () => {
  try {
    const response = await fetch(config.apiUrl)
    const { media } = await response.json()
    const allTheTagsDup = media.map(media => {
      return media.tags.join()
    })
    return [...new Set(allTheTagsDup.sort())]
  } catch (error) {
    return error
  }
}

const getPhotographersById = async ({ id }) => {
  const photographers = await getAllPhotographers()
  return photographers.find(element => element.id === parseInt(id))
}

const getPhotographersByTag = async ({ tag }) => {
  const photographers = await getAllPhotographers()
  return photographers.filter(element => element.tags.find(element => element === tag))
}

const getMediasByPhotographer = async ({ id }) => {
  const AllMedias = await getAllMedias()
  const medias = AllMedias.filter(element => element.photographerId === parseInt(id))
  return medias
}

export { getAllPhotographers, getAllTags, getPhotographersById, getPhotographersByTag, getMediasByPhotographer }
