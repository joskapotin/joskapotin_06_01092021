import Image from '../models/image.js'
import Video from '../models/Video.js'

const mediaFactory = media => {
  return media.image ? new Image(media) : new Video(media)
}

export default mediaFactory
