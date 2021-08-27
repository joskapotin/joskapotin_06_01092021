import config from "../api/config.js"
import { resetPage } from "../helpers/helpers.js"
import photographersResume from "../components/photographers/photographer.resume.js"
import { mediasList } from "../components/medias/media.list.js"
import { getMediasByPhotographer, getMediasByPhotographerAndTag } from "../components/medias/media.service.js"
import { uiSortNav } from "../layout/sort-nav.js"

const showMedias = medias => {
  document.getElementById("media-gallery").remove()
  config.uiMain.appendChild(mediasList(medias))
}

const showMediasByTag = async params => {
  document.getElementById("media-gallery").remove()
  const medias = await getMediasByPhotographerAndTag(params)
  config.uiMain.appendChild(mediasList(medias))
}

const initPhotographerPage = async photographerId => {
  resetPage()
  document.body.id = "page-photographer"
  config.uiHeader.appendChild(await photographersResume(photographerId))

  config.uiMain.append(uiSortNav(photographerId))

  const medias = await getMediasByPhotographer(photographerId)
  config.uiMain.append(mediasList(medias))
}

export { showMedias, showMediasByTag, initPhotographerPage }
