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

export default tagItem
