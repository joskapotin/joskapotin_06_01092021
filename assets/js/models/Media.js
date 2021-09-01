import { getPhotographersById } from "../database/database.js"

export default class {
  constructor({ id, photographerId, title, image, video, likes, date, price }) {
    this.id = id
    this.photographerId = photographerId
    this.title = title
    this.image = image
    this.video = video
    this.likes = likes
    this.date = date
    this.price = price
  }

  async gePhotographer() {
    return await getPhotographersById(this.photographerId)
  }
}
