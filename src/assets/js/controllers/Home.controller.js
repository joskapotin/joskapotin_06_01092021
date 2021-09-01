import Controller from "./Controller.js"
import { getAllPhotographers, getAllTags, getPhotographersByTag } from "../database/database.js"
import Phototographer from "../models/Photographer.js"
import HomeView from "../views/Home.view.js"

export default class extends Controller {
  constructor(params) {
    super(params)
    this.params = params
  }

  async getPhotographersList() {
    const photographers = this.params.tag ? await getPhotographersByTag({ tag: this.params.tag }) : await getAllPhotographers()
    return photographers.map(photographer => new Phototographer(photographer))
  }

  async getHtml() {
    const allTheTags = await getAllTags()
    const currentTag = this.params.tag
    const photographersList = await this.getPhotographersList()
    return new HomeView({ allTheTags, currentTag, photographersList })
  }
}
