import config from "../../api/config.js"
import { getPhotographersById } from "./photographer.service.js"
import { getMediasByPhotographer } from "../medias/media.service.js"
import { createLikeIcon } from "../likes/like.service.js"
import tagNav from "../tags/tag.nav.js"
import ContactForm from "../contact/contact.form.js"

const countTotalLikes = async photographerId => {
  const medias = await getMediasByPhotographer(photographerId)
  const totalLikes = medias.reduce((accumulateur, media) => accumulateur + media.likes, 0)
  return totalLikes
}

const photographerResume = async ({ photographerId, currentTag }) => {
  const { name, id, city, country, tags, tagline, price, portrait } = await getPhotographersById(photographerId)

  const uiHeader = document.createElement("header")
  uiHeader.classList.add("site-header", "photographer__header")

  const uiPicture = document.createElement("picture")
  uiPicture.className = "photographer__picture"

  const uiImage = document.createElement("img")
  uiImage.src = `${config.photographeThumbPath}/${portrait}`
  uiImage.alt = ""
  uiImage.className = "photographer__img"

  const uiName = document.createElement("h1")
  uiName.className = "photographer__name"
  uiName.textContent = name

  const uiLocation = document.createElement("h2")
  uiLocation.className = "photographer__location"
  uiLocation.textContent = `${city}, ${country}`

  const uiTagline = document.createElement("p")
  uiTagline.className = "photographer__tagline"
  uiTagline.textContent = tagline

  const tagPrefix = `/photographer/${id}`
  const uiTagNav = await tagNav({ tags, currentTag, tagPrefix })
  uiTagNav.ariaLabel = "Primary"

  const uiContactBtn = document.createElement("button")
  uiContactBtn.classList = "btn photographer__btn-contact"
  uiContactBtn.textContent = "Contactez-moi"
  uiContactBtn.addEventListener("click", e => {
    e.preventDefault()
    ContactForm.init(name)
  })

  const uiAside = document.createElement("aside")
  uiAside.className = "photographer__aside"

  const uiLikes = document.createElement("span")
  uiLikes.className = "photographer__likes"
  uiLikes.textContent = await countTotalLikes(photographerId)
  const uiLikeIcon = createLikeIcon()

  const uiPricing = document.createElement("span")
  uiPricing.className = "photographer__pricing"
  uiPricing.textContent = `${price}€/jour`

  uiPicture.appendChild(uiImage)
  uiLikes.appendChild(uiLikeIcon)
  uiHeader.append(uiPicture, uiName, uiContactBtn, uiLocation, uiTagline, uiTagNav)
  uiAside.append(uiLikes, uiPricing)

  return { uiHeader, uiAside }
}

export default photographerResume
