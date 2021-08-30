/**
 * Objet contenant les variables de configuration
 * @type {{apiUrl: string, mediasPath: string, photographeThumbPath: string}}
 */
const URL = window.location.href

const config = {
  apiUrl: URL + "data/fisheyedata.json",
  mediasPath: URL + "/medias",
  photographeThumbPath: URL + "/medias/photographers-id-photos",
}

export default config
