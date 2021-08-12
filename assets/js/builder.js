import { getElementById, getMediasByPhotographer } from "./helpers.js"

// photographers factory
const photographersFactory = (id, firstname, lastname, city, country, tags, tagline, price, portrait) => {
  const medias = []
  const addMedia = element => {
    medias.push(element)
  }
  return { id, firstname, lastname, city, country, tags, tagline, price, portrait, medias, addMedia }
}

// medias factory
const mediasFactory = (id, photographerId, title, image, video, tags, likes, date, price) => {
  const photographer = []
  const addPhotographer = element => {
    photographer.push(element)
  }
  return { id, photographerId, title, image, video, tags, likes, date, price, photographer, addPhotographer }
}

// function initialisation photographers
const buildPhotographers = elements => {
  const photographersInitArray = []
  elements.forEach(element => {
    const { id, name, city, country, tags, tagline, price, portrait } = element
    const fullname = name.split(" ")
    const firstname = fullname[0]
    const lastname = fullname[1]
    const photographer = photographersFactory(id, firstname, lastname, city, country, tags, tagline, price, portrait)
    photographersInitArray.push(photographer)
  })
  return photographersInitArray
}

// function initialisation media
const buildMedias = elements => {
  const mediasInitArray = []
  elements.forEach(element => {
    const { id, photographerId, title, image, video, tags, likes, date, price } = element
    const media = mediasFactory(id, photographerId, title, image, video, tags, likes, date, price)
    mediasInitArray.push(media)
  })
  return mediasInitArray
}

// function expand photographers with medias
const expandPhotographers = (photographers, medias) => {
  photographers.forEach(photographer => {
    const media = getMediasByPhotographer(medias, photographer.id)
    media.forEach(element => {
      photographer.addMedia(element)
    })
  })
  return photographers
}

// function expand medias with photographer
const expandMedias = (photographers, medias) => {
  medias.forEach(media => {
    const photographer = getElementById(photographers, media.photographerId)
    media.addPhotographer(photographer.firstname)
    media.addPhotographer(photographer.lastname)
  })
  return medias
}

// function create photographers
const buildData = elements => {
  // init
  const photographersInit = buildPhotographers(elements.photographers)
  const mediasInit = buildMedias(elements.media)

  // add medias photographers and photographers to media
  const photographers = expandPhotographers(photographersInit, mediasInit)
  const medias = expandMedias(photographersInit, mediasInit)
  return { photographers, medias }
}

export default buildData
