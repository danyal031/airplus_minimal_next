"use client";
import PassengerInformation from "@/components/passengers-components/PassengerInformation";
import { useGlobalContext } from "@/context/store";
import { AccommodationDataType } from "@/DataTypes/accommodation/accommodationTypes";
import {
  defaultPassengerInformation,
  UserInformationDataType,
} from "@/DataTypes/globalTypes";
import { Button } from "@mui/material";
import { debounce } from "lodash";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface LabelsDataTypes {
  item_idx: number;
  passenger_idx: number;
  age_category: "adult" | "child";
  idx?: number;
}

const CheckoutAccommodationContainer = () => {
  // initial states
  const { setAccommodationPassenger, accommodationPassenger } =
    useGlobalContext().accommodationContext.accommodationSearch;
  const [labels, setLabels] = useState<LabelsDataTypes[]>([]);
  const [onlineAccommodations, setOnlineAccommodations] = useState<
    AccommodationDataType[]
  >([]);
  const childRef = useRef<any>([]);
  const searchParams = useSearchParams();

  // handle initial accommodation passenger
  useEffect(() => {
    const factorId = searchParams.get("factor");
    const accommodations = JSON.parse(
      localStorage.getItem(factorId as string) as string
    ).data as AccommodationDataType[];
    setOnlineAccommodations(accommodations);
    const newPassengers: UserInformationDataType[] = accommodations.flatMap(
      (acc: any) => {
        const { adult = 0, child = 0 } = acc.room_type.passengers;
        const totalPassengers = adult + child;

        return Array.from({ length: totalPassengers }).map(() => ({
          ...defaultPassengerInformation,
          id: uuidv4(),
        }));
      }
    );

    setAccommodationPassenger(newPassengers);
    console.log(666, accommodations);

    console.log("🧍‍♂️ New passengers:", newPassengers);

    // handle labels
    const tempLabel: LabelsDataTypes[] = [];
    accommodations.forEach((item, index) => {
      for (let i = 0; i < item?.room_type?.passengers.adult; i++) {
        tempLabel.push({
          item_idx: index,
          passenger_idx: i,
          age_category: "adult",
        });
      }
      for (let i = 0; i < item?.room_type?.passengers.child; i++) {
        tempLabel.push({
          item_idx: index,
          passenger_idx: i,
          age_category: "child",
        });
      }
    });
    setLabels(tempLabel.map((i, idx) => ({ ...i, idx })));
  }, []);

  useEffect(() => {
    console.log("labels", labels);
  }, [labels]);

  // handle onchange user information
  const handleChangeUserInfo = debounce(
    (e: React.ChangeEvent<HTMLInputElement>, id: number, field: string) => {
      const updatedUserInfo = accommodationPassenger.map(
        (pass: any, i: number) => {
          if (pass.id === id) {
            return { ...pass, [field]: e.target.value };
          }
          return pass;
        }
      );
      setAccommodationPassenger(updatedUserInfo);
    },
    200
  );

  useEffect(() => {
    console.log("accommodationPassenger", accommodationPassenger);
  }, [accommodationPassenger]);

  // render header container
  const renderHeaderContainer = () => {
    return (
      <div className="md:border-b-2 border-main p-2 flex items-center justify-start">
        <div className="flex items-center justify-center gap-1">
          <span className="text-primary-main text-base font-semibold">
            اطلاعات مسافران
          </span>
        </div>
      </div>
    );
  };

  const renderPurchaseConfirmation = () => {
    const renderOnDesktop = (
      <div className="p-5 hidden md:flex items-center justify-between bg-paper rounded-xl">
        <span className="text-text-main text-sm font-semibold">
          با کلیک روی تایید و ادامه خرید با قوانین سایت و قوانین پرواز موافقت
          کرده‌اید.
        </span>
        <div className="flex items-center justify-center gap-3">
          <span className="text-base font-semibold text-text-main flex items-center justify-center">
            {/* { formatInputWithCommas(
                flightPassengersTickets.reduce(
                  ( acc: any, ticket: any ) => acc + ticket.sell,
                  0
                ) / 10
              ) }
              <Toman height={ 14 } width={ 14 } className="text-text-main" /> */}
            ........
          </span>
          <Button
            // onClick={ handleSendFlightData }
            variant="contained"
            color="primary"
            size="medium"
            className="rounded-xl px-4"
          >
            تایید و ادامه خرید
          </Button>
        </div>
      </div>
    );

    return (
      <>
        <div className="px-4 md:px-0">{renderOnDesktop}</div>
        {/* { renderOnMobile } */}
      </>
    );
  };

  // render passenger list
  const renderPassengerList = () => {
    return (
      <>
        {accommodationPassenger.map(
          (item: UserInformationDataType, index: number) => (
            <PassengerInformation
              key={item.id}
              item={item}
              type="accommodation"
              passengers={accommodationPassenger}
              setPassengers={setAccommodationPassenger}
              ref={(el) => (childRef.current[index] = el)}
              index={index}
              handleOnChange={handleChangeUserInfo}
              labels={labels}
              online={onlineAccommodations}
            />
          )
        )}
      </>
    );
  };

  return (
    <div className="grid grid-cols-1 gap-5">
      <div className="px-4 md:px-0">
        <div className="bg-paper rounded-xl grid grid-cols-1 gap-0">
          {renderHeaderContainer()}
          {renderPassengerList()}
        </div>
      </div>
      {renderPurchaseConfirmation()}
    </div>
  );
};

export default CheckoutAccommodationContainer;
