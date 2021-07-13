import React, { Component } from 'react'
import '../styles/home.css'
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import http from '../services/httpService'
import { time } from '../functions/dateTime'
import { day } from '../functions/day'
import { direction } from '../functions/direction'
import Icon from './common/icon'
import capitilize from '../functions/capitilize'
import weather from '../services/imageService'
import textColor from '../functions/textColor';

class home extends Component {
  state = { 
      isActive: 'weather',
        value: ''
    }
   async componentDidMount() {
     try {
        const { data } = await http.get(`${http.url}lat=33.44&lon=-112.07`)
        let state = {...this.state}
        state = {...data}
        state.daily.splice(0, 1)
        this.setState(state)
     } catch (error) {
         console.log(error)
     }
  }
  style = (header) => {
    return (this.state.isActive === header) ? {borderColor: '#EDE9FE'} : {borderColor: '#6D28D9'}
  }
  handleToggle = (header) => {
      let state = {...this.state}
      state.isActive = header
      this.setState(state)
  }
  handleChange = (e) => {
    e.preventDefault()
    let state = {...this.state}
    state.value = e.target.value
    this.setState(state)
  }
  handleClick = (current) => {
    this.handleData(current.latt, current.longt)
  }
  handleData =  async (lat, long) => {
    const { data } = await http.get(`${http.url}lat=${lat}&lon=${long}`)
    let state = {...this.state}
    state = {...data}
    state.daily.splice(0, 1)
    state.value = ""
    state.alts = "";
    this.setState(state)
  }
  handleSubmit = async (event) => {
      event.preventDefault()
      let city = capitilize(this.state.value);
        if (city) {
            try {
                if (city.match(/ /)) {
                    city = city.split(' ')[0] + '+' + city.split(' ')[1]
                }
                const { data } = await http.get(
                `https://geocode.xyz/${city}?geoit=json&region=US&auth=${process.env.REACT_APP_GEO_TOKEN}`
                );
                if (data.alt.loc) {
                    const state = { ...this.state };
                    state.alts = "";
                    if (data.alt.loc.length) {
                        state.alts = [...data.alt.loc];
                        state.value = ""
                        console.log(state)
                        return this.setState(state);
                    }
                    state.alts = [data.alt.loc];
                    state.value = ""
                    this.setState(state);
                } else {
                    this.handleData(data.latt, data.longt)
                }
            } catch (error) {
                toast.error("City not found. Please check spelling.");
            }
        }
  };
  render() {
      const {current, daily, hourly, location} = this.state
    return (
        <main>
            {!current && <div className="loader"></div>}
            {current &&
            <div>
                <div style={{ backgroundImage: `url(${weather(current.icon)})`}}  className="background"/>
            <section style={{color: `${textColor(current.icon.match(/d/)[0])}`}} className="content">
                <article style={{ backgroundImage: `url(${weather(current.icon)})`}} className="glass">
                    <article className="locations">
                         {this.state.alts && 
                            this.state.alts.map(current => {
                                return (
                                        <article onClick={
                                            () => {this.handleClick(current)}
                                        } key={current.prov} className="location">
                                            <p>{`${current.city},`}</p>
                                            <p>{`${current.prov}`}</p>
                                        </article>
                                )
                            })
                         }
                    </article>
                    <section id="top">
                        <article className="weather">
                            <Icon icon={current.icon} />
                            <p id="forcast">
                                {current.forcast}
                            </p>
                            <p id="city">
                                {location}
                            </p>
                            <p id="temp">
                            {`${Math.round(current.temp)}ºF`}
                            </p>
                        </article>
                    </section>
                    <section id='hourly'>
                            {hourly[0].data.map(current => {
                                return (
                                    <article key={current.dt} className="hour">
                                        <p className="time" >{time(current.dt)}</p>
                                        <p>{Math.round(current.temp)}ºF</p>
                                    </article>
                                )
                            })}
                        </section>
                    <section id="bottom">
                        <header>
                            <nav className="weather-nav">
                                <button onClick={() => this.handleToggle('weather')} style={this.style('weather')} id="details">Weather details</button>
                                <button onClick={() => this.handleToggle('forcast')} style={this.style('forcast')} id="daily">7-day Forcast</button>
                            </nav>
                        </header>
                        <article id="details">
                            {this.state.isActive === 'weather' &&
                                <ul>
                                    <li>Clouds<p>{current.clouds}%</p></li>
                                    <li>Humidity<p>{current.humidity}%</p></li>
                                    <li>Wind<p>{Math.round(current.wind.windSpeed)}mph {direction(56)}</p></li>
                                </ul>   
                            }
                            {
                                this.state.isActive === 'forcast' &&
                                <ul>
                                    {daily.map(current => {
                                        return (
                                           <li className="forcast-list" key={current.date}>
                                               <p>{day(new Date(current.date * 1000).getDay())}</p>
                                               <Icon icon={current.icon} />
                                               <p>H {Math.round(current.temp.max)} / L {Math.round(current.temp.min)}</p>
                                           </li>
                                        )            
                                    })}
                                </ul>
                            }
                        </article>
                    </section>
                </article>
                <div className="search">
                    <ToastContainer draggable={false} transition={Zoom} autoClose={6000} />
                    <form onSubmit={this.handleSubmit}>
                        <input onChange={this.handleChange} value={this.state.value} placeholder="City Search" type="text"/>
                    </form>
                </div>
            </section>
            </div>
            }
        </main>
    )
  }
}

export default home
