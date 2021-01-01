import React, { Component } from "react";
import { formateDate, time } from "../functions/dateTime";
import capitilize from "../functions/capitilize";
import List from "./common/list";
import formatTime from "../functions/formatTime";

class Daily extends Component {
  format = (input) => {
    return input.map((data) => {
      return {
        icon: data.icon,
        temp: data.temp,
        date: formateDate(data.date),
        data: {
          forecast: data.data.forecast,
          wind: `${data.data.wind.windSpeed.toFixed(
            1
          )}mph ${this.handleDirection(data.data.wind.windDegree)}`,
          humidity: `${data.data.humidity}%`,
          sunrise: formatTime(time(data.data.sunrise)),
          sunset: formatTime(time(data.data.sunset)),
        },
      };
    });
  };

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
    const { data } = this.props;
    const array = this.format(data);
    return (
      <div className="container h-120">
        <p className="bg-yellow-300 py-1 px-3 text-2xl text-yellow-900 lg:py-4 rounded-2xl text-center tracking-widest">
          Daily Forecast
        </p>
        <div className="mt-16 mx-4 h-104 overflow-auto overscroll-auto">
          <List data={array} />
        </div>
      </div>
    );
  }
}

export default Daily;
