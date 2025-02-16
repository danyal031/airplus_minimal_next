import React from "react";
import SelectedFlightTicketsCards from "./SelectedFlightTicketsCards";
import CheckoutPassengerContainer from "./CheckoutPassengerContainer";
import { Button } from "@mui/material";
import { useGlobalContext } from "@/context/store";
import {
  calculateAgeCategory,
  formatInputWithCommas,
} from "@/global-files/function";
import { v4 as uuidv4 } from "uuid";
import { handleStoreFlightJson, lockFlight } from "@/global-files/axioses";
import { useShowAlert } from "@/hooks/useShowAlert";
import { useRouter } from "next/navigation";

const CheckoutContainerContent = () => {
  return (
    <div className="grid grid-cols-1 gap-5">
      <SelectedFlightTicketsCards />
      <CheckoutPassengerContainer />
    </div>
  );
};

export default CheckoutContainerContent;
