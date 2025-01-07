import React from "react";
import SearchBox from "./indexPageComponents/SearchBox";
import Services from "./indexPageComponents/Services";
import TabDescriptionsComponent from "./indexPageComponents/TabDescriptionsComponent";

const HomeComponents = () => {
  return (
    <div className="container grid grid-cols-1 gap-14">
      <SearchBox />
      <Services />
      <TabDescriptionsComponent />
    </div>
  );
};

export default HomeComponents;
