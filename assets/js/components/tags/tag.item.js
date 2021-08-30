const tagItem = (tag, prefix) => {
  const item = document.createElement("li")
  item.className = "tag-item"
  const link = document.createElement("a")
  link.href = prefix ? `${prefix}/tags/${tag}` : `/tags/${tag}`
  link.className = "tag-link"
  link.dataset.link = "true"
  link.textContent = `#${tag}`

  item.appendChild(link)

  return item
}

export default tagItem
