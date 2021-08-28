import { getPhotographers } from "./photographer.service.js"
import photographerCard from "./photographer.card.js"

const AllPhotographersList = async () => {
  const photographers = await getPhotographers()

  const list = document.createElement("section")
  list.id = "photographers-list"
  list.className = "section-photographers"
  list.dataset.reset = "true"

  // for (const photographer of photographers) {
  //   list.append(photographerCard(photographer))
  // }

  photographers.forEach(photographer => {
    list.append(photographerCard(photographer))
  })

  return list
}

const photographersList = photographers => {
  const list = document.createElement("section")
  list.id = "photographers-list"
  list.className = "section-photographers"
  list.dataset.reset = "true"

  for (const photographer of photographers) {
    list.append(photographerCard(photographer))
  }

  return list
}

export { AllPhotographersList, photographersList }
