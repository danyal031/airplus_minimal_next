"use client";
import { Suspense } from "react";
import AccommodationListContainer from "./AccommodationListContainer";

const AccommodationPageContainer = () => {
  return (
    <>
      <Suspense>
        <AccommodationListContainer />
      </Suspense>
    </>
  );
};

export default AccommodationPageContainer;
