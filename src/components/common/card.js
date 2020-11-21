import React from "react";
import capitilize from "../../functions/capitilize";

const Card = (props) => {
  const { imgSrc, temp, date, data } = props;
  return (
    <div className="container bg-gradient-to-b from-blue-600 to-blue-100 rounded-2xl shadow-lg">
      <p className="select-none float-right cursor-default -my-6 mx-4 bg-yellow-300 px-3 py-2 rounded-2xl text-2xl text-yellow-900 tracking-wide">
        {date}
      </p>
      <div className="inline-flex items-center justify-center w-full">
        <img className="transform scale-150" src={imgSrc} alt="weather icon" />
        <p className="text-4xl text-gray-100 cursor-default select-none ml-10">
          {Math.round(temp)}°F
        </p>
      </div>
      <div className="flex flex-col overflow-hidden shadow-lg">
        {Object.keys(data).map((key) => {
          return (
            <div
              key={key}
              className="bg-clip-text text-transparent bg-gradient-to-t from-blue-800 to-blue-500 mb-3 transition duration-500 my-1 ease-in-out rounded py-3"
            >
              <p className=" text-3xl text-center cursor-default select-none">
                {capitilize(key)}:
                <span className="text-3xl mx-4">{data[key]}</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Card;
