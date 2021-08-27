import { getMediasByPhotographer } from "../components/medias/media.service.js"
import { showMedias } from "../pages/page.photographer.js"

const sortMediasByPopularity = async photographerId => {
  const unsortedMedias = await getMediasByPhotographer(photographerId)
  const sortedMedias = unsortedMedias.sort((a, b) => b.likes - a.likes)
  showMedias(sortedMedias)
}

const sortMediasByDate = async photographerId => {
  const unsortedMedias = await getMediasByPhotographer(photographerId)
  const sortedMedias = unsortedMedias.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  showMedias(sortedMedias)
}

const sortMediasByTitle = async photographerId => {
  const unsortedMedias = await getMediasByPhotographer(photographerId)
  const sortedMedias = unsortedMedias.sort((a, b) => a.title.localeCompare(b.title))
  showMedias(sortedMedias)
}

const uiSortNav = photographerId => {
  const uiNav = document.createElement("nav")
  uiNav.className = "sort-nav"
  uiNav.dataset.reset = "true"

  const uiLabel = document.createElement("span")
  uiLabel.className = "sort-nav__label"
  uiLabel.textContent = "Trier par"

  const uiList = document.createElement("div")
  uiList.className = "sort-nav__list"
  uiList.role = "listbox"

  const uiLikesBtn = document.createElement("button")
  uiLikesBtn.classList = "btn sort-nav__item"
  uiLikesBtn.dataset.sorter = "Likes"
  uiLikesBtn.role = "option"
  uiLikesBtn.textContent = "Popularité"

  const uiDateBtn = document.createElement("button")
  uiDateBtn.classList = "btn sort-nav__item"
  uiDateBtn.dataset.sorter = "Date"
  uiDateBtn.role = "option"
  uiDateBtn.textContent = "Date"

  const uiTitleBtn = document.createElement("button")
  uiTitleBtn.classList = "btn sort-nav__item"
  uiTitleBtn.dataset.sorter = "Title"
  uiTitleBtn.role = "option"
  uiTitleBtn.textContent = "Titre"

  uiList.append(uiLikesBtn, uiDateBtn, uiTitleBtn)
  uiNav.append(uiLabel, uiList)

  uiList.childNodes.forEach(uiElement => {
    uiElement.addEventListener("click", event => {
      // The first option is the current so we do nothing
      const target = event.target
      const parent = event.target.parentNode
      const current = parent.firstChild
      if (target.isSameNode(current)) {
        return
      }
      parent.insertBefore(target, parent.firstChild)
      const sortBy = target.dataset.sorter
      if (sortBy === "Date") {
        return sortMediasByDate(photographerId)
      } else if (sortBy === "Title") {
        return sortMediasByTitle(photographerId)
      }
      sortMediasByPopularity(photographerId)
    })
  })

  return uiNav
}
export { uiSortNav }
