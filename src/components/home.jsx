import React, { Component } from "react";
import http from "../services/httpService";
import CurrentDay from "./current-day";
import Daily from "./daily";
import Hourly from "./hourly";
import Navbar from "./navbar";
import config from "../config";

class Home extends Component {
  state = {};

  async componentDidMount() {
    const { data: res } = await http.get(
      "https://www.cloudflare.com/cdn-cgi/trace"
    );
    const ip = res.match(/ip=([\w.]+)/)[1];
    const {
      data: { loc },
    } = await http.get(`https://ipinfo.io/${ip}?token=${config.ipToken}`);
    const location = loc.split(",");
    const { data } = await http.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${location[0]}&lon=${location[1]}&units=imperial&appid=${config.apiKey}`
    );

    const state = { ...this.state };
    state.current = data.current;
    state.daily = data.daily;
    state.hourly = data.hourly;
    state.timezoneOffset = data.timezone_offset;
    state.location = this.getLocation(data.timezone);
    if (data.alerts) {
      state.alerts = data.alerts;
    }
    this.setState(state);
    console.log("Home State:", this.state);
    console.log("data:", data);
  }

  getLocation = (timezone) => {
    return timezone.split("/")[1];
  };

  handleSubmit = async (value) => {
    if (value) {
      const res = await http.get(
        `https://geocode.xyz/${value}?json=1?region=US`
      );
      const { data } = await http.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${res.data.latt}&lon=${res.data.longt}&units=imperial&appid=cb879b4844206c1fbb59f2d987588976`
      );
      const state = {
        current: data.current,
        daily: data.daily,
        hourly: data.hourly,
        timezoneOffset: data.timezone_offset,
        location: res.data.standard.city,
      };
      if (data.alerts) {
        state.alerts = data.alerts;
      }
      this.setState(state);
      console.log(data);
    }
  };

  render() {
    return (
      <>
        <Navbar handleSubmit={this.handleSubmit} />
        <div className="container mx-auto mt-10">
          <div className="flex items-center justify-center mb-10 bg-gray-900 py-3 rounded-2xl">
            <p className="text-3xl text-white">{this.state.location}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
            <div className="col-span-1 mx-auto md:ml-2 lg:mx-10">
              {this.state.current && (
                <CurrentDay current={this.state.current} />
              )}
            </div>
            <div className="mt-20 col-span-1 mx-auto md:mt-0  md:mr-0 lg:mx-10">
              {this.state.daily && <Daily data={this.state.daily} />}
            </div>
          </div>
          <div className="ml-2 mt-40 md:mt-20 mx-auto lg:mx-10">
            {this.state.hourly && <Hourly data={this.state.hourly} />}
          </div>
        </div>
      </>
    );
  }
}

export default Home;
