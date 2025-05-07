"use client";
import { Button, IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { v4 as uuidv4 } from "uuid";
import { useGlobalContext } from "@/context/store";
import {
  defaultPassengerInformation,
  UserInformationDataType,
} from "@/DataTypes/globalTypes";
import PassengerInformation from "@/components/passengers-components/PassengerInformation";
import {
  applyMask,
  calculateAgeCategory,
  convertPersianToEnglishNumbers,
  formatInputWithCommas,
} from "@/global-files/function";
import { useRouter } from "next/navigation";
import { useShowAlert } from "@/hooks/useShowAlert";
import { handleStoreFlightJson, lockFlight } from "@/global-files/axioses";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Route } from "next";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { debounce } from "lodash";
import { Toman } from "@/components/icons/IconToman";
const CheckoutPassengerContainer = () => {
  // initial states
  const {
    flightPassengers,
    setFlightPassengers,
    flightPassengersTickets,
    setFlightPassengersTickets,
    selectedWentFlight,
    selectedReturnFlight,
    setSelectedReturnFlight,
    setSelectedWentFlight,
    toDate,
    fromDate,
  } = useGlobalContext().flightContext.searchContext;
  const { userData } = useGlobalContext().userContext;
  const { handleAlertDetails } = useShowAlert();
  const { setShowProgress, config } = useGlobalContext().global;
  const { setOpenLoginDialog } = useGlobalContext().loginContext;
  const [openPaymentDetails, setOpenPaymentDetails] = useState<boolean>(false);
  const router = useRouter();
  const childRef = useRef<any>([]);

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

  // render content container
  const renderContentContainer = () => {
    return (
      <>
        {flightPassengers.map((item, index) => (
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
        ))}
      </>
    );
  };

  // render footer container
  const renderFooterContainer = () => {
    return (
      <>
        <div className="p-2 flex items-center justify-start">
          <div className="flex items-center justify-center gap-0">
            <Tooltip title="افزودن مسافر">
              <IconButton
                onClick={() => {
                  const wentCapacity =
                    selectedWentFlight?.Classes?.AvailableSeat;
                  const returnCapacity =
                    selectedReturnFlight?.Classes?.AvailableSeat;
                  console.log("capacity", wentCapacity, returnCapacity);

                  const isRoundTrip = selectedReturnFlight ? true : false;
                  const maxPassengers = isRoundTrip
                    ? Math.min(wentCapacity ?? 0, returnCapacity ?? 0)
                    : wentCapacity ?? 0;
                  if (flightPassengers.length >= maxPassengers) {
                    handleAlertDetails(
                      "ظرفیت پر شده است و امکان افزودن مسافر جدید وجود ندارد.",
                      "warning"
                    );
                    return;
                  }

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

  const renderPurchaseConfirmation = () => {
    // went
    const adultsWentTicketsPrice =
      selectedWentFlight && selectedWentFlight.Classes
        ? (flightPassengers.filter(
            (element) =>
              calculateAgeCategory(
                applyMask("date", element.birthday?.toString() as string)
              ) === "ADU"
          ).length *
            (selectedWentFlight.Classes.BaseData.Financial.Adult.Markup.final ??
              0)) /
          10
        : 0;
    const childWentTicketsPrice =
      selectedWentFlight && selectedWentFlight.Classes
        ? (flightPassengers.filter(
            (element) =>
              calculateAgeCategory(
                applyMask("date", element.birthday?.toString() as string)
              ) === "CHI"
          ).length *
            (selectedWentFlight.Classes.BaseData.Financial.Child.Markup.final ??
              0)) /
          10
        : 0;
    const infantWentTicketsPrice =
      selectedWentFlight && selectedWentFlight.Classes
        ? (flightPassengers.filter(
            (element) =>
              calculateAgeCategory(
                applyMask("date", element.birthday?.toString() as string)
              ) === "INF"
          ).length *
            (selectedWentFlight.Classes.BaseData.Financial.Infant.Markup
              .final ?? 0)) /
          10
        : 0;

    // return
    const adultsReturnTicketsPrice =
      selectedReturnFlight && selectedReturnFlight.Classes
        ? (flightPassengers.filter(
            (element) =>
              calculateAgeCategory(
                applyMask("date", element.birthday?.toString() as string)
              ) === "ADU"
          ).length *
            (selectedReturnFlight.Classes.BaseData.Financial.Adult.Markup
              .final ?? 0)) /
          10
        : 0;
    const childReturnTicketsPrice =
      selectedReturnFlight && selectedReturnFlight.Classes
        ? (flightPassengers.filter(
            (element) =>
              calculateAgeCategory(
                applyMask("date", element.birthday?.toString() as string)
              ) === "CHI"
          ).length *
            (selectedReturnFlight.Classes.BaseData.Financial.Child.Markup
              .final ?? 0)) /
          10
        : 0;
    const infantReturnTicketsPrice =
      selectedReturnFlight && selectedReturnFlight.Classes
        ? (flightPassengers.filter(
            (element) =>
              calculateAgeCategory(
                applyMask("date", element.birthday?.toString() as string)
              ) === "INF"
          ).length *
            (selectedReturnFlight.Classes.BaseData.Financial.Infant.Markup
              .final ?? 0)) /
          10
        : 0;

    const renderOnDesktop = (
      <>
        <div className="p-5 hidden md:flex items-center justify-between bg-paper rounded-xl">
          <span className="text-text-main text-sm font-semibold">
            با کلیک روی تایید و ادامه خرید با قوانین سایت و قوانین پرواز موافقت
            کرده‌اید.
          </span>
          <div className="flex items-center justify-center gap-3">
            <span className="text-base font-semibold text-text-main flex items-center justify-center">
              {formatInputWithCommas(
                flightPassengersTickets.reduce(
                  (acc: any, ticket: any) => acc + ticket.sell,
                  0
                ) / 10
              )}
              <Toman height={14} width={14} className="text-text-main" />
            </span>
            <Button
              onClick={handleSendFlightData}
              variant="contained"
              color="primary"
              size="medium"
              className="rounded-xl px-4"
            >
              تایید و ادامه خرید
            </Button>
          </div>
        </div>
      </>
    );
    const renderOnMobile = (
      <>
        <div className="md:hidden p-4 fixed bottom-0 w-full z-10 grid grid-cols-1 gap-3 bg-paper">
          <p className="text-text-main text-xs">
            با کلیک روی تایید و ادامه خرید با قوانین سایت و قوانین پرواز موافقت
            کرده‌اید.
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-1">
              <span className="text-text-main text-sm font-semibold">
                مجموع قیمت
              </span>
              <IconButton size="small" onClick={togglePaymentDetails}>
                {openPaymentDetails ? (
                  <KeyboardArrowUpIcon
                    fontSize="small"
                    className="text-text-main"
                  />
                ) : (
                  <KeyboardArrowDownIcon
                    fontSize="small"
                    className="text-text-main"
                  />
                )}
              </IconButton>
            </div>
            <span className="text-primary-main text-sm font-semibold flex items-center justify-center">
              {formatInputWithCommas(
                flightPassengersTickets.reduce(
                  (acc: any, ticket: any) => acc + ticket.sell,
                  0
                ) / 10
              )}{" "}
              <Toman height={14} width={14} className="text-primary-main" />
            </span>
          </div>
          {openPaymentDetails && (
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center justify-center gap-1">
                <span className="text-xs text-text-main font-semibold">
                  پرواز {selectedWentFlight?.Origin.Iata.title_fa} به{" "}
                  {selectedWentFlight?.Destination.Iata.title_fa}
                </span>
                <div className="h-px bg-divider flex-1"></div>
                <span className="text-primary-main text-xs flex items-center justify-center">
                  {formatInputWithCommas(
                    adultsWentTicketsPrice +
                      childWentTicketsPrice +
                      infantWentTicketsPrice
                  )}
                  <Toman height={14} width={14} className="text-primary-main" />
                </span>
              </div>
              {flightPassengers.find(
                (item) =>
                  calculateAgeCategory(
                    applyMask("date", item.birthday?.toString() as string)
                  ) === "ADU"
              ) && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-semibold">
                    {
                      flightPassengers.filter(
                        (element) =>
                          calculateAgeCategory(
                            applyMask(
                              "date",
                              element.birthday?.toString() as string
                            )
                          ) === "ADU"
                      ).length
                    }{" "}
                    بزرگسال
                  </span>
                  <span className="text-primary-main text-xs flex items-center justify-centers">
                    {formatInputWithCommas(adultsWentTicketsPrice)}{" "}
                    <Toman
                      height={14}
                      width={14}
                      className="text-primary-main"
                    />
                  </span>
                </div>
              )}{" "}
              {flightPassengers.find(
                (item) =>
                  calculateAgeCategory(
                    applyMask("date", item.birthday?.toString() as string)
                  ) === "CHI"
              ) && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-semibold">
                    {
                      flightPassengers.filter(
                        (element) =>
                          calculateAgeCategory(
                            applyMask(
                              "date",
                              element.birthday?.toString() as string
                            )
                          ) === "CHI"
                      ).length
                    }{" "}
                    کودک
                  </span>
                  <span className="text-primary-main text-xs flex items-center justify-center">
                    {formatInputWithCommas(childWentTicketsPrice)}
                    <Toman
                      height={14}
                      width={14}
                      className="text-primary-main"
                    />
                  </span>
                </div>
              )}
              {flightPassengers.find(
                (item) =>
                  calculateAgeCategory(
                    applyMask("date", item.birthday?.toString() as string)
                  ) === "INF"
              ) && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-semibold">
                    {
                      flightPassengers.filter(
                        (element) =>
                          calculateAgeCategory(
                            applyMask(
                              "date",
                              element.birthday?.toString() as string
                            )
                          ) === "INF"
                      ).length
                    }{" "}
                    نوزاد
                  </span>
                  <span className="text-primary-main text-xs flex items-center justify-center">
                    {formatInputWithCommas(infantWentTicketsPrice)}
                    <Toman
                      height={14}
                      width={14}
                      className="text-primary-main"
                    />
                  </span>
                </div>
              )}
              {selectedReturnFlight &&
                !Array.isArray(selectedReturnFlight.Classes) && (
                  <>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-xs text-text-main font-semibold">
                        پرواز {selectedReturnFlight.Origin.Iata.title_fa} به{" "}
                        {selectedReturnFlight.Destination.Iata.title_fa}
                      </span>
                      <div className="h-px bg-divider flex-1"></div>
                      <span className="text-primary-main text-xs">
                        {formatInputWithCommas(
                          adultsReturnTicketsPrice +
                            childReturnTicketsPrice +
                            infantReturnTicketsPrice
                        )}
                      </span>
                    </div>
                    {flightPassengers.find(
                      (item) =>
                        calculateAgeCategory(
                          applyMask("date", item.birthday?.toString() as string)
                        ) === "ADU"
                    ) && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-semibold">
                          {
                            flightPassengers.filter(
                              (element) =>
                                calculateAgeCategory(
                                  applyMask(
                                    "date",
                                    element.birthday?.toString() as string
                                  )
                                ) === "ADU"
                            ).length
                          }{" "}
                          بزرگسال
                        </span>
                        <span className="text-primary-main text-xs flex items-center justify-center">
                          {formatInputWithCommas(adultsReturnTicketsPrice)}
                          <Toman
                            height={14}
                            width={14}
                            className="text-primary-main"
                          />
                        </span>
                      </div>
                    )}
                    {flightPassengers.find(
                      (item) =>
                        calculateAgeCategory(
                          applyMask("date", item.birthday?.toString() as string)
                        ) === "CHI"
                    ) && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-semibold">
                          {
                            flightPassengers.filter(
                              (element) =>
                                calculateAgeCategory(
                                  applyMask(
                                    "date",
                                    element.birthday?.toString() as string
                                  )
                                ) === "CHI"
                            ).length
                          }{" "}
                          کودک
                        </span>
                        <span className="text-primary-main text-xs flex items-center justify-center">
                          {formatInputWithCommas(childReturnTicketsPrice)}
                          <Toman
                            height={14}
                            width={14}
                            className="text-primary-main"
                          />
                        </span>
                      </div>
                    )}
                    {flightPassengers.find(
                      (item) =>
                        calculateAgeCategory(
                          applyMask("date", item.birthday?.toString() as string)
                        ) === "INF"
                    ) && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-semibold">
                          {
                            flightPassengers.filter(
                              (element) =>
                                calculateAgeCategory(
                                  applyMask(
                                    "date",
                                    element.birthday?.toString() as string
                                  )
                                ) === "INF"
                            ).length
                          }{" "}
                          نوزاد
                        </span>
                        <span className="text-primary-main text-xs flex items-center justify-center">
                          {formatInputWithCommas(infantReturnTicketsPrice)}{" "}
                          <Toman
                            height={14}
                            width={14}
                            className="text-primary-main"
                          />
                        </span>
                      </div>
                    )}{" "}
                  </>
                )}
            </div>
          )}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outlined"
              size="medium"
              color="primary"
              className="rounded-lg"
              onClick={handleBackToSearchPage}
            >
              بازگشت
            </Button>
            <Button
              onClick={handleSendFlightData}
              className="rounded-lg"
              variant="contained"
              size="medium"
              color="primary"
            >
              تایید و ادامه{" "}
            </Button>
          </div>
        </div>
      </>
    );
    return (
      <>
        <div className="px-4 md:px-0">{renderOnDesktop}</div>
        {renderOnMobile}
      </>
    );
  };

  // handle toggle payment details
  const togglePaymentDetails = () => {
    setOpenPaymentDetails(!openPaymentDetails);
  };

  // handle move to search flight page
  const handleBackToSearchPage = () => {
    setSelectedReturnFlight(null);
    setSelectedWentFlight(null);
    const originIata = selectedWentFlight?.Origin.Iata.iata;
    const destinationIata = selectedWentFlight?.Destination.Iata.iata;
    const departureDate = fromDate as string;
    const returnDate = toDate as string;

    router.push(
      `/listing/flights?origin=${originIata}&destination=${destinationIata}&departure_date=${convertPersianToEnglishNumbers(
        departureDate
      )}&returning_date=${
        returnDate
          ? convertPersianToEnglishNumbers(returnDate as string)
          : false
      }` as Route
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

  useEffect(() => {
    console.log("flightPassengers", flightPassengers);
  }, [flightPassengers]);

  // handle onchange user information
  const handleChangeUserInfo = debounce(
    (e: React.ChangeEvent<HTMLInputElement>, id: number, field: string) => {
      const updatedUserInfo = flightPassengers.map((pass: any, i: number) => {
        if (pass.id === id) {
          return { ...pass, [field]: e.target.value };
        }
        return pass;
      });
      setFlightPassengers(updatedUserInfo);
    },
    200
  );

  // handle add flight Passengers Tickets
  useEffect(() => {
    const objectTicket = flightPassengers.flatMap(
      (passenger: UserInformationDataType) => {
        let tickets: any[] = [];

        if (selectedWentFlight && !Array.isArray(selectedWentFlight.Classes)) {
          tickets = [
            ...tickets,
            {
              action: "online",
              id: uuidv4(),
              passenger: passenger,
              online: {
                ...selectedWentFlight,
                type: "aircraft",
              },
              sell:
                calculateAgeCategory(
                  applyMask("date", passenger.birthday as string)
                ) === "INF"
                  ? selectedWentFlight.Classes.BaseData.Financial.Infant.Markup
                      .final
                  : calculateAgeCategory(
                      applyMask("date", passenger.birthday as string)
                    ) === "CHI"
                  ? selectedWentFlight.Classes.BaseData.Financial.Child.Markup
                      .final
                  : selectedWentFlight.Classes.BaseData.Financial.Adult.Markup
                      .final,
              buy:
                calculateAgeCategory(
                  applyMask("date", passenger.birthday as string)
                ) === "INF"
                  ? selectedWentFlight.Classes.BaseData.Financial.Infant.Payable
                  : calculateAgeCategory(
                      applyMask("date", passenger.birthday as string)
                    ) === "CHI"
                  ? selectedWentFlight.Classes.BaseData.Financial.Child.Payable
                  : selectedWentFlight.Classes.BaseData.Financial.Adult.Payable,
              validated: true,
              has_credit: true,
              provider: "",
              deadline: "",
              serial: "",
              pay_deadline: false,
              currency: { unit: null, exchange: null, amount: null },
            },
          ];
        }

        if (
          selectedReturnFlight &&
          !Array.isArray(selectedReturnFlight.Classes)
        ) {
          tickets = [
            ...tickets,
            {
              action: "online",
              id: uuidv4(),
              passenger: passenger,
              online: {
                ...selectedReturnFlight,
                type: "aircraft",
              },
              sell:
                calculateAgeCategory(
                  applyMask("date", passenger.birthday as string)
                ) === "INF"
                  ? selectedReturnFlight.Classes.BaseData.Financial.Infant
                      .Markup.final
                  : calculateAgeCategory(
                      applyMask("date", passenger.birthday as string)
                    ) === "CHI"
                  ? selectedReturnFlight.Classes.BaseData.Financial.Child.Markup
                      .final
                  : selectedReturnFlight.Classes.BaseData.Financial.Adult.Markup
                      .final,
              buy:
                calculateAgeCategory(
                  applyMask("date", passenger.birthday as string)
                ) === "INF"
                  ? selectedReturnFlight.Classes.BaseData.Financial.Infant
                      .Payable
                  : calculateAgeCategory(
                      applyMask("date", passenger.birthday as string)
                    ) === "CHI"
                  ? selectedReturnFlight.Classes.BaseData.Financial.Child
                      .Payable
                  : selectedReturnFlight.Classes.BaseData.Financial.Adult
                      .Payable,
              validated: true,
              has_credit: true,
              provider: "",
              deadline: "",
              serial: "",
              pay_deadline: false,
              currency: { unit: null, exchange: null, amount: null },
            },
          ];
        }

        return tickets;
      }
    );
    setFlightPassengersTickets(objectTicket);
  }, [flightPassengers, selectedWentFlight, selectedReturnFlight]);

  // handle ready send json for pay
  const handleSendFlightData = () => {
    if (userData === null) {
      setOpenLoginDialog(true);
    } else {
      const id = uuidv4();
      const jsonData: any = {
        print: 1,
        income_id: 17,
        internal: true,
        notices: true,
        requests: {
          pay: {
            amount: parseInt(
              flightPassengersTickets
                .reduce((acc: any, ticket: any) => acc + ticket.sell, 0)
                .toString()
            ),
            return: `${config?.communicational.site}/services/shopping/` + id,
          },
        },
        sum_sell_price: parseInt(
          flightPassengersTickets
            .reduce((acc: any, ticket: any) => acc + ticket.sell, 0)
            .toString()
        ),
        sum_buy_price: parseInt(
          flightPassengersTickets
            .reduce((acc: any, ticket: any) => acc + ticket.buy, 0)
            .toString()
        ),
      };
      jsonData["passengers"] = flightPassengers;
      jsonData["data"] = flightPassengersTickets;
      //
      let allValid = true;
      childRef.current.forEach((child: any) => {
        if (child) {
          child.handleTrigger(); // اجرا کردن trigger
          if (!child.getIsValid()) {
            allValid = false;
          }
        }
      });
      //
      if (allValid) {
        setShowProgress(true);
        lockFlight({
          data: jsonData.data.map((element: any) => {
            const passengerType = element.passenger.birthday;
            const passengers = {
              Adult: 0,
              Child: 0,
              Infant: 0,
            };
            if (calculateAgeCategory(passengerType) === "ADU") {
              passengers.Adult += 1;
            } else if (calculateAgeCategory(passengerType) === "CHI") {
              passengers.Child += 1;
            } else if (calculateAgeCategory(passengerType) === "INF") {
              passengers.Infant += 1;
            }
            return {
              ...element.online,
              Classes: {
                ...element.online.Classes,
                Passengers: passengers,
              },
            };
          }),
        })
          .then((lockRes: any) => {
            console.log(lockRes.status);
            if (lockRes.status) {
              jsonData.data = jsonData.data.map((element: any) => {
                return {
                  ...element,
                  online: {
                    ...element.online,
                    Lock: lockRes,
                  },
                };
              });
              handleStoreFlightJson(jsonData)
                .then((res: any) => {
                  // setShowProgress(false);

                  jsonData["type"] = "flight";

                  localStorage.setItem(id, JSON.stringify(jsonData));
                  router.replace(res.payload.payment_link);

                  // handleAlertDetails(res.message, "error");
                })
                .catch((err) => {
                  setShowProgress(false);
                });

              console.log(true);
            }
          })
          .catch((err) => {
            handleAlertDetails(err.response.data.error.message, "error");
          });

        console.log("تمام فیلدها معتبر هستند");
      } else {
        handleAlertDetails("فیلد های خواسته شده را پر کنید.", "warning");
      }
      console.log("jsonData: ", jsonData);
      console.log("passengertickets: ", flightPassengersTickets);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-5">
      <div className="px-4 md:px-0">
        <div className="bg-paper rounded-xl grid grid-cols-1 gap-0">
          {renderHeaderContainer()}
          {renderContentContainer()}
          {renderFooterContainer()}
        </div>
      </div>
      {renderPurchaseConfirmation()}
    </div>
  );
};

export default CheckoutPassengerContainer;
