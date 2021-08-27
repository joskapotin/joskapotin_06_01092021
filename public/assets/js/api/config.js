/**
 * Objet contenant les variables de configuration
 * @type {{apiUrl: string, mediasPath: string, photographeThumbPath: string, uiHomeLink: Node, uiHeader: Node, uiMain: Node}}
 */
const config = {
  apiUrl: "./data/fisheyedata.json",
  mediasPath: "./medias",
  photographeThumbPath: "./medias/photographers-id-photos",
  uiHomeLink: document.getElementById("link-to-homepage"),
  uiHeader: document.getElementById("site-header"),
  uiMain: document.getElementById("site-main"),
}

export default config
