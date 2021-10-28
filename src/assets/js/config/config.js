const URL = window.location.href

/**
 * Objet contenant les variables de configuration
 * @type {{apiUrl: string, mediasPath: string, photographeThumbPath: string}}
 */
const config = {
  apiUrl: URL + 'assets/js/database/fisheyedata.json',
  mediasPath: URL + 'medias',
  photographeThumbPath: URL + 'medias/photographers-id-photos'
}

export default config
