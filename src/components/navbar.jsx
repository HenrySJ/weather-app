import React, { Component } from "react";
import capitilize from "../functions/capitilize";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", isOpen: false };
    this.handleSubmit = props.handleSubmit;
  }

  handleClick = (event) => {
    event.preventDefault();
    const state = { ...this.state };
    state.isOpen = !state.isOpen;
    this.setState(state);
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
    console.log(this.state.value);
  };

  submit = (e) => {
    e.preventDefault();

    const state = { ...this.state };
    this.handleSubmit(capitilize(state.value));
    state.value = "";
    this.setState(state);
  };

  render() {
    return (
      <header className="bg-gray-900 sm:flex sm:justify-between sm:px-10 sm:py-3 sm:items-center ">
        <div className="flex items-center justify-between px-10 py-3 sm:p-0">
          <div className="flex items-center">
            <i className="fas fa-bolt fa-3x text-yellow-500 mr-5"></i>
            <h1 className="text-gray-300 text-3xl font-semibold tracking-wide">
              jWeather
            </h1>
          </div>
          <div className="sm:hidden">
            <button
              onClick={this.handleClick}
              type="button"
              className="text-gray-500 hover:text-white focus:outline-none focus:shadow-outline rounded"
            >
              <i
                className={
                  this.state.isOpen
                    ? "far fa-times-circle fa-3x"
                    : "fas fa-bars fa-3x"
                }
              ></i>
            </button>
          </div>
        </div>
        <div
          className={
            this.state.isOpen
              ? "flex justify-center py-5 sm:block"
              : "hidden sm:block"
          }
        >
          <form onSubmit={this.submit}>
            <label className="text-gray-200 text-2xl">
              Search another City:
              <input
                onChange={this.handleChange}
                className="placeholder-gray-500 focus:placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline rounded ml-2"
                type="text"
                value={this.state.value}
              />
            </label>
          </form>
        </div>
      </header>
    );
  }
}

export default Navbar;
