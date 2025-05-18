"use client";
import { Suspense } from "react";
import AccommodationListContainer from "./AccommodationListContainer";

const AccommodationPageContainer = () => {
  return (
    <>
      <Suspense>
        <AccommodationListContainer action="accommodation" />
      </Suspense>
    </>
  );
};

export default AccommodationPageContainer;
