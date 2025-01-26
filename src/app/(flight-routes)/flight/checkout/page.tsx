import CheckoutContainerContent from "@/components/FlightSection/checkout/CheckoutContainerContent";
import FlightTimeLineComponent from "@/components/FlightSection/checkout/FlightTimeLineComponent";
import React from "react";

const page = () => {
  return (
    <div className="container">
      <div className="fixed w-full left-1/2 -translate-x-1/2 container z-10">
        <FlightTimeLineComponent />
      </div>
      <div className="relative w-full py-24">
        <CheckoutContainerContent />{" "}
      </div>
    </div>
  );
};

export default page;
