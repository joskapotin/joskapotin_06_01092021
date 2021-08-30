import getTags from "./tag.service.js"
import tagItem from "./tag.item.js"

const tagNav = async (array, prefix) => {
  const tags = array || (await getTags())
  const uiTagNav = document.createElement("nav")
  uiTagNav.className = "tag-nav"

  const uiList = document.createElement("ul")
  uiList.className = "tag-list"

  for (const tag of tags) {
    uiList.append(tagItem(tag, prefix))
  }

  uiTagNav.append(uiList)
  return uiTagNav
}

export default tagNav
