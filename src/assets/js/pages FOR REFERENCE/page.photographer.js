import config from "../api/config.js"
import { resetPage, removeNode } from "../helpers/helpers.js"
import photographersResume from "../components/photographers/photographer.resume.js"
import { getMediasByPhotographer } from "../components/medias/media.service.js"
import sortNav from "../layout/sort-nav.js"
import mediasList from "../components/medias/media.list.js"
import Lightbox from "../modules/lightbox/lightbox.js"
import lightbox2 from "../modules/lightbox/lightbox2.js"

const showMedias = medias => {
  removeNode(document.getElementById("media-gallery"))
  config.uiMain.append(mediasList(medias))
  Lightbox.init()
  // lightbox2()
}

const initPhotographerPage = async photographerId => {
  resetPage()
  document.body.id = "page-photographer"

  config.uiHeader.appendChild(await photographersResume(photographerId))

  config.uiMain.append(sortNav(photographerId))

  showMedias(await getMediasByPhotographer(photographerId))
}

export { showMedias, initPhotographerPage }
