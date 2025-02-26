import React from "react";
import SearchBox from "./indexPageComponents/SearchBox";
import Services from "./indexPageComponents/Services";
import TabDescriptionsComponent from "./indexPageComponents/TabDescriptionsComponent";
import { getAirportsInServer } from "@/global-files/fetches";
import { AirportDataType } from "@/DataTypes/flight/flightTicket";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
const HomeComponents = async () => {
  const airports: AirportDataType[] = await getAirportsInServer();

  const renderOnDesktop = () => {
    return (
      <>
        <div className="container hidden md:block py-24">
          <div className="relative grid grid-cols-1 gap-14">
            {/* <div className="z-10 sticky top-[760px] -ml-24 flex flex-col items-center justify-center gap-2 justify-self-end">
              <span className="bg-paper h-12 w-12 rounded-full shadow-md shadow-primary-main flex items-center justify-center">
                H
              </span>
              <span className="bg-primary-main h-12 w-12 rounded-full flex items-center justify-center">
                <HeadsetMicIcon fontSize="small" className="text-paper" />
              </span>
            </div> */}

            <SearchBox airports={airports} />
            <Services />
            <TabDescriptionsComponent />
          </div>
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
