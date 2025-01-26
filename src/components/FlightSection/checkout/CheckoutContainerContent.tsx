"use client";
import React, { Suspense } from "react";
import SelectedFlightTicketsCards from "./SelectedFlightTicketsCards";
import CheckoutPassengerContainer from "./CheckoutPassengerContainer";

const CheckoutContainerContent = () => {
  const renderPurchaseConfirmation = () => {
    return (
      <>
        <div className="p-2"></div>
      </>
    );
  };
  return (
    <div className="grid grid-cols-1 gap-5">
      <Suspense>
        <SelectedFlightTicketsCards />
      </Suspense>
      <CheckoutPassengerContainer />
    </div>
  );
};

export default CheckoutContainerContent;
