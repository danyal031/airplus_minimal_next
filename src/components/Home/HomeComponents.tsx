import React from "react";
import SearchBox from "./indexPageComponents/SearchBox";
import Services from "./indexPageComponents/Services";
import TabDescriptionsComponent from "./indexPageComponents/TabDescriptionsComponent";
import { getAirportsInServer } from "@/global-files/fetches";
import { AirportDataType } from "@/DataTypes/flight/flightTicket";

const HomeComponents = async () => {
  const airports: AirportDataType[] = await getAirportsInServer();

  const renderOnDesktop = () => {
    return (
      <>
        <div className="container hidden md:grid grid-cols-1 gap-14 py-24">
          <SearchBox airports={airports} />
          <Services />
          <TabDescriptionsComponent />
        </div>
      </>
    );
  };
  const renderOnMobile = () => {
    return (
      <>
        <div className="md:hidden grid grid-cols-1 gap-14 p-4">
          <SearchBox airports={airports} />
          <Services />
          <TabDescriptionsComponent />
        </div>
      </>
    );
  };
  return (
    <>
      {renderOnDesktop()}
      {renderOnMobile()}
    </>
  );
};

export default HomeComponents;
