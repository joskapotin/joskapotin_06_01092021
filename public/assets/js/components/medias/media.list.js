import mediaCard from "./media.card.js"

const mediasList = medias => {
  const list = document.createElement("section")
  list.id = "media-gallery"
  list.className = "media-gallery"
  list.dataset.reset = "true"

  for (const media of medias) {
    list.append(mediaCard(media))
  }

  return list
}

export { mediasList }
