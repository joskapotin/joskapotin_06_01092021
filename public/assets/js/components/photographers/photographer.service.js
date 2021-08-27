import config from "../../api/config.js"

const getPhotographers = async () => {
  try {
    const response = await fetch(config.apiUrl)
    const { photographers } = await response.json()
    return photographers
  } catch (error) {
    return error
  }
}

const getPhotographersById = async id => {
  const photographers = await getPhotographers()
  return photographers.find(element => element.id === parseInt(id))
}

const getPhotographerByTag = async tag => {
  const photographers = await getPhotographers()
  return photographers.filter(element => element.tags.find(element => element === tag))
}

export { getPhotographers, getPhotographersById, getPhotographerByTag }
