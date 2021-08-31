import Abstract from "./Abstract.view.js"
import photographerResume from "../components/photographers/photographer.resume.js"
import sortNav from "../components/medias/media.sort.js"
import mediasList from "../components/medias/media.list.js"

export default class extends Abstract {
  constructor(params) {
    super(params)
    this.setTitle("FishEye - Photographer")
  }

  async getHtml() {
    const uiPage = document.createElement("div")
    uiPage.classList.add("page", "page-photographer")

    const uiHeader = document.createElement("header")
    uiHeader.classList.add("site-header")

    const uiMain = document.createElement("main")
    uiMain.classList.add("site-main")
    uiMain.id = "main-content"

    uiHeader.appendChild(await photographerResume(this.params.id))
    uiMain.append(sortNav(this.params.id), await mediasList(this.params))

    uiPage.append(uiHeader, uiMain)

    return uiPage
  }
}
