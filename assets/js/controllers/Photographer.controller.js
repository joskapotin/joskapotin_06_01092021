import Controller from "./controller.js"
import { getPhotographersById } from "../database/database.js"
import Photographer from "../models/Photographer.js"
import Media from "../models/Media.js"
import PhotographerView from "../views/Photographer.view.js"

export default class extends Controller {
  constructor(params) {
    super(params)
    this.params = params
  }

  async getPhotographer() {
    return new Photographer(await getPhotographersById({ id: this.params.id }))
  }

  async getMediasList() {
    this.photographer = await this.getPhotographer()

    if (this.params.tag) {
      const allMedias = await this.photographer.getMedias()
      this.medias = await allMedias.filter(element => element.tags.find(element => element === this.params.tag))
    } else {
      this.medias = await this.photographer.getMedias()
    }

    return this.medias.map(media => new Media(media))
  }

  async getHtml() {
    const photographer = await this.getPhotographer()
    const currentTag = this.params.tag
    const mediasList = await this.getMediasList()

    return new PhotographerView({ photographer, mediasList, currentTag })
  }

  async sortMediasByPopularity() {
    const unsortedMedias = await this.photographer.getMedias()
    return unsortedMedias.sort((a, b) => b.likes - a.likes)
  }

  async sortMediasByDate() {
    const unsortedMedias = await this.photographer.getMedias()
    return unsortedMedias.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  }

  async sortMediasByTitle() {
    const unsortedMedias = await this.photographer.getMedias()
    return unsortedMedias.sort((a, b) => a.title.localeCompare(b.title))
  }
}
