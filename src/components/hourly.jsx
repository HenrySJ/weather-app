import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { time } from "../functions/dateTime";

class Hourly extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paginatedData: {
        labels: [],
        datasets: [
          {
            label: "Temperature",
            fill: false,
            lineTension: 0.5,
            backgroundColor: "#ed8936",
            borderColor: "#ed8936",
            borderWidth: 1,
            data: [],
          },
        ],
      },
      pageSize: 5,
      pages: [],
      page: 1,
    };
  }
  componentDidMount() {
    const state = { ...this.state };
    const numberOfPages = Math.ceil(this.props.data.length / state.pageSize);
    for (let i = 1; i <= numberOfPages; i++) {
      state.pages.push(i);
    }
    state.paginatedData.labels = this.props.data.data
      .map((current) => {
        return `${time(current.dt)}`;
      })
      .slice(0, state.pageSize);

    state.paginatedData.datasets[0].data = this.props.data.data
      .map((current) => {
        return current.temp;
      })
      .slice(0, state.pageSize);
    this.setState(state);
  }

  paginate = (state) => {
    const copy = { ...state };
    const lastIndex = copy.pageSize * copy.page;
    const startIndex = lastIndex - copy.pageSize;

    copy.paginatedData.labels = this.props.data.data
      .map((current) => {
        return time(current.dt);
      })
      .slice(startIndex, lastIndex);

    copy.paginatedData.datasets[0].data = this.props.data.data
      .map((current) => {
        return current.temp;
      })
      .slice(startIndex, lastIndex);
    return copy;
  };

  handleClick = (value) => {
    const state = { ...this.state };
    state.page += value;
    const newState = this.paginate(state);
    this.setState(newState);
  };

  render() {
    return (
      <div className="">
        <p className="bg-yellow-300 py-1 px-3 text-2xl lg:py-4  text-yellow-900 rounded-2xl text-center tracking-widest mb-4">
          Hourly Forecast
        </p>
        <Line data={this.state.paginatedData} />
        <div className="float-right my-16">
          <i
            onClick={() => {
              if (this.state.page === 1) {
                return;
              } else {
                this.handleClick(-1);
              }
            }}
            className={
              this.state.page === 1
                ? "fas fa-angle-left fa-3x mx-8 bg-yellow-300 py-1 px-5 rounded text-yellow-900 cursor-not-allowed"
                : "fas fa-angle-left fa-3x mx-8 bg-yellow-300 hover:bg-yellow-400 active:bg-yellow-900 py-1 px-5 rounded text-yellow-900"
            }
          ></i>
          <i
            onClick={() => {
              if (this.state.page === this.state.pages.length) {
                return;
              } else {
                this.handleClick(1);
              }
            }}
            className={
              this.state.page === this.state.pages.length
                ? "fas fa-angle-right fa-3x mx-8 bg-yellow-300 py-1 px-5 rounded text-yellow-900 cursor-not-allowed"
                : "fas fa-angle-right fa-3x mx-8 bg-yellow-300 hover:bg-yellow-400 active:bg-yellow-900  py-1 px-5 rounded text-yellow-900"
            }
          ></i>
        </div>
      </div>
    );
  }
}

export default Hourly;
