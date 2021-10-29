import config from "../../config/config.js"
import tagNavComponent from "./tag.nav.component.js"
import likeIconComponent from "./like.icon.component.js"

/**
 * create photographer resume
 * @param {{photographer:object,totalLikes:string,currentTag:string}}
 * @returns {HTMLElement} uiPhotographerResume
 */
const photographerResumeComponent = ({ photographer, totalLikes, currentTag }) => {
  const { name, id, city, country, tags, tagline, price, portrait } = photographer

  const uiPhotographerResume = document.createElement("section")
  uiPhotographerResume.classList.add("photographer__resume")

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
  const uiTagNav = tagNavComponent({ tags, currentTag, tagPrefix })
  uiTagNav.classList.add("tag-nav-media")
  uiTagNav.ariaLabel = "Primary"

  const uiContactBtn = document.createElement("button")
  uiContactBtn.id = "contact-form-btn"
  uiContactBtn.classList = "btn photographer__btn-contact"
  uiContactBtn.textContent = "Contactez-moi"

  const uiAside = document.createElement("aside")
  uiAside.className = "photographer__aside"

  const uiLikes = document.createElement("span")
  uiLikes.className = "photographer__likes"
  const uiLikesNbr = document.createElement("span")
  uiLikesNbr.classList.add("photographer__likes-number")
  uiLikesNbr.textContent = totalLikes
  const uiLikeIcon = likeIconComponent()

  const uiPricing = document.createElement("span")
  uiPricing.className = "photographer__pricing"
  uiPricing.textContent = `${price}€/jour`

  uiPicture.appendChild(uiImage)
  uiLikes.append(uiLikesNbr, uiLikeIcon)
  uiAside.append(uiLikes, uiPricing)
  uiPhotographerResume.append(uiPicture, uiName, uiContactBtn, uiLocation, uiTagline, uiTagNav, uiAside)

  return uiPhotographerResume
}

export default photographerResumeComponent
