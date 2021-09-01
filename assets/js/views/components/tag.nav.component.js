const tagItem = ({ tag, currentTag, tagPrefix }) => {
  const item = document.createElement("li")
  item.className = "tag-item"
  const link = document.createElement("a")
  link.href = tagPrefix ? `${tagPrefix}/tags/${tag}` : `/tags/${tag}`
  link.className = "tag-link"
  link.dataset.link = "true"
  link.textContent = `#${tag}`
  if (tag === currentTag) {
    link.classList.add("tag-active")
  }

  item.appendChild(link)

  return item
}

const tagNavComponent = ({ tags, currentTag, tagPrefix }) => {
  const uiTagNav = document.createElement("nav")
  uiTagNav.className = "tag-nav"

  const uiList = document.createElement("ul")
  uiList.className = "tag-list"

  for (const tag of tags) {
    uiList.append(tagItem({ tag, currentTag, tagPrefix }))
  }

  uiTagNav.append(uiList)

  return uiTagNav
}

export default tagNavComponent
