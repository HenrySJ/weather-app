import React from "react";

const Option = ({ options }) => {
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
            key={current.latt}
            className="flex content-center justify-center rounded-lg bg-green-300 w-40 mr-6 px-3 py-4"
          >
            <p className="flex">
              <span>{current.city.toUpperCase()},</span> {current.prov}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Option;
