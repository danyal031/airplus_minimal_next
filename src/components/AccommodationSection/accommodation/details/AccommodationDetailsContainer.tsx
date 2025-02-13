import React from "react";

const AccommodationDetailsContainer = () => {
  return (
    <>
      {/* for desktop */}
      <div className="hidden md:block">
        <AccommodationDetailsOnDesktop />
      </div>
      {/* for mobile */}
      <div className="md:hidden">
        <AccommodationDetailsOnMobile />
      </div>
    </>
  );
};

export default AccommodationDetailsContainer;

// for desktop
const AccommodationDetailsOnDesktop = () => {
  return (
    <>
      {" "}
      <div className="container py-24 bg-rose-500 grid grid-cols-12 gap-4">
        <div className="col-span-3 bg-yellow-700">filters</div>
        <div className="col-span-9 bg-purple-700">accommodation</div>
      </div>
    </>
  );
};

// for mobile
const AccommodationDetailsOnMobile = () => {
  return <></>;
};
