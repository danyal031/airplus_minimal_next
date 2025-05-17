"use client";
import { useGlobalContext } from "@/context/store";
import { AccommodationDataType } from "@/DataTypes/accommodation/accommodationTypes";
import {
  defaultPassengerInformation,
  UserInformationDataType,
} from "@/DataTypes/globalTypes";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const CheckoutAccommodationContainer = () => {
  // initial states
  const { setAccommodationPassenger, accommodationPassenger } =
    useGlobalContext().accommodationContext.accommodationSearch;
  const searchParams = useSearchParams();
  // handle initial accommodation passenger
  useEffect(() => {
    const newPassenger: UserInformationDataType = {
      ...defaultPassengerInformation,
      id: uuidv4(),
    };

    const factorId = searchParams.get("factor");
    const accommodations = JSON.parse(
      localStorage.getItem(factorId as string) as string
    ).data as AccommodationDataType[];
  }, []);

  return <div className="bg-rose-600">CheckoutAccommodationContainer</div>;
};

export default CheckoutAccommodationContainer;
