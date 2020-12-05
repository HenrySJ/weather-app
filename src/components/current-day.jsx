import React, { Component } from "react";
import capitilize from "../functions/capitilize";
import { time, formateDate } from "../functions/dateTime";
import Card from "./common/card";
import formatTime from "../functions/formatTime";

class CurrentDay extends Component {
  handleDirection(degree) {
    if (degree >= 0 && degree < 90) {
      if (degree > 20) return "NE";
      else return "N";
    }
    if (degree >= 90 && degree < 180) {
      if (degree > 110) return "SE";
      else return "E";
    }
    if (degree >= 180 && degree < 270) {
      if (degree > 200) return "SW";
      else return "S";
    }
    if (degree >= 270 && degree < 360) {
      if (degree > 290) return "NW";
      else return "W";
    }
  }

  render() {
    const { current } = this.props;
    let icon = current.weather[0].icon;
    let temp = current.temp;
    let date = formateDate(current.dt);
    let data = {
      forecast: capitilize(current.weather[0].description),
      wind: `${current.wind_speed.toFixed(1)}mph ${this.handleDirection(
        current.wind_deg
      )}`,
      humidity: `${current.humidity}%`,
      visibility: `${current.visibility.toFixed(1) / 1000}km`,
      sunrise: formatTime(time(current.sunrise)),
      sunset: formatTime(time(current.sunset)),
    };

    return (
      <Card
        imgSrc={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        temp={temp}
        date={date}
        data={data}
      />
    );
  }
}

export default CurrentDay;
