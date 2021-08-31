import Abstract from "./Abstract.view.js"
import tagNav from "../components/tags/tag.nav.js"
import photographersList from "../components/photographers/photographer.list.js"

export default class extends Abstract {
  constructor(params) {
    super(params)
    this.setTitle("FishEye - Homepage")
  }

  async getHtml() {
    const uiPage = document.createElement("div")
    uiPage.classList.add("page", "page-home")

    const uiHeader = document.createElement("header")
    uiHeader.classList.add("site-header")

    const uiTagNav = await tagNav({ currentTag: this.params?.tag })
    uiTagNav.classList.add("top-nav")

    const uiTitle = document.createElement("h1")
    uiTitle.className = "page-title"
    uiTitle.dataset.reset = "true"
    uiTitle.textContent = "Nos photographes"

    const uiMain = document.createElement("main")
    uiMain.classList.add("site-main")
    uiMain.id = "main-content"
    uiMain.tabIndex = "-1"

    uiHeader.append(uiTagNav, uiTitle)

    uiMain.appendChild(await photographersList({ tag: this.params?.tag, currentTag: this.params?.tag }))

    uiPage.append(uiHeader, uiMain)

    return uiPage
  }
}
