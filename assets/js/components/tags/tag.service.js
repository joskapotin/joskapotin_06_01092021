import config from "../../api/config.js"

const getTags = async () => {
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

export default getTags
