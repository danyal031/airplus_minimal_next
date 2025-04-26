import AccommodationListContainer from "@/components/AccommodationSection/accommodation/listing/AccommodationListContainer";
import React from "react";

export interface SearchParamsTypes {
  destination: string;
  departing: string;
  returning: string;
  adultCapacity: string;
  childCapacity: string;
}

const page = (searchParams: SearchParamsTypes) => {
  return (
    <>
      <AccommodationListContainer searchParams={searchParams} />{" "}
    </>
  );
};

export default page;
