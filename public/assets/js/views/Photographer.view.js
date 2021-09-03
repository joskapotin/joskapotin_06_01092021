import Abstract from "./Abstract.view.js"
import photographerResumeComponent from "./components/photographer.resume.component.js"
import mediaCardComponent from "./components/media.card.component.js"
import Lightbox from "../modules/lightbox/lightbox.module.js"
import ContactForm from "../modules/contactform/contactform.module.js"
import likes from "../modules/likes/likes.module.js"
import MediaSorter from "../modules/mediaSorter/media.sorter.module.js"

export default class extends Abstract {
  constructor({ photographer, mediasList, currentTag }) {
    super()
    this.setTitle(`FishEye - ${photographer.name}`)
    if (currentTag) {
      this.setTitle(`FishEye - ${photographer.name} - ${currentTag}`)
    }
    this.setPageClass("page-photographer")
    this.builHeader({ photographer, currentTag })
    this.buildMain({ photographer, mediasList, currentTag })
    Lightbox.init()
    ContactForm.init(photographer.name)
    likes()
  }

  async builHeader({ photographer, currentTag }) {
    const siteHeader = document.getElementById("site-header")

    siteHeader.appendChild(await photographerResumeComponent({ photographer, currentTag }))
  }

  buildMain({ mediasList }) {
    const siteMain = document.getElementById("site-main")

    const uiMediaGallery = document.createElement("section")
    uiMediaGallery.id = "media-gallery"
    uiMediaGallery.className = "media-gallery"

    for (const media of mediasList) {
      uiMediaGallery.append(mediaCardComponent(media))
    }

    const mediaSorter = new MediaSorter()

    siteMain.append(mediaSorter.renderNav(), uiMediaGallery)
  }
}
