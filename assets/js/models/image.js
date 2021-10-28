import Media from './Media.js'

export default class extends Media {
  constructor ({ id, photographerId, title, image, likes, date, price, tags, alt }) {
    super({ id, photographerId, title, likes, date, price, tags, alt })
    this.media = image
    this.type = 'image'
  }
}
