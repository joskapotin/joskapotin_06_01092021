import { getAllPhotographers } from '../database/services.js'

export default class {
  constructor ({ id, photographerId, title, likes, date, price, tags, alt }) {
    this.id = id
    this.photographerId = photographerId
    this.title = title
    this.likes = likes
    this.date = date
    this.price = price
    this.tags = tags
    this.alt = alt
  }

  async gePhotographer () {
    const photographers = await getAllPhotographers()
    return photographers.find(element => element.id === parseInt(this.id))
  }
}
