"use client";
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
    // lottery: <LotteryPaymentStatus params={params} />,
  };
  return paymentStatusComponents[type as keyof typeof paymentStatusComponents];
};

export default PaymentStatusPage;
