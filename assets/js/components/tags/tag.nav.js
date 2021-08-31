import getTags from "./tag.service.js"
import tagItem from "./tag.item.js"

const tagNav = async ({ tags, currentTag, tagPrefix }) => {
  const tagsArray = tags || (await getTags())
  const uiTagNav = document.createElement("nav")
  uiTagNav.className = "tag-nav"

  const uiList = document.createElement("ul")
  uiList.className = "tag-list"

  for (const tag of tagsArray) {
    uiList.append(tagItem({ tag, currentTag, tagPrefix }))
  }

  uiTagNav.append(uiList)
  return uiTagNav
}

export default tagNav
