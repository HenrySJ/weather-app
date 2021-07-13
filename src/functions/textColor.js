const textColor = (icon) => {
  console.log(icon.match(/d/))
  switch (icon) {
    case 'd':
      return 'black'
      break
    default:
      return '#f9fafb'
      break
  }
}

export default textColor
