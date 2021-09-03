const mediaSorterComponent = () => {
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
  uiLikesBtn.dataset.sorter = "Likes"
  uiLikesBtn.role = "option"
  uiLikesBtn.textContent = "Popularité"
  uiLikesBtn.ariaLabel = "Trier par popularité"

  const uiDateBtn = document.createElement("button")
  uiDateBtn.classList = "btn sort-nav__item"
  uiDateBtn.dataset.sorter = "Date"
  uiDateBtn.role = "option"
  uiDateBtn.textContent = "Date"
  uiLikesBtn.ariaLabel = "Trier par date"

  const uiTitleBtn = document.createElement("button")
  uiTitleBtn.classList = "btn sort-nav__item"
  uiTitleBtn.dataset.sorter = "Title"
  uiTitleBtn.role = "option"
  uiTitleBtn.textContent = "Titre"
  uiLikesBtn.ariaLabel = "Trier par titre"

  uiList.append(uiLikesBtn, uiDateBtn, uiTitleBtn)
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
      if (sortBy === "Date") {
        return console.log("sort by date")
      } else if (sortBy === "Title") {
        return console.log("sort by title")
      }
      console.log("sort by Popularity")
    })
  })

  return uiSortNav
}

export default mediaSorterComponent
