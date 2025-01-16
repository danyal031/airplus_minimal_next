import React from "react";
import SearchBox from "./indexPageComponents/SearchBox";
import Services from "./indexPageComponents/Services";
import TabDescriptionsComponent from "./indexPageComponents/TabDescriptionsComponent";
import { getAirportsInServer } from "@/global-files/fetches";
import { AirportDataType } from "@/DataTypes/flight/flightTicket";

const HomeComponents = async () => {
  const airports: AirportDataType[] = await getAirportsInServer();

  return (
    <div className="container grid grid-cols-1 gap-14">
      <SearchBox airports={airports} />
      <Services />
      <TabDescriptionsComponent />
    </div>
  );
};

export default HomeComponents;
