export default class {
  constructor(params) {
    this.params = params
  }

  setTitle(title) {
    document.title = title
  }

  LoadAction(action) {
    return action
  }

  async getHtml() {
    return ""
  }
}
