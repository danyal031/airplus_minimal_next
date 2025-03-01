import HomeComponents from "@/components/Home/HomeComponents";
import { AirportDataType } from "@/DataTypes/flight/flightTicket";
import { getAirportsInServer } from "@/global-files/fetches";
import React from "react";

const Home = async () => {
  const airports: AirportDataType[] = await getAirportsInServer();

  return <HomeComponents airports={airports} />;
};

export default Home;
