import Controller from "./Controller.js"
import { getAllPhotographers, getAllTags } from "../database/services.js"
import Phototographer from "../models/Photographer.js"
import HomeView from "../views/Home.view.js"

export default class extends Controller {
  constructor(params) {
    super(params)
    this.params = params
  }

  async getPhotographersList() {
    const AllPhotographers = await getAllPhotographers()
    const photographers = this.params.tag ? AllPhotographers.filter(element => element.tags.find(element => element === this.params.tag)) : AllPhotographers
    return photographers.map(photographer => new Phototographer(photographer))
  }

  async render() {
    const allTheTags = await getAllTags()
    const currentTag = this.params?.tag
    const photographersList = await this.getPhotographersList()
    return new HomeView({ allTheTags, currentTag, photographersList })
  }
}
