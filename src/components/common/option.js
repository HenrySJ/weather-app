import React from "react";

const Option = ({ options, handleClick }) => {
  return (
    <div
      className={
        options.length < 6
          ? "flex justify-around mt-6"
          : "flex overflow-x-auto mt-6"
      }
    >
      {options.map((current) => {
        return (
          <div
            onClick={() => handleClick(current)}
            key={current.latt}
            className="flex content-center justify-center rounded-lg  hover:bg-blue-600 hover:shadow-2xl  text-gray-200 text-lg bg-indigo-500 w-40 mb-4 mr-6 px-3 py-4"
          >
            <p className="flex">
              <span className="mr-1">{current.city.toUpperCase()},</span>
              {current.prov}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Option;
