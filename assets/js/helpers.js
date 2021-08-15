import { mediasPath, photographeThumbPath, uiMain } from "./options.js"

// request function
const requestData = async apiUrl => {
  const response = await fetch(apiUrl)
  if (!response.ok) {
    throw new Error(`Erreur HTTP ! statut : ${response.status}`)
  }
  return response.json()
}

const requestAllTheTag = async apiUrl => {
  const { media } = await requestData(apiUrl)
  const tagArray = []
  media.forEach(element => {
    element.tags.forEach(item => {
      // Create an array of all the tags without duplicate
      if (!tagArray.includes(item)) {
        tagArray.push(item)
      }
    })
  })
  return tagArray
}

const requestElementsByTag = async (apiUrl, elementName, tag, photographerId) => {
  const { photographers } = await requestData(apiUrl)
  if (elementName.match("photographers")) {
    return photographers.filter(element => element.tags.find(element => element === tag))
  } else if (elementName.match("medias")) {
    const medias = await requestMediasByPhotographer(apiUrl, photographerId)
    return medias.filter(element => element.tags.find(element => element === tag))
  }
}

const requestMediasByPhotographer = async (apiUrl, id) => {
  const { media } = await requestData(apiUrl)
  const medias = media.filter(element => element.photographerId === parseInt(id))
  return medias
}

const getElementById = (array, id) => {
  return array.find(element => element.id === parseInt(id))
}

const wrapTag = element => {
  return `<li><a href="#tag-${element}" class="tag-link" data-tag="${element}">#${element}</a></li>`
}

const createTagNav = array => {
  const tagNav = array.map(element => wrapTag(element)).join("")
  return `<nav class="tag-nav" data-reset><ul class="tag-list">${tagNav}</ul></nav>`
}

const uiCreateNavBar = async apiUrl => {
  const allTheTags = await requestAllTheTag(apiUrl)
  return createTagNav(allTheTags)
}

const uiCreatePhotographersCard = photographers => {
  const uiPhotographers = []
  photographers.forEach(photographe => {
    const { id, name, city, country, tags, tagline, price, portrait } = photographe
    const thumbnail = `${photographeThumbPath}/${portrait}`
    const tagNav = createTagNav(tags)

    const uiCard = `<article class="card card-photographer" data-id="${id}" data-tag-filtrable><a href="#photographer-id-${id}" class="card-link"><img class="card__img" src="${thumbnail}" height="200" width="200"><h2 class="card__name">${name}</h2><h3 class="card__location">${city}, ${country}</h3><p class="card__tagline">${tagline}</p><p class="card__pricing">${price}€/jour</p></a>${tagNav}</article>`
    uiPhotographers.push(uiCard)
  })
  return uiPhotographers.join("")
}

const uiInsertPhotographersCard = photographers => {
  const uiPhotographers = uiCreatePhotographersCard(photographers)
  const placeHolder = uiMain.querySelector(".section-photographers")
  placeHolder.insertAdjacentHTML("beforeend", uiPhotographers)
}

const uiCreateGallery = (medias, photographerId) => {
  const uiGallery = []
  medias.forEach(media => {
    const { id, title, image, video, likes, date, price } = media
    const photographerMediaPath = `${mediasPath}/photographer-id-${photographerId}`
    let thumbnail = `<img class="media media-img" data-src="${photographerMediaPath}/${image}" src="${photographerMediaPath}/${image}">`

    if (video) {
      const ext = video.substr(video.lastIndexOf(".") + 1)
      thumbnail = `<video class="media media-video" data-src="${photographerMediaPath}/${image}"><source src="${photographerMediaPath}/${video}" type="video/${ext}"></video>`
    }

    // Each media get an unique id and data-id from the photographer id
    const uiMedia = `<article class="media__content" data-id="${id}" data-tag-filtrable><a href="#media-id-${id}" class="media__link"><figure class="media__figure">${thumbnail}</figure></a><footer class="media__footer"><h3 class="media__title">${title}</h3><span class="media__date">${date}</span><span class="media__price">${price}€</span><span class="media__total-likes">${likes}<button class="btn-like">Like</button></span></footer></article>`
    uiGallery.push(uiMedia)
  })
  return uiGallery.join("")
}

const uiInsertGallery = (medias, photographerId) => {
  const uiGallery = uiCreateGallery(medias, photographerId)
  const placeHolder = uiMain.querySelector("#media-gallery")
  placeHolder.insertAdjacentHTML("beforeend", uiGallery)
}

const uiShowElementsbyTag = async ({ apiUrl, type, tag, photographerId }) => {
  // first hide everyone
  document.querySelectorAll("[data-tag-filtrable]").forEach(element => element.remove())

  // we query the api maybe there is more than the one we are seeing currently on the page
  const elements = await requestElementsByTag(apiUrl, type, tag, photographerId)

  if (type === "photographers") {
    return uiInsertPhotographersCard(elements)
  } else if (type === "medias") {
    return uiInsertGallery(elements, photographerId)
  }
}

const initTagNav = filter => {
  // This function is used for both photographer and media so the parameter type can be or photographers or medias
  document.addEventListener("click", event => {
    if (event.target.matches("[data-tag]")) {
      filter.tag = event.target.dataset.tag
      filter.photographerId = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.dataset.id
      uiShowElementsbyTag(filter)
    }
  })
}

const resetPage = () => {
  const elements = document.querySelectorAll("[data-reset]")
  elements.forEach(element => {
    element.remove()
  })
}

export { requestData, uiCreateNavBar, uiInsertPhotographersCard, uiInsertGallery, requestMediasByPhotographer, getElementById, createTagNav, initTagNav, resetPage }
