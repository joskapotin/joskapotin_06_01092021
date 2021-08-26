import { config } from "./config.js"
import { createTagNav, formatAlternativeText } from "./helpers.js"

/**
 * Take an object photographer from the APi and return html element ready to be inserted in the DOM
 * @param {object} photographer
 * @param {string} photographer.name
 * @param {string} photographer.id
 * @param {string} photographer.city
 * @param {string} photographer.country
 * @param {Array} photographer.tags
 * @param {string} photographer.tagline
 * @param {string} photographer.price
 * @param {string} photographer.portrait
 * @returns {string}
 */
const photographerFactory = ({ name, id, city, country, tags, tagline, price, portrait }) => {
  const uiPortrait = `<img class="card__img" src="${config.photographeThumbPath}/${portrait}" alt="" height="200" width="200">`
  const uiName = `<h2 class="card__name">${name}</h2>`
  const uiLocation = `<h3 class="card__location">${city}, ${country}</h3>`
  const uiTagline = `<p class="card__tagline">${tagline}</p>`
  const uiPrice = `<p class="card__pricing">${price}€/jour</p>`
  const uiTagNav = createTagNav(tags)
  const uiLink = `<a href="photographer/${id}" class="card-link">${uiPortrait}${uiName}${uiLocation}${uiTagline}${uiPrice}</a>`

  const uiCard = `<article class="card card-photographer" data-id="${id}" data-tag-filtrable>${uiLink}${uiTagNav}</article>`

  return uiCard
}

/**
 * Take an object media from the APi and return html element ready to be inserted in the DOM
 * @param {object} media
 * @param {string} media.id
 * @param {string} media.photographerId
 * @param {string} media.title
 * @param {string} media.image
 * @param {string} media.video
 * @param {Array} media.likes
 * @param {string} media.date
 * @param {string} media.price
 * @returns {string}
 */
const mediaFactory = ({ id, photographerId, title, image, video, likes, date, price }) => {
  const photographerMediaPath = `${config.mediasPath}/photographer-id-${photographerId}`
  const uiAlt = image ? formatAlternativeText(image) : formatAlternativeText(video)
  const ext = video?.substr(video.lastIndexOf(".") + 1)

  const uiThumbnail = image
    ? `<figure class="media__figure"><img class="media media-img" alt="${uiAlt}" data-src="${photographerMediaPath}/${image}" src="${photographerMediaPath}/${image}"></figure>`
    : `<figure class="media__figure media__figure-video"><video tabindex="-1" class="media media-video" data-src="${photographerMediaPath}/${image}"><source src="${photographerMediaPath}/${video}" type="video/${ext}"></video><figcaption class="visually-hidden">${uiAlt}</figcaption></figure>`

  const uiLink = `<a href="#media-${id}" class="media__link">${uiThumbnail}</a>`
  const uiTitle = `<h3 class="media__title">${title}</h3>`
  const uiDate = `<span class="media__date">${date}</span>`
  const uiPrice = `<span class="media__price">${price}€</span>`
  const uiLikes = `<span class="media__total-likes">${likes}<button class="btn-like">Like</button></span>`

  const uiMedia = `<article class="media__content" data-id="${id}" data-tag-filtrable>${uiLink}<footer class="media__footer">${uiTitle}${uiDate}${uiPrice}${uiLikes}</footer></article>`

  return uiMedia
}

export { photographerFactory, mediaFactory }
