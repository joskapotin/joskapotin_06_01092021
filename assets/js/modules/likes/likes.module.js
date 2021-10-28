const likes = () => {
  const uiTarget = document.getElementById('media-gallery')
  uiTarget.addEventListener('click', e => {
    if (e.target.matches('.btn-like')) {
      e.preventDefault()
      const uiLikes = e.target.previousSibling
      const uiTotalLikes = document.querySelector('.photographer__likes-number')

      const likesNbr = parseInt(uiLikes.textContent) + 1
      const totalLikesNbr = parseInt(uiTotalLikes.textContent) + 1

      uiLikes.textContent = likesNbr
      uiTotalLikes.textContent = totalLikesNbr
    }
  })
}

export default likes
