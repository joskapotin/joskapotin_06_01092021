import Abstract from "./Abstract.view.js"
import photographerResumeComponent from "./components/photographer.resume.component.js"
import mediaSortComponent from "./components/media.sort.component.js"
import mediaCardComponent from "./components/media.card.component.js"
import Lightbox from "../modules/lightbox/lightbox.js"

export default class extends Abstract {
  constructor({ photographer, mediasList, currentTag }) {
    super()
    this.setTitle(`FishEye - ${photographer.name}`)
    if (currentTag) {
      this.setTitle(`FishEye - ${photographer.name} - ${currentTag}`)
    }
    this.setPageClass("page-photographer")
    this.builHeader({ photographer, currentTag })
    this.buildMain({ mediasList })
    Lightbox.init()
  }

  async builHeader({ photographer, currentTag }) {
    const siteHeader = document.getElementById("site-header")

    siteHeader.appendChild(await photographerResumeComponent({ photographer, currentTag }))
  }

  buildMain({ mediasList }) {
    const siteMain = document.getElementById("site-main")

    const uiMediaGallery = document.createElement("section")
    uiMediaGallery.className = "media-gallery"

    for (const media of mediasList) {
      uiMediaGallery.append(mediaCardComponent(media))
    }

    siteMain.append(mediaSortComponent(), uiMediaGallery)
  }
}
