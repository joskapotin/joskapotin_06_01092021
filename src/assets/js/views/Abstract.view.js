export default class {
  constructor (params) {
    this.params = params
    this.remove(['.top-nav', '.section-photographers', '.photographer__resume', '.sort-nav', '.media-gallery', '.lightbox', '.modal'])
  }

  setPageClass (pageClass) {
    document.getElementById('app').classList.add(pageClass)
  }

  setTitle (title) {
    document.title = title
  }

  remove (elementClass) {
    const toRemove = document.querySelectorAll(elementClass.join(','))
    toRemove?.forEach(element => {
      element.remove()
    })
  }

  async getHtml () {
    return ''
  }
}
