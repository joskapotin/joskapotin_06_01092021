import Controller from "./Controller.js"
import { getAllPhotographers } from "../database/services.js"
import Photographer from "../models/Photographer.js"
import Image from "../models/image.js"
import Video from "../models/Video.js"
import PhotographerView from "../views/Photographer.view.js"

/**
 * @class
 * @classdesc photographer page controller. Return photographer view with params
 * @param {object} params
 * @param {string} params[id][tag]
 * @extends Controller
 * @returns {object} PhotographerView
 */
export default class extends Controller {
  constructor(params) {
    super(params)
    this.params = params
  }

  /**
   * find a photographer from his id
   * @params params[id]
   * @returns {object} Photographer
   */
  async getPhotographer() {
    const AllPhotographers = await getAllPhotographers()
    const photographer = AllPhotographers.find(element => element.id === parseInt(this.params.id))
    return new Photographer(photographer)
  }

  /**
   * find the media with the photographer idand the tag
   * @params params[id][tag]
   * @returns {object[]} medias list
   */
  async getMediasList() {
    this.photographer = await this.getPhotographer()

    if (this.params.tag) {
      const allMedias = await this.photographer.getMedias()
      this.medias = await allMedias.filter(element => element.tags.find(element => element === this.params.tag))
    } else {
      this.medias = await this.photographer.getMedias()
    }

    return this.medias.map(media => {
      return media.image ? new Image(media) : new Video(media)
    })
  }

  sortMediasByPopularity(medias) {
    return medias.sort((a, b) => b.likes - a.likes)
  }

  sortMediasByDate(medias) {
    return medias.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  }

  sortMediasByTitle(medias) {
    return medias.sort((a, b) => a.title.localeCompare(b.title))
  }

  /**
   * return a view
   * @returns {object} PhotographerView
   */
  async render() {
    const photographer = await this.getPhotographer()
    const totalLikes = await photographer.getLikes()
    const currentTag = this.params.tag
    const sortBy = this.params.sortBy
    let mediasList = []

    if (sortBy === "DATE") {
      mediasList = this.sortMediasByDate(await this.getMediasList())
    } else if (sortBy === "TITLE") {
      mediasList = this.sortMediasByTitle(await this.getMediasList())
    } else if (!sortBy || sortBy === "POPULARITY") {
      mediasList = this.sortMediasByPopularity(await this.getMediasList())
    }

    return new PhotographerView({ photographer, totalLikes, mediasList, currentTag, sortBy })
  }
}
