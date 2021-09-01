import { getMediasByPhotographer } from "../database/database"

export default class {
  constructor({ photographer }) {
    this.photographer = photographer
  }

  getName() {
    return this.photographer.name
  }

  getId() {
    return this.photographer.id
  }

  getCity() {
    return this.photographer.city
  }

  getCountry() {
    return this.photographer.country
  }

  getTags() {
    return this.photographer.tags
  }

  getTagline() {
    return this.photographer.tagline
  }

  getPrice() {
    return this.photographer.price
  }

  getPortrait() {
    return this.photographer.portrait
  }

  async geMedias() {
    return await getMediasByPhotographer(this.photographer.id)
  }

  async getLikes() {
    const medias = await this.photographer.geMedias(this.photographer.id)
    return medias.reduce((accumulateur, media) => accumulateur + media.likes, 0)
  }
}
