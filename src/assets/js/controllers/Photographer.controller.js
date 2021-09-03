import Controller from "./Controller.js"
import { getAllPhotographers } from "../database/services.js"
import Photographer from "../models/Photographer.js"
import mediaFactory from "../utils/factory.js"
import PhotographerView from "../views/Photographer.view.js"

export default class extends Controller {
  constructor(params) {
    super(params)
    this.params = params
  }

  async getPhotographer() {
    const AllPhotographers = await getAllPhotographers()
    const photographer = AllPhotographers.find(element => element.id === parseInt(this.params.id))
    return new Photographer(photographer)
  }

  async getMediasList() {
    this.photographer = await this.getPhotographer()

    if (this.params.tag) {
      const allMedias = await this.photographer.getMedias()
      this.medias = await allMedias.filter(element => element.tags.find(element => element === this.params.tag))
    } else {
      this.medias = await this.photographer.getMedias()
    }

    return this.medias.map(media => mediaFactory(media))
  }

  sortMediasByPopularity(medias) {
    return medias.sort((a, b) => b.likes - a.likes)
  }

  async render() {
    const photographer = await this.getPhotographer()
    const currentTag = this.params.tag
    const mediasList = this.sortMediasByPopularity(await this.getMediasList())

    return new PhotographerView({ photographer, mediasList, currentTag })
  }
}
