const direction = (degree) => {
  if (degree >= 0 && degree < 90) {
    if (degree > 20) return 'NE'
    else return 'N'
  }
  if (degree >= 90 && degree < 180) {
    if (degree > 110) return 'SE'
    else return 'E'
  }
  if (degree >= 180 && degree < 270) {
    if (degree > 200) return 'SW'
    else return 'S'
  }
  if (degree >= 270 && degree < 360) {
    if (degree > 290) return 'NW'
    else return 'W'
  }
}

module.exports.direction = direction
