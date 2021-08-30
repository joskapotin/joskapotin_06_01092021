const lightbox2 = () => {
  const links = Array.from(document.querySelectorAll('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"]'))
  const images = links.map(link => link.getAttribute("href"))
  let urlCurrent = null

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault()
      const url = e.currentTarget.getAttribute("href")
      construct(url)
    })
  })

  const construct = url => {
    const box = buildDOM()
    loadImage({ url, box })
    document.body.appendChild(box)
    document.addEventListener("keyup", e => onKeyUp.bind({ e, box }))
  }

  const loadImage = ({ url, box }) => {
    const image = new Image()
    const figure = box.querySelector(".lightbox__figure")
    const loader = document.createElement("div")
    loader.classList.add("lightbox__loader")
    figure.innerHTML = ""
    figure.appendChild(loader)
    image.onload = () => {
      figure.removeChild(loader)
      figure.appendChild(image)
      urlCurrent = url
    }
    image.src = url
    image.className = "lightbox__img"
  }

  const onKeyUp = ({ e, box }) => {
    if (e.key === "Escape") {
      close({ e, box })
    } else if (e.key === "ArrowLeft") {
      prev({ e, box })
    } else if (e.key === "ArrowRight") {
      next({ e, box })
    }
  }

  const close = ({ e, box }) => {
    console.log(e.currentTarget)
    e.preventDefault(box.classList.add("fade-out"))
    window.setTimeout(() => {
      box.parentElement.removeChild(box)
    }, 500)
    document.removeEventListener("keyup", onKeyUp)
  }

  const prev = ({ e, box }) => {
    e.preventDefault()
    let i = images.findIndex(image => image === urlCurrent)
    if (i === 0) {
      i = images.length
    }

    loadImage({ url: images[i - 1], box })
  }

  const next = ({ e, box }) => {
    e.preventDefault()
    let i = images.findIndex(image => image === urlCurrent)
    if (i === images.length - 1) {
      i = -1
    }

    loadImage({ url: images[i + 1], box })
  }

  const buildDOM = () => {
    const box = document.createElement("div")
    box.className = "lightbox"

    const closeBtn = document.createElement("button")
    closeBtn.className = "lightbox__close"
    const closeBtnTxt = document.createElement("span")
    closeBtnTxt.className = "visually-hidden"
    closeBtnTxt.textContent = "Fermer"
    closeBtn.appendChild(closeBtnTxt)
    closeBtn.addEventListener("click", e => close({ e, box }))

    const nextBtn = document.createElement("button")
    nextBtn.className = "lightbox__next"
    const nextBtnTxt = document.createElement("span")
    nextBtnTxt.className = "visually-hidden"
    nextBtnTxt.textContent = "Suivant"
    nextBtn.appendChild(nextBtnTxt)
    nextBtn.addEventListener("click", e => next({ e, box }))

    const prevBtn = document.createElement("button")
    prevBtn.className = "lightbox__prev"
    const prevBtnTxt = document.createElement("span")
    prevBtnTxt.className = "visually-hidden"
    prevBtnTxt.textContent = "Précédent"
    prevBtn.appendChild(prevBtnTxt)
    prevBtn.addEventListener("click", e => prev({ e, box }))

    const container = document.createElement("div")
    container.className = "lightbox__container"

    const figure = document.createElement("figure")
    figure.className = "lightbox__figure"

    container.append(closeBtn, nextBtn, prevBtn, figure)
    box.appendChild(container)

    return box
  }
}

export default lightbox2
