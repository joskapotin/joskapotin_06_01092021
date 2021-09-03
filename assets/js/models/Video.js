import Media from "./Media.js"

export default class extends Media {
  constructor({ id, photographerId, title, video, likes, date, price }) {
    super({ id, photographerId, title, likes, date, price })
    this.media = video
    this.type = "video"
  }
}
