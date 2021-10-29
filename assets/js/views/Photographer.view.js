import Abstract from "./Abstract.view.js"
import photographerResumeComponent from "./components/photographer.resume.component.js"
import mediaCardComponent from "./components/media.card.component.js"
import Lightbox from "../modules/lightbox/lightbox.module.js"
import ContactForm from "../modules/contactform/contactform.module.js"
import likes from "../modules/likes/likes.module.js"
import MediaSorter from "../modules/mediaSorter/media.sorter.module.js"

/**
 * @class
 * @classdesc photographer page view
 * @param {{photographer:object, totalLikes:string, mediasList:object[], currentTag:string, sortBy:string}}
 * @extends Abstract
 */
export default class extends Abstract {
  constructor({ photographer, totalLikes, mediasList, currentTag, sortBy }) {
    super()
    this.setTitle(`FishEye - ${photographer.name}`)
    if (currentTag) {
      this.setTitle(`FishEye - ${photographer.name} - ${currentTag}`)
    }
    this.setPageClass("page-photographer")
    this.builHeader({ photographer, totalLikes, currentTag })
    this.buildMain({ photographer, mediasList, currentTag, sortBy })
    Lightbox.init()
    ContactForm.init(photographer.name)
    likes()
  }

  /**
   * render photographer resume
   * @param {{photographer:object, totalLikes:string, currentTag:string}}
   */
  builHeader({ photographer, totalLikes, currentTag }) {
    const siteHeader = document.getElementById("site-header")

    siteHeader.appendChild(photographerResumeComponent({ photographer, totalLikes, currentTag }))
  }

  /**
   * render media gallery, tag nav, sorter menu
   * @param {{photographer:object, mediasList:object[], currentTag:string, sortBy:string}}
   */
  buildMain({ photographer, mediasList, currentTag, sortBy }) {
    const siteMain = document.getElementById("site-main")

    const uiMediaGallery = document.createElement("section")
    uiMediaGallery.id = "media-gallery"
    uiMediaGallery.className = "media-gallery"

    for (const media of mediasList) {
      uiMediaGallery.append(mediaCardComponent(media))
    }

    const mediaSorter = new MediaSorter({ id: photographer.id, tag: currentTag, sortBy })

    siteMain.append(mediaSorter.renderNav(), uiMediaGallery)
  }
}
