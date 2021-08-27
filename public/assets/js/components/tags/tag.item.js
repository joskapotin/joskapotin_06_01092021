const tagItem = tag => {
  const item = document.createElement("li")
  item.className = "tag-item"

  const link = document.createElement("a")
  link.href = `#tag-${tag}`
  link.className = "tag-link"
  link.dataset.tag = tag
  link.textContent = `#${tag}`

  item.appendChild(link)

  return item
}

export default tagItem
