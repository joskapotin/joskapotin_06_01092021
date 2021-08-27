const resetPage = () => {
  const elements = document.querySelectorAll("[data-reset]")
  elements.forEach(element => {
    element.remove()
  })
}

export { resetPage }
