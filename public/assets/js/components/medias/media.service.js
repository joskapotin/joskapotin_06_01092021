import config from "../../config/config.js"

const getMedias = async () => {
  try {
    const response = await fetch(config.apiUrl)
    const { media } = await response.json()
    return media
  } catch (error) {
    return error
  }
}

const getMediasByPhotographer = async id => {
  const AllMedias = await getMedias()
  const medias = AllMedias.filter(element => element.photographerId === parseInt(id))
  return medias
}

const getMediasByPhotographerAndTag = async ({ id, tag }) => {
  const medias = await getMediasByPhotographer(id)
  return medias.filter(element => element.tags.find(element => element === tag))
}

export { getMedias, getMediasByPhotographer, getMediasByPhotographerAndTag }
