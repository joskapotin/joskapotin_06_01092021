import { getPhotographers, getPhotographerByTag } from "./photographer.service.js"
import photographerCard from "./photographer.card.js"

const photographersList = async ({ tag, currentTag }) => {
  const photographers = tag ? await getPhotographerByTag(tag) : await getPhotographers()
  const list = document.createElement("section")
  list.id = "photographers-list"
  list.className = "section-photographers"
  list.dataset.reset = "true"

  for (const photographer of photographers) {
    list.append(await photographerCard({ photographer, currentTag }))
  }

  return list
}

export default photographersList
