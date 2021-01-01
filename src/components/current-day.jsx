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
    let icon = current.icon;
    let temp = current.temp;
    let date = formateDate(current.date);
    let data = {
      forecast: current.forecast,
      wind: `${current.data.wind.windSpeed.toFixed(
        1
      )}mph ${this.handleDirection(current.data.wind.windDegree)}`,
      humidity: `${current.data.humidity}%`,
      visibility: `${current.data.visibility.toFixed(1) / 1000}km`,
      sunrise: formatTime(time(current.data.sunrise)),
      sunset: formatTime(time(current.data.sunset)),
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
