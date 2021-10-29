import Abstract from "./Abstract.view.js"
import tagNavComponent from "./components/tag.nav.component.js"
import photographerCardComponent from "./components/photographer.card.component.js"

/**
 * @class
 * @classdesc home page view
 * @param {{allTheTags:string[], currentTag:string, photographersList:object[]}}
 * @extends Abstract
 */
export default class extends Abstract {
  constructor({ allTheTags, currentTag, photographersList }) {
    super()
    this.setTitle("FishEye - Homepage")
    if (currentTag) {
      this.setTitle("FishEye - Homepage - " + currentTag)
    }
    this.setPageClass("page-home")
    this.builHeader({ allTheTags, currentTag })
    this.buildMain({ photographersList, currentTag })
  }

  /**
   * render tag nav menu
   * @param {{allTheTags:string[], currentTag:string}}
   */
  builHeader({ allTheTags, currentTag }) {
    const siteHeader = document.getElementById("site-header")

    const uiTagNav = tagNavComponent({ tags: allTheTags, currentTag })
    uiTagNav.classList.add("top-nav")
    uiTagNav.ariaLabel = "Primary"

    siteHeader.appendChild(uiTagNav)
  }

  /**
   * render photographers cards grid
   * @param {{photographersList:object[], currentTag:string}}
   */
  buildMain({ photographersList, currentTag }) {
    const siteMain = document.getElementById("site-main")

    const uiPhotographersSection = document.createElement("section")
    uiPhotographersSection.className = "section-photographers"

    const uiTitle = document.createElement("h1")
    uiTitle.classList.add("page-title")
    uiTitle.textContent = "Nos photographes"

    const uiPhotographersGrid = document.createElement("div")
    uiPhotographersGrid.classList.add("photographers-grid")

    for (const photographer of photographersList) {
      uiPhotographersGrid.append(photographerCardComponent({ photographer, currentTag }))
    }

    uiPhotographersSection.append(uiTitle, uiPhotographersGrid)

    siteMain.appendChild(uiPhotographersSection)
  }
}
