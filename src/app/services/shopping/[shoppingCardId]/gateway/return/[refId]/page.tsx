"use client";
import AccommodationPaymentStatus from "@/components/FlightSection/paymentStatus/AccommodationPaymentStatus";
import FlightPaymentStatus from "@/components/FlightSection/paymentStatus/FlightPaymentStatus";
import React, { useEffect, useState } from "react";

export interface ShoppingCardPaymentStatusParamsType {
  params: {
    shoppingCardId: string;
    refId: string;
  };
}
const PaymentStatusPage = ({ params }: ShoppingCardPaymentStatusParamsType) => {
  const [type, setType] = useState<keyof typeof paymentStatusComponents | "">(
    ""
  );
  useEffect(() => {
    setType(
      JSON.parse(localStorage.getItem(params.shoppingCardId) as string).type
    );
  }, []);
  const paymentStatusComponents = {
    flight: <FlightPaymentStatus params={params} />,
    accommodation: <AccommodationPaymentStatus params={params} />,
    // lottery: <LotteryPaymentStatus params={params} />,
  };
  return (
    <div className="my-12 md:my-24 container">
      {paymentStatusComponents[type as keyof typeof paymentStatusComponents]}
    </div>
  );
};

export default PaymentStatusPage;
