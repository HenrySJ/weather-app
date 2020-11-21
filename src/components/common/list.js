import React from "react";

const List = ({ data }) => {
  return (
    <>
      {data.map((current) => {
        return (
          <div
            key={data.indexOf(current)}
            className="relative flex items-center rounded-xl shadow mb-10 bg-gradient-to-br from-blue-600 py-4 to-blue-200"
          >
            <p className="absolute bottom-0 right-0 -my-6 mx-4 select-none cursor-default bg-yellow-300 px-3 py-2 rounded-2xl text-2xl md:text-xl  text-yellow-900 tracking-wide">
              {current.date}
            </p>
            <img
              alt="current weather img"
              src={`http://openweathermap.org/img/wn/${current.icon}@2x.png`}
            />
            <p className="text-3xl md:text-2xl ml-5 md:ml-0  text-white select-none">
              {current.temp}°F
            </p>
            <p className="text-3xl md:text-2xl  ml-3 text-white select-none">
              {current.data.forecast}
            </p>
          </div>
        );
      })}
    </>
  );
};

export default List;
