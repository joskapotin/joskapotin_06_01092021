import { allTagList } from "../components/tags/tag.list.js"
import { showPhotographersByTag } from "../pages/page.home.js"

const topNav = async () => {
  const uiTagNav = await allTagList()
  uiTagNav.id = "top-nav"
  uiTagNav.dataset.reset = "true"
  const uiTagLink = uiTagNav.querySelectorAll(".tag-link")
  uiTagLink.forEach(uiTagLink => {
    uiTagLink.addEventListener("click", event => {
      event.preventDefault()
      const tag = event.target.dataset.tag
      showPhotographersByTag(tag)
    })
  })
  return uiTagNav
}

export default topNav
