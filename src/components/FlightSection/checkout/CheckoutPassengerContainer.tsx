"use client";
import { IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useRef } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { v4 as uuidv4 } from "uuid";
import { useGlobalContext } from "@/context/store";
import {
  defaultPassengerInformation,
  UserInformationDataType,
} from "@/DataTypes/globalTypes";
import PassengerInformation from "@/components/passengers-components/PassengerInformation";

const CheckoutPassengerContainer = () => {
  // initial states
  const { flightPassengers, setFlightPassengers } =
    useGlobalContext().flightContext.searchContext;
  const childRef = useRef<any>([]);

  // render header container
  const renderHeaderContainer = () => {
    return (
      <div className="border-b-2 border-main p-2 flex items-center justify-start">
        <div className="flex items-center justify-center gap-1">
          <span className="text-primary-main text-base font-semibold">
            اطلاعات مسافران
          </span>
        </div>
      </div>
    );
  };

  // render content container
  const renderContentContainer = () => {
    return (
      <>
        {flightPassengers.map((item, index) => (
          <>
            <PassengerInformation
              key={item.id}
              index={index}
              item={item}
              type="flight"
              passengers={flightPassengers}
              setPassengers={setFlightPassengers}
              ref={(el) => (childRef.current[index] = el)}
              handleOnChange={handleChangeUserInfo}
              handleRemovePassenger={handleRemovePassenger}
            />
          </>
        ))}
      </>
    );
  };

  // render footer container
  const renderFooterContainer = () => {
    return (
      <>
        {" "}
        <div className="p-2 flex items-center justify-start">
          <div className="flex items-center justify-center gap-0">
            <Tooltip title="افزودن مسافر">
              <IconButton
                onClick={() => {
                  handleAddPassenger();
                }}
              >
                <PersonAddIcon fontSize="small" className="text-text-main" />
              </IconButton>
            </Tooltip>
            <span className="text-text-main text-sm font-semibold">
              افزودن مسافر
            </span>
          </div>
        </div>
      </>
    );
  };

  // handle delete passenger
  const handleRemovePassenger = (item: UserInformationDataType) => {
    setFlightPassengers((pre) =>
      pre.filter((subItem) => subItem.id !== item.id)
    );
  };

  // for handle add passengers
  const handleAddPassenger = () => {
    const newPassenger: UserInformationDataType = {
      ...defaultPassengerInformation,
      id: uuidv4(),
    };
    setFlightPassengers((prev) => [...prev, newPassenger]);
  };
  useEffect(() => {
    if (flightPassengers.length === 0) {
      handleAddPassenger();
    }
  }, []);

  // handle onchange user information
  const handleChangeUserInfo = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    field: string
  ) => {
    const updatedUserInfo = flightPassengers.map((pass: any, i: number) => {
      if (pass.id === id) {
        return { ...pass, [field]: e.target.value };
      }
      return pass;
    });
    setFlightPassengers(updatedUserInfo);
  };

  return (
    <div className="bg-paper rounded-xl grid grid-cols-1 gap-0">
      {renderHeaderContainer()}
      {renderContentContainer()}
      {renderFooterContainer()}
    </div>
  );
};

export default CheckoutPassengerContainer;
