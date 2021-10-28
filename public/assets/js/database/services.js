import config from '../config/config.js'

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

export { getAllPhotographers, getAllMedias, getAllTags }
