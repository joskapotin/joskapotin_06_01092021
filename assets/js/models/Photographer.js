import { getMediasByPhotographer } from "../database/database.js"

export default class {
  constructor({ name, id, city, country, tags, tagline, price, portrait }) {
    this.name = name
    this.id = id
    this.city = city
    this.country = country
    this.tags = tags
    this.tagline = tagline
    this.price = price
    this.portrait = portrait
  }

  async getMedias() {
    return await getMediasByPhotographer({ id: this.id })
  }

  async getLikes() {
    const medias = await this.getMedias()
    return medias.reduce((accumulateur, media) => accumulateur + media.likes, 0)
  }
}
