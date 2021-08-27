import config from "../api/config.js"

const insertPageTitle = title => {
  const uiTitle = document.createElement("h1")
  uiTitle.className = "page-title"
  uiTitle.dataset.reset = "true"
  uiTitle.textContent = title

  config.uiHeader.appendChild(uiTitle)
}

export default insertPageTitle
