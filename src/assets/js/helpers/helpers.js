const resetPage = () => {
  const elements = document.querySelectorAll("[data-reset]")
  elements.forEach(element => {
    element.remove()
  })
}

const removeNode = node => {
  if (node) {
    node.remove()
  }
}

export { resetPage, removeNode }
