import Media from "./Media.js"

export default class extends Media {
  constructor({ id, photographerId, title, image, likes, date, price }) {
    super({ id, photographerId, title, likes, date, price })
    this.media = image
    this.type = "image"
  }
}
