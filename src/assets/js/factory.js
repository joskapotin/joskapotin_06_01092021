// photographers factory
const photographersFactory = (id, name, city, country, tags, tagline, price, portrait) => {
  return { id, name, city, country, tags, tagline, price, portrait }
}

// medias factory
const mediasFactory = (id, photographerId, title, image, video, tags, likes, date, price) => {
  const addLike = () => likes++
  return { id, photographerId, title, image, video, tags, likes, date, price, addLike }
}

// photographers builder
const buildPhotographers = elements => {
  const photographers = []
  elements.forEach(element => {
    const { id, name, city, country, tags, tagline, price, portrait } = element
    const photographer = photographersFactory(id, name, city, country, tags, tagline, price, portrait)
    photographers.push(photographer)
  })
  return photographers
}

// function initialisation media
const buildMedias = elements => {
  const medias = []
  elements.forEach(element => {
    const { id, photographerId, title, image, video, tags, likes, date, price } = element
    const media = mediasFactory(id, photographerId, title, image, video, tags, likes, date, price)
    medias.push(media)
  })
  return medias
}

export { buildPhotographers, buildMedias }
