import Image from "../models/image.js"
import Video from "../models/Video.js"

const mediaFactory = media => {
  const element =  media.image ? new Image(media) : new Video(media)

  if
}

export default mediaFactory
