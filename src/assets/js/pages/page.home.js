import config from "../api/config.js"
import topNav from "../layout/top-nav.js"
import { getPhotographerByTag } from "../components/photographers/photographer.service.js"
import { AllPhotographersList, photographersList } from "../components/photographers/photographer.list.js"
import { resetPage } from "../helpers/helpers.js"

const showPhotographersByTag = async tag => {
  document.getElementById("photographers-list").remove()

  const photographers = await getPhotographerByTag(tag)

  config.uiMain.appendChild(photographersList(photographers))
}

const initHomepage = async () => {
  resetPage()
  document.body.id = "page-home"

  config.uiHeader.append(await topNav())
  config.uiMain.insertAdjacentHTML("beforeend", '<h1 class="page-title" data-reset="true">Nos photographes</h1>')
  config.uiMain.appendChild(await AllPhotographersList())
}

export { initHomepage, showPhotographersByTag }
