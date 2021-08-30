import { getMediasByPhotographer, getMediasByPhotographerAndTag } from "./media.service.js"
import mediaCard from "./media.card.js"

const mediasList = async ({ id, tag }) => {
  const medias = tag ? await getMediasByPhotographerAndTag({ id, tag }) : await getMediasByPhotographer(id)
  const list = document.createElement("section")
  list.id = "media-gallery"
  list.className = "media-gallery"

  for (const media of medias) {
    list.append(mediaCard(media))
  }

  return list
}

export default mediasList
