import config from "../config/config.js"

const getPhotographers = async () => {
  try {
    const response = await fetch(config.apiUrl)
    const { photographers } = await response.json()
    return photographers
  } catch (error) {
    return error
  }
}

const getMedias = async () => {
  try {
    const response = await fetch(config.apiUrl)
    const { media } = await response.json()
    return media
  } catch (error) {
    return error
  }
}

const getPhotographersById = async ({ id }) => {
  const photographers = await getPhotographers()
  return photographers.find(element => element.id === parseInt(id))
}

const getPhotographerByTag = async ({ tag }) => {
  const photographers = await getPhotographers()
  return photographers.filter(element => element.tags.find(element => element === tag))
}

const getMediasByPhotographer = async ({ id }) => {
  const AllMedias = await getMedias()
  const medias = AllMedias.filter(element => element.photographerId === parseInt(id))
  return medias
}

const getMediasByPhotographerAndTag = async ({ id, tag }) => {
  const medias = await getMediasByPhotographer(id)
  return medias.filter(element => element.tags.find(element => element === tag))
}

export { getPhotographers, getMedias, getPhotographersById, getPhotographerByTag, getMediasByPhotographer, getMediasByPhotographerAndTag }
