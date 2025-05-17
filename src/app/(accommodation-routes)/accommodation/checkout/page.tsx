import CheckoutAccommodationContainer from "@/components/AccommodationSection/accommodation/checkout/CheckoutAccommodationContainer";
import React from "react";

const page = () => {
  const renderOnDesktop = () => {
    return (
      <>
        <div className="hidden md:grid grid-cols-12 gap-5">
          <div className="col-span-8">
            <CheckoutAccommodationContainer />
          </div>
          <div className="col-span-4 flex items-center justify-center">
            <span className="text-text-main font-semibold text-base">
              به زودی...
            </span>
            {/* <ReservationDetails /> */}
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="mx-4 lg:mx-auto lg:container md:my-16 my-6 ">
      {renderOnDesktop()}
      {/* {renderOnMobile()} */}
    </div>
  );
};

export default page;
