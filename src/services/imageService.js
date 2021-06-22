import clearDay from '../img/clearDay.jpg'
import clearNight from '../img/clearNight.jpg'
import cloudDay from '../img/cloudDay.jpg'
import cloudNight from '../img/cloudNight.jpg'
import rain from '../img/rain.jpg'
import thunder from '../img/thunder.jpg'
import snow from '../img/snow.jpg'
import mist from '../img/mist.jpg'

const images = {
  clearDay,
  clearNight,
  cloudDay,
  cloudNight,
  mist,
  rain,
  snow,
  thunder,
}

const weather = (string) => {
  if (string === '01d') return images.clearDay
  else if (string === '01n') return images.clearNight
  else if (string.match(/02d/) || string.match(/03d/) || string.match(/04d/))
    return images.cloudDay
  else if (string.match(/02n/) || string.match(/03n/) || string.match(/04n/))
    return images.cloudNight
  else if (string.match(/09/) || string.match(/10/)) return images.rain
  else if (string.match(/11/)) return images.thunder
  else if (string.match(/13/)) return images.snow
  else if (string.match(/50/)) return images.mist
}

export default weather
