import config from "../../api/config.js"
import { getPhotographersById } from "./photographer.service.js"
import { tagList } from "../tags/tag.list.js"
import { showMedias } from "../../pages/page.photographer.js"
import { getMediasByPhotographer, getMediasByPhotographerAndTag } from "../medias/media.service.js"

const countTotalLikes = async photographerId => {
  const medias = await getMediasByPhotographer(photographerId)
  const totalLikes = medias.reduce((accumulateur, media) => accumulateur + media.likes, 0)
  return totalLikes
}

const photographerResume = async photographerId => {
  const { name, id, city, country, tags, tagline, price, portrait } = await getPhotographersById(photographerId)

  const uiSection = document.createElement("section")
  uiSection.id = "photographer-section"
  uiSection.className = "photographer-section"
  uiSection.dataset.id = id
  uiSection.dataset.reset = ""

  const uiArticle = document.createElement("article")
  uiArticle.className = "photographer__resume"

  const uiName = document.createElement("h1")
  uiName.className = "photographer__name"
  uiName.textContent = name

  const uiLocation = document.createElement("h2")
  uiLocation.className = "photographer__location"
  uiLocation.textContent = `${city}, ${country}`

  const uiTagline = document.createElement("p")
  uiTagline.className = "photographer__tagline"
  uiTagline.textContent = tagline

  const uiTagNav = tagList(tags)
  const uiTagLink = uiTagNav.querySelectorAll(".tag-link")
  uiTagLink.forEach(uiTagLink => {
    uiTagLink.addEventListener("click", async event => {
      event.preventDefault()
      const tag = event.target.dataset.tag
      const params = { id: id, tag: tag }
      const medias = await getMediasByPhotographerAndTag(params)
      showMedias(medias)
    })
  })

  const uiContactBtn = document.createElement("button")
  uiContactBtn.classList = "btn photographer__btn-contact"
  uiContactBtn.textContent = "Contactez-moi"

  const uiPicture = document.createElement("picture")
  uiPicture.className = "photographer__picture"

  const uiImage = document.createElement("img")
  uiImage.src = `${config.photographeThumbPath}/${portrait}`
  uiImage.alt = ""
  uiImage.className = "photographer__img"

  const uiAside = document.createElement("aside")
  uiAside.className = "photographer__aside"

  const uiLikes = document.createElement("span")
  uiLikes.className = "photographer__likes"
  uiLikes.textContent = await countTotalLikes(photographerId)

  const uiPricing = document.createElement("span")
  uiPricing.className = "photographer__pricing"
  uiPricing.textContent = `${price}€/jour`

  uiArticle.append(uiName, uiLocation, uiTagline, uiTagNav)
  uiPicture.append(uiImage)
  uiAside.append(uiLikes, uiPricing)
  uiSection.append(uiArticle, uiContactBtn, uiPicture, uiAside)

  return uiSection
}

export default photographerResume
