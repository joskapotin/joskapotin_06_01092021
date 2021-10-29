import PhotographerController from "../../controllers/Photographer.controller.js"

/**
 * Create sorter select menu
 * @param {{id:number,tag:string,sortBy:string}} params - photographer id, current tag, current sort
 */
export default class MediaSorter {
  constructor(params) {
    this.params = params
    this.element = this.renderNav()
  }

  /**
   *
   * @returns {HTMLElement}
   */
  renderNav() {
    const uiSortNav = document.createElement("nav")
    uiSortNav.className = "sort-nav"

    const uiLabel = document.createElement("span")
    uiLabel.className = "sort-nav__label"
    uiLabel.textContent = "Trier par"

    const uiList = document.createElement("div")
    uiList.className = "sort-nav__list"
    uiList.role = "listbox"

    const uiLikesBtn = document.createElement("button")
    uiLikesBtn.classList = "btn sort-nav__item"
    uiLikesBtn.dataset.sorter = "POPULARITY"
    uiLikesBtn.role = "option"
    uiLikesBtn.textContent = "Popularité"
    uiLikesBtn.ariaLabel = "Trier par popularité"

    const uiDateBtn = document.createElement("button")
    uiDateBtn.classList = "btn sort-nav__item"
    uiDateBtn.dataset.sorter = "DATE"
    uiDateBtn.role = "option"
    uiDateBtn.textContent = "Date"
    uiDateBtn.ariaLabel = "Trier par date"

    const uiTitleBtn = document.createElement("button")
    uiTitleBtn.classList = "btn sort-nav__item"
    uiTitleBtn.dataset.sorter = "TITLE"
    uiTitleBtn.role = "option"
    uiTitleBtn.textContent = "Titre"
    uiTitleBtn.ariaLabel = "Trier par titre"

    if (this.params.sortBy === "DATE") {
      uiList.append(uiDateBtn, uiLikesBtn, uiTitleBtn)
    } else if (this.params.sortBy === "TITLE") {
      uiList.append(uiTitleBtn, uiLikesBtn, uiDateBtn)
    } else {
      uiList.append(uiLikesBtn, uiDateBtn, uiTitleBtn)
    }

    uiSortNav.append(uiLabel, uiList)

    uiList.childNodes.forEach(uiElement => {
      uiElement.addEventListener("click", e => {
        e.preventDefault()
        e.stopPropagation()
        // The first option is the current so we do nothing
        const target = e.target
        const parent = e.target.parentNode
        const current = parent.firstChild
        if (target.isSameNode(current)) {
          return
        }
        parent.insertBefore(target, parent.firstChild)
        const sortBy = target.dataset.sorter
        if (sortBy === "DATE") {
          this.params.sortBy = sortBy
          const controller = new PhotographerController(this.params)
          return controller.render()
        } else if (sortBy === "TITLE") {
          this.params.sortBy = sortBy
          const controller = new PhotographerController(this.params)
          return controller.render()
        }
        this.params.sortBy = sortBy
        const controller = new PhotographerController(this.params)
        return controller.render()
      })
    })

    return uiSortNav
  }
}
