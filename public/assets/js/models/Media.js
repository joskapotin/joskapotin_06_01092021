import { getAllPhotographers } from "../database/services.js"

export default class {
  constructor({ id, photographerId, title, likes, date, price }) {
    this.id = id
    this.photographerId = photographerId
    this.title = title
    this.likes = likes
    this.date = date
    this.price = price
  }

  async gePhotographer() {
    const photographers = await getAllPhotographers()
    return photographers.find(element => element.id === parseInt(this.id))
  }
}
