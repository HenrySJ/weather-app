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
      `https://api.openweathermap.org/data/2.5/onecall?lat=${location[0]}&lon=${location[1]}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`
    );

    const state = {};
    state.current = data.current;
    state.daily = data.daily;
    state.hourly = data.hourly;
    state.timezoneOffset = data.timezone_offset;
    state.location = this.getLocation(data.timezone);
    state.stateName = "";
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

  handleSubmit = async (city) => {
    if (city) {
      try {
        const res = await http.get(
          `https://geocode.xyz/${city}?geoit=json&region=US&auth=${process.env.REACT_APP_GEO_TOKEN}`
        );
        console.log(res);
        if (res.data.alt.loc) {
          console.log("in the if");
          const state = { ...this.state };
          state.alts = "";
          state.alts = [...res.data.alt.loc];
          this.setState(state);
        }
        const detailedRes = await http.get(
          `https://geocode.xyz/${res.data.latt},${res.data.longt}?json=1&auth=${process.env.REACT_APP_GEO_TOKEN}`
        );
        const { data } = await http.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${res.data.latt}&lon=${res.data.longt}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`
        );
        const state = {
          current: data.current,
          daily: data.daily,
          hourly: data.hourly,
          timezoneOffset: data.timezone_offset,
          location: res.data.standard.city,
          stateName: detailedRes.data.statename,
        };
        if (data.alerts) {
          state.alerts = data.alerts;
        }
        this.setState(state);
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
          {this.state.alts && <Option options={this.state.alts} />}
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
