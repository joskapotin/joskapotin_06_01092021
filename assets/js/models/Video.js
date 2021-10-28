import Media from './Media.js'

export default class extends Media {
  constructor ({ id, photographerId, title, video, likes, date, price, tags }) {
    super({ id, photographerId, title, likes, date, price, tags })
    this.media = video
    this.type = 'video'
  }
}
