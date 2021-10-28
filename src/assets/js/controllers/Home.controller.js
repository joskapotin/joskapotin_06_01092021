import Controller from "./Controller.js"
import { getAllPhotographers, getAllTags } from "../database/services.js"
import Phototographer from "../models/Photographer.js"
import HomeView from "../views/Home.view.js"

/**
 * @class
 * @classdesc home page controller. Return home view with params
 * @param {object} params
 * @param {string} params[tag]
 * @extends Controller
 * @returns {object} HomeView
 */
export default class extends Controller {
  constructor(params) {
    super(params)
    this.params = params
  }

  /**
   * Return a list of photographers
   * @returns {object[]} a list of photographer
   */
  async getPhotographersList() {
    const AllPhotographers = await getAllPhotographers()
    // return all photographers or the coreesponding ones
    const photographers = this.params.tag ? AllPhotographers.filter(element => element.tags.find(element => element === this.params.tag)) : AllPhotographers
    return photographers.map(photographer => new Phototographer(photographer))
  }

  /**
   * return a view
   * @returns {object} Homeview
   */
  async render() {
    const allTheTags = await getAllTags()
    const currentTag = this.params?.tag
    const photographersList = await this.getPhotographersList()
    return new HomeView({ allTheTags, currentTag, photographersList })
  }
}
