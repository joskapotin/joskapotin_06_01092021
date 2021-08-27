import getAllTags from "./tag.service.js"
import tagItem from "./tag.item.js"

const allTagList = async () => {
  const tags = await getAllTags()

  const nav = document.createElement("nav")
  nav.className = "tag-nav"
  nav.dataset.reset = ""

  const list = document.createElement("ul")
  list.className = "tag-list"

  for (const tag of tags) {
    list.appendChild(tagItem(tag))
  }

  nav.append(list)
  return nav
}

const tagList = tags => {
  const nav = document.createElement("nav")
  nav.className = "tag-nav"
  nav.dataset.reset = ""

  const list = document.createElement("ul")
  list.className = "tag-list"

  tags = tags.sort()
  for (const tag of tags) {
    list.append(tagItem(tag))
  }

  nav.append(list)
  return nav
}

export { allTagList, tagList }
