import React, { Component } from "react";
import http from "../services/httpService";
import CurrentDay from "./current-day";
import Daily from "./daily";
import Hourly from "./hourly";
import Navbar from "./navbar";
import Option from "./common/option";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Home extends Component {
  state = {
    alts: "",
  };

  async componentDidMount() {
    const { data: res } = await http.get(
      "https://www.cloudflare.com/cdn-cgi/trace"
    );
    const ip = res.match(/ip=([\w.]+)/)[1];
    const {
      data: { loc },
    } = await http.get(
      `https://ipinfo.io/${ip}?token=${process.env.REACT_APP_IP_TOKEN}`
    );
    const location = loc.split(",");
    const { data } = await http.get(
      `https://weather-app-caching.herokuapp.com/api/weather?lat=${location[0]}&lon=${location[1]}`
    );
    const state = {};
    state.current = data.current;
    state.daily = data.daily;
    state.hourly = data.hourly;
    state.location = data.location;
    if (data.alerts) {
      state.alerts = data.alerts;
    }
    this.setState(state);
    console.log(this.state);
  }

  setWeather = async (lat, lon, city, prov) => {
    if (prov) {
      const { data } = await http.get(
        `https://weather-app-caching.herokuapp.com/api/weather?lat=${lat}&lon=${lon}`
      );
      const state = {
        current: data.current,
        daily: data.daily,
        hourly: data.hourly,
        location: data.location,
      };
      if (data.alerts) {
        state.alerts = data.alerts;
      }
      this.setState(state);
    }
  };

  handleClick = ({ latt, longt, city, prov }) => {
    this.setWeather(latt, longt, city, prov);
  };

  handleSubmit = async (city) => {
    if (city) {
      try {
        const { data } = await http.get(
          `https://geocode.xyz/${city}?geoit=json&region=US&auth=${process.env.REACT_APP_GEO_TOKEN}`
        );
        if (data.alt.loc) {
          const state = { ...this.state };
          state.alts = "";
          state.alts = [...data.alt.loc];
          this.setState(state);
        }
        this.setWeather(data.latt, data.longt, data.standard.city);
      } catch (error) {
        toast.error("City not found. Please check spelling.");
      }
    }
  };

  render() {
    return (
      <>
        <ToastContainer draggable={false} transition={Zoom} autoClose={6000} />
        <Navbar handleSubmit={this.handleSubmit} />
        <div className="container mx-auto">
          {this.state.alts && (
            <Option options={this.state.alts} handleClick={this.handleClick} />
          )}
        </div>
        <div className="container mx-auto mt-6">
          <div className="flex items-center justify-center mb-10 bg-gray-900 py-3 rounded-2xl">
            <p className="text-3xl text-white">
              {this.state.location}
              {this.state.stateName && ", "}
              {this.state.stateName && <span>{this.state.stateName}</span>}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
            <div className="col-span-1 mx-auto md:ml-2 lg:mx-10">
              {this.state.current && (
                <CurrentDay current={this.state.current} />
              )}
            </div>
            <div className="mt-20 col-span-1 mx-auto md:mt-0  md:mr-0 lg:mx-10">
              {this.state.daily && <Daily data={this.state.daily.data} />}
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
