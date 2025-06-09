"use client";
import { Toman } from "@/components/icons/IconToman";
import PassengerInformation from "@/components/passengers-components/PassengerInformation";
import { useGlobalContext } from "@/context/store";
import { AccommodationDataType } from "@/DataTypes/accommodation/accommodationTypes";
import { FlightTicketDataType } from "@/DataTypes/flight/flightTicket";
import {
  defaultPassengerInformation,
  UserInformationDataType,
} from "@/DataTypes/globalTypes";
import { handleStoreFlightJson, lockFlight } from "@/global-files/axioses";
import {
  applyMask,
  calculateAgeCategory,
  convertToGregorian,
  formatInputWithCommas,
} from "@/global-files/function";
import { useShowAlert } from "@/hooks/useShowAlert";
import { Button, Chip } from "@mui/material";
import { debounce } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface LabelsDataTypes {
  item_idx: number;
  passenger_idx: number;
  age_category:
    | "adult"
    | "child"
    | "infant"
    | "extra_infant"
    | "extra_child"
    | "extra";
  idx?: number;
}

const CheckoutAccommodationContainer = () => {
  // initial states
  const { setAccommodationPassenger, accommodationPassenger } =
    useGlobalContext().accommodationContext.accommodationSearch;
  const { searchType, setSearchType, config, setShowProgress } =
    useGlobalContext().global;
  const {
    selectedWentFlight,
    selectedReturnFlight,
    setSelectedReturnFlight,
    setSelectedWentFlight,
    flightPassengers,
  } = useGlobalContext().flightContext.searchContext;
  const { userData } = useGlobalContext().userContext;
  const { setOpenLoginDialog } = useGlobalContext().loginContext;
  const [labels, setLabels] = useState<LabelsDataTypes[]>([]);
  const [onlineAccommodations, setOnlineAccommodations] = useState<
    AccommodationDataType[]
  >([]);
  const [accommodationTotalPrice, setAccommodationTotalPrice] = useState(0);
  const [flightAccommodationTotalPrice, setFlightAccommodationTotalPrice] =
    useState(0);

  const childRef = useRef<any>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { handleAlertDetails } = useShowAlert();

  // handle total price calculation

  useEffect(() => {
    if (selectedWentFlight && selectedReturnFlight) {
      const objectTicket = accommodationPassenger.flatMap(
        (passenger: UserInformationDataType) => {
          let tickets: any[] = [];

          if (
            selectedWentFlight &&
            !Array.isArray(selectedWentFlight.Classes)
          ) {
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
                    ? selectedWentFlight.Classes.BaseData.Financial.Infant
                        .Markup.final
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
                    ? selectedWentFlight.Classes.BaseData.Financial.Infant
                        .Payable
                    : calculateAgeCategory(
                        applyMask("date", passenger.birthday as string)
                      ) === "CHI"
                    ? selectedWentFlight.Classes.BaseData.Financial.Child
                        .Payable
                    : selectedWentFlight.Classes.BaseData.Financial.Adult
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
                    ? selectedReturnFlight.Classes.BaseData.Financial.Child
                        .Markup.final
                    : selectedReturnFlight.Classes.BaseData.Financial.Adult
                        .Markup.final,
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
      const totalFlightPrice = objectTicket.reduce(
        (acc: any, ticket: any) => acc + ticket.sell,
        0
      );
      setFlightAccommodationTotalPrice(totalFlightPrice);
      console.log("🧍‍♂️ Flight price:", totalFlightPrice);
    }
  }, [selectedWentFlight, selectedReturnFlight]);

  useEffect(() => {
    const factorId = searchParams.get("factor");
    const data: any = JSON.parse(
      localStorage.getItem(factorId as string) as string
    );

    if (data.data && data.wentTicket) {
      setSearchType("flight-accommodation");
    } else {
      setSearchType("accommodation");
    }
  }, []);

  // handle initial search type
  useEffect(() => {
    const factorId = searchParams.get("factor");
    const data: any = JSON.parse(
      localStorage.getItem(factorId as string) as string
    );
    if (data.wentTicket && data.data) {
      setSearchType("flight-accommodation");
      setSelectedWentFlight(data.wentTicket);
      setSelectedReturnFlight(data.returnTicket);
      const factorId = searchParams.get("factor");
      const accommodations = JSON.parse(
        localStorage.getItem(factorId as string) as string
      ).data as AccommodationDataType[];
      const totalAccommodationPrice = accommodations.reduce(
        (acc, curr) =>
          acc + curr.room_type.board_type_list.financial_total.net_price,
        0
      );
      setAccommodationTotalPrice(totalAccommodationPrice);
    } else {
      setSearchType("accommodation");
      const factorId = searchParams.get("factor");
      const accommodations = JSON.parse(
        localStorage.getItem(factorId as string) as string
      ).data as AccommodationDataType[];
      const totalAccommodationPrice = accommodations.reduce(
        (acc, curr) =>
          acc + curr.room_type.board_type_list.financial_total.net_price,
        0
      );
      setAccommodationTotalPrice(totalAccommodationPrice);

      console.log("🧍‍♂️ Accommodation price:", totalAccommodationPrice);
    }
  }, []);

  // handle initial accommodation passenger
  useEffect(() => {
    const factorId = searchParams.get("factor");
    const accommodations = JSON.parse(
      localStorage.getItem(factorId as string) as string
    ).data as AccommodationDataType[];
    setOnlineAccommodations(accommodations);
    const newPassengers: UserInformationDataType[] = accommodations.flatMap(
      (acc: any) => {
        const {
          adult = 0,
          child = 0,
          infant = 0,
          extra_child = 0,
          extra_infant = 0,
          extra = 0,
        } = acc.room_type.passengers;
        const totalPassengers =
          adult + child + infant + extra_child + extra_infant + extra;

        return Array.from({ length: totalPassengers }).map(() => ({
          ...defaultPassengerInformation,
          id: uuidv4(),
        }));
      }
    );

    setAccommodationPassenger(newPassengers);
    console.log("🧍‍♂️ Accommodations:", accommodations);

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
      for (let i = 0; i < item?.room_type?.passengers.infant; i++) {
        tempLabel.push({
          item_idx: index,
          passenger_idx: i,
          age_category: "infant",
        });
      }
      for (let i = 0; i < item?.room_type?.passengers.extra_child; i++) {
        tempLabel.push({
          item_idx: index,
          passenger_idx: i,
          age_category: "extra_child",
        });
      }
      for (let i = 0; i < item?.room_type?.passengers.extra_infant; i++) {
        tempLabel.push({
          item_idx: index,
          passenger_idx: i,
          age_category: "extra_infant",
        });
      }
      for (let i = 0; i < item?.room_type?.passengers.extra; i++) {
        tempLabel.push({
          item_idx: index,
          passenger_idx: i,
          age_category: "extra",
        });
      }
    });
    setLabels(tempLabel.map((i, idx) => ({ ...i, idx })));
  }, []);

  useEffect(() => {
    console.log("labels", labels);
  }, [labels]);

  // handle submit accommodation
  const handleSubmitAccommodation = async () => {
    const finalHotelBookingPayload = await onlineAccommodations.map(
      (room: any, roomIdx: number) => {
        const roomPassengerLabels = labels.filter(
          (label) => label.item_idx === roomIdx
        );

        const firstLabel = roomPassengerLabels[0];
        const firstPassenger = accommodationPassenger[firstLabel.idx];

        const restLabels = roomPassengerLabels.slice(1);

        const roommates = restLabels.reduce(
          (acc, label) => {
            const passenger = accommodationPassenger[label.idx];
            if (
              label.age_category === "adult" ||
              label.age_category === "extra"
            ) {
              acc.adult.push(passenger);
            } else if (
              label.age_category === "child" ||
              label.age_category === "extra_child" ||
              label.age_category === "extra_infant" ||
              label.age_category === "infant"
            ) {
              acc.child.push(passenger);
            }
            return acc;
          },
          { adult: [], child: [] } as {
            adult: UserInformationDataType[];
            child: UserInformationDataType[];
          }
        );

        console.log("room555", room);

        return {
          action: "online",
          id: uuidv4(),
          passenger: firstPassenger,
          online: {
            ...room,
            roommate: roommates,
            details: {
              ...room.details,
              from_date: convertToGregorian(room.details.from_date),
              to_date: convertToGregorian(room.details.to_date),
            },
          },
          sell: room.room_type.board_type_list.financial_total.net_price,
          buy: room.room_type.board_type_list.financial_total.net_price,
          validated: true,
          has_credit: true,
          provider: room.room_type.board_type_list.system_supplier,
          deadline: "",
          serial: "",
          pay_deadline: false,
          currency: { unit: null, exchange: null, amount: null },
        };
      }
    );

    const sum_sell_price = finalHotelBookingPayload.reduce(
      (sum, item) => sum + parseInt(item.sell, 10),
      0
    );
    const sum_buy_price = finalHotelBookingPayload.reduce(
      (sum, item) => sum + parseInt(item.buy, 10),
      0
    );

    const id = uuidv4();
    const jsonData: any = {
      agent: { mobile: "", email: "" },
      data: finalHotelBookingPayload,
      income_id: 1,
      internal: true,
      passengers: accommodationPassenger,
      pledgers: [],
      print: 1,
      notices: false,
      requests: {
        pay: {
          amount: sum_sell_price,
          return: `${config?.communicational.site}/services/shopping/` + id,
        },
      },
      sum_sell_price,
      sum_buy_price,
    };

    let allValid = true;
    childRef.current.forEach((child: any) => {
      if (child) {
        child.handleTrigger(); // اجرا کردن trigger
        if (!child.getIsValid()) {
          allValid = false;
        }
      }
    });

    if (allValid) {
      setShowProgress(true);
      handleStoreFlightJson(jsonData)
        .then((res: any) => {
          jsonData["type"] = "accommodation";
          localStorage.setItem(id, JSON.stringify(jsonData));
          router.replace(res.payload.payment_link);
        })
        .catch((err: any) => {
          setShowProgress(false);
        });
    }

    console.log("finalHotelBookingPayload", finalHotelBookingPayload);
    console.log("jsonData", jsonData);
  };

  // handle submit flight accommodation
  const handleSubmitFlightAccommodation = () => {
    const objectTicket = accommodationPassenger.flatMap(
      (passenger: UserInformationDataType) => {
        let tickets: any[] = [];

        const ageCategory = calculateAgeCategory(
          applyMask("date", passenger.birthday as string)
        );

        const getFinancials = (flight: any) => {
          if (!flight || Array.isArray(flight.Classes))
            return { sell: 0, buy: 0 };

          const financial = flight.Classes.BaseData.Financial;
          switch (ageCategory) {
            case "INF":
              return {
                sell: financial.Infant.Markup.final,
                buy: financial.Infant.Payable,
              };
            case "CHI":
              return {
                sell: financial.Child.Markup.final,
                buy: financial.Child.Payable,
              };
            default:
              return {
                sell: financial.Adult.Markup.final,
                buy: financial.Adult.Payable,
              };
          }
        };

        if (selectedWentFlight && !Array.isArray(selectedWentFlight.Classes)) {
          const { sell, buy } = getFinancials(selectedWentFlight);
          tickets.push({
            action: "online",
            id: uuidv4(),
            passenger,
            online: {
              ...selectedWentFlight,
              type: "aircraft",
            },
            sell,
            buy,
            validated: true,
            has_credit: true,
            provider: "",
            deadline: "",
            serial: "",
            pay_deadline: false,
            currency: { unit: null, exchange: null, amount: null },
          });
        }

        if (
          selectedReturnFlight &&
          !Array.isArray(selectedReturnFlight.Classes)
        ) {
          const { sell, buy } = getFinancials(selectedReturnFlight);
          tickets.push({
            action: "online",
            id: uuidv4(),
            passenger,
            online: {
              ...selectedReturnFlight,
              type: "aircraft",
            },
            sell,
            buy,
            validated: true,
            has_credit: true,
            provider: "",
            deadline: "",
            serial: "",
            pay_deadline: false,
            currency: { unit: null, exchange: null, amount: null },
          });
        }

        return tickets;
      }
    );

    const finalHotelBookingPayload = onlineAccommodations.map(
      (room: any, roomIdx: number) => {
        const roomPassengerLabels = labels.filter(
          (label) => label.item_idx === roomIdx
        );

        const firstLabel = roomPassengerLabels[0];
        const firstPassenger = accommodationPassenger[firstLabel.idx];

        const restLabels = roomPassengerLabels.slice(1);

        const roommates = restLabels.reduce(
          (acc, label) => {
            const passenger = accommodationPassenger[label.idx];
            if (label.age_category === "adult") {
              acc.adult.push(passenger);
            } else if (label.age_category === "child") {
              acc.child.push(passenger);
            }
            return acc;
          },
          { adult: [], child: [] } as {
            adult: UserInformationDataType[];
            child: UserInformationDataType[];
          }
        );

        return {
          action: "online",
          id: uuidv4(),
          passenger: firstPassenger,
          online: {
            ...room,
            roommate: roommates,
            details: {
              ...room.details,
              from_date: convertToGregorian(room.details.from_date),
              to_date: convertToGregorian(room.details.to_date),
            },
          },
          sell: room.room_type.board_type_list.financial_total.net_price,
          buy: room.room_type.board_type_list.financial_total.net_price,
          validated: true,
          has_credit: true,
          provider: room.room_type.board_type_list.system_supplier,
          deadline: "",
          serial: "",
          pay_deadline: false,
          currency: { unit: null, exchange: null, amount: null },
        };
      }
    );

    const finalFlightAccommodationBookingPayload = [
      ...objectTicket,
      ...finalHotelBookingPayload,
    ];

    const sum_sell_price = finalFlightAccommodationBookingPayload.reduce(
      (sum, item) => sum + parseInt(item.sell, 10),
      0
    );
    const sum_buy_price = finalFlightAccommodationBookingPayload.reduce(
      (sum, item) => sum + parseInt(item.buy, 10),
      0
    );

    const id = uuidv4();
    const jsonData: any = {
      agent: { mobile: "", email: "" },
      data: finalFlightAccommodationBookingPayload,
      income_id: 15,
      internal: true,
      passengers: accommodationPassenger,
      pledgers: [],
      print: 1,
      notices: false,
      requests: {
        pay: {
          amount: sum_sell_price,
          // amount: 10000,
          return: `${config?.communicational.site}/services/shopping/` + id,
        },
      },
      sum_sell_price,
      sum_buy_price,
    };

    let allValid = true;
    childRef.current.forEach((child: any) => {
      if (child) {
        child.handleTrigger(); // اجرا کردن trigger
        if (!child.getIsValid()) {
          allValid = false;
        }
      }
    });

    if (allValid) {
      setShowProgress(true);
      lockFlight({
        data: objectTicket.map((element: any) => {
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
          console.log("lockRes.status", lockRes.status);
          console.log("lockRes", lockRes);
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
                jsonData["type"] = "accommodation";
                localStorage.setItem(id, JSON.stringify(jsonData));
                router.replace(res.payload.payment_link);
              })
              .catch((err: any) => {
                setShowProgress(false);
              });
          }
        })
        .catch((err: any) => {
          setShowProgress(false);
          handleAlertDetails(err.response.data.error.message, "error");
        });
      // setShowProgress(true);
    }

    console.log("🎟️✈️🛏️ flight accommodation json data", jsonData);
  };

  // handle submit type field object
  const submitTypeFieldObject: { [key: string]: () => void } = {
    accommodation: handleSubmitAccommodation,
    "flight-accommodation": handleSubmitFlightAccommodation,
  };
  // handle submit
  const handleSubmit = () => {
    if (userData === null) {
      setOpenLoginDialog(true);
    } else {
      submitTypeFieldObject[searchType]();
    }
  };

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
            {searchType === "accommodation"
              ? formatInputWithCommas(accommodationTotalPrice / 10)
              : formatInputWithCommas(
                  (flightAccommodationTotalPrice + accommodationTotalPrice) / 10
                )}
            <Toman height={14} width={14} className="text-text-main" />
          </span>
          <Button
            onClick={handleSubmit}
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
          (item: UserInformationDataType, index: number) => {
            let roomIdx = labels && labels[index]?.item_idx;
            let passengerNumberInRoom = labels
              ? labels.slice(0, index + 1).filter((l) => l.item_idx === roomIdx)
                  .length
              : index + 1;
            return (
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
                passengerNumberInRoom={passengerNumberInRoom}
              />
            );
          }
        )}
      </>
    );
  };

  // handle render accommodation reservation details
  const renderAccommodationReservationDetails = () => {
    return (
      <div className="flex flex-col items-start justify-center gap-2">
        <span className="text-text-main text-sm font-semibold">
          اتاق های مورد نظر{" "}
        </span>
        <div className="flex items-center justify-center gap-3">
          {onlineAccommodations.map((item: any) => (
            <Chip
              key={item.id}
              color="primary"
              label={
                <div>
                  {item.room_type.title.fa}
                  {" | "}
                  {item.title.fa}
                  {" | "}
                  {formatInputWithCommas(
                    item.room_type.board_type_list.financial_total.net_price /
                      10
                  ) + " تومان"}
                </div>
              }
            />
          ))}
        </div>
      </div>
    );
  };

  // handle render flight accommodation reservation details
  const renderFlightAccommodationReservationDetails = () => {
    return (
      selectedWentFlight &&
      selectedReturnFlight && (
        <div className="grid grid-cols-1 gap-5">
          <div className="flex flex-col items-start justify-center gap-2">
            <span className="text-text-main text-sm font-semibold">
              پرواز های انتخاب شده
            </span>
            <div className="flex items-center justify-center gap-3">
              <span className="text-text-main text-base font-semibold">
                x {accommodationPassenger.length}
              </span>
              <Chip
                color="primary"
                label={
                  <div>
                    پرواز رفت:{" "}
                    <strong
                      style={{ fontWeight: "bold" }}
                      className="text-base"
                    >
                      {selectedWentFlight.DepartureDateTime.split(" ")[1].split(
                        ":"
                      )[0] +
                        ":" +
                        selectedWentFlight.DepartureDateTime.split(
                          " "
                        )[1].split(":")[1]}
                    </strong>
                    {" | "}
                    {selectedWentFlight?.Airline.title_fa} {" | "}
                    {selectedWentFlight.Origin.Iata.title_fa} {" به "}
                    {selectedWentFlight.Destination.Iata.title_fa}
                    {" | "}
                    {formatInputWithCommas(
                      selectedWentFlight.Classes.BaseData.Financial.Adult.Markup
                        .final / 10
                    ) + " تومان"}
                  </div>
                }
              />
              <span className="text-lg text-text-main font-bold"> | </span>
              <span className="text-text-main text-base font-semibold">
                x {accommodationPassenger.length}
              </span>
              <Chip
                color="primary"
                label={
                  <div>
                    پرواز برگشت:{" "}
                    <strong
                      style={{ fontWeight: "bold" }}
                      className="text-base"
                    >
                      {selectedReturnFlight?.DepartureDateTime.split(
                        " "
                      )[1].split(":")[0] +
                        ":" +
                        selectedReturnFlight?.DepartureDateTime.split(
                          " "
                        )[1].split(":")[1]}
                    </strong>
                    {" | "}
                    {selectedReturnFlight?.Airline.title_fa} {" | "}
                    {selectedReturnFlight?.Origin.Iata.title_fa} {" به "}
                    {selectedReturnFlight?.Destination.Iata.title_fa}
                    {" | "}
                    {formatInputWithCommas(
                      selectedReturnFlight.Classes.BaseData.Financial.Adult
                        .Markup.final / 10
                    ) + " تومان"}
                  </div>
                }
              />
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-2">
            <span className="text-text-main text-sm font-semibold">
              اتاق های مورد نظر{" "}
            </span>
            <div className="flex items-center justify-center gap-3">
              {onlineAccommodations.map((item: any) => (
                <Chip
                  key={item.id}
                  color="primary"
                  label={
                    <div>
                      {item.room_type.title.fa}
                      {" | "}
                      {item.title.fa}
                      {" | "}
                      {formatInputWithCommas(
                        item.room_type.board_type_list.financial_total
                          .net_price / 10
                      ) + " تومان"}
                    </div>
                  }
                />
              ))}
            </div>
          </div>
        </div>
      )
    );
  };

  // handle render Reservation status statement
  const reservationStatusStatement = () => {
    switch (searchType) {
      case "accommodation":
        return renderAccommodationReservationDetails();
      case "flight-accommodation":
        return renderFlightAccommodationReservationDetails();
    }
  };

  return (
    <div className="grid grid-cols-1 gap-5">
      {reservationStatusStatement()}
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
