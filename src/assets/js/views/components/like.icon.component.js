const likeIconComponent = () => {
  const uiLikeIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  uiLikeIcon.setAttribute('fill', 'inherit')
  uiLikeIcon.setAttribute('viewBox', '0 0 19 19')
  uiLikeIcon.classList.add('btn-like__icon')

  const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  iconPath.setAttribute(
    'd',
    'M9.5 18.35l-1.269-1.32C3.725 12.36.75 9.28.75 5.5.75 2.42 2.868 0 5.563 0 7.085 0 8.546.81 9.5 2.09 10.454.81 11.915 0 13.438 0c2.694 0 4.812 2.42 4.812 5.5 0 3.78-2.975 6.86-7.481 11.54L9.5 18.35z'
  )

  uiLikeIcon.appendChild(iconPath)

  return uiLikeIcon
}

export default likeIconComponent
