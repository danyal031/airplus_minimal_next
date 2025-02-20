"use client";
import AccommodationDetailsProgress from "@/components/Skelton-Components/AccommodationSection/details/AccommodationDetailsProgress";
import { useGlobalContext } from "@/context/store";
import { RoomsDetailsDataType } from "@/DataTypes/accommodation/accommodationsListTypes";
import {
  getAccommodationDetails,
  getRoomTypesAccommodation,
} from "@/global-files/axioses";
import {
  Button,
  Card,
  CardContent,
  IconButton,
  Rating,
  TextField,
} from "@mui/material";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined";
import EventSeatOutlinedIcon from "@mui/icons-material/EventSeatOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import BalconyOutlinedIcon from "@mui/icons-material/BalconyOutlined";
const AccommodationDetailsContainer = () => {
  // initial states
  const [adult_capacity, set_adult_capacity] = useState<number>(1);
  const [child_capacity, set_child_capacity] = useState<number>(0);
  const [roomTypesLoading, setRoomTypesLoading] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    additionalDetailsAccommodation,
    setSelectedAccommodation,
    setAdditionalDetailsAccommodation,
    setAccommodationPassengersCapacity,
    accommodationPassengersCapacity,
    setRoomsDetails,
  } = useGlobalContext().accommodationContext.accommodationSearch;

  // handle clear selected rooms
  useEffect(() => {
    setSelectedAccommodation(null);
  }, []);

  // handle fetch room types
  const handleFetchRoomTypes = (
    accommodationId: number,
    checkin_date: string,
    checkout_date: string
  ) => {
    setRoomTypesLoading(true);
    getRoomTypesAccommodation(accommodationId, checkin_date, checkout_date)
      .then((response: any) => {
        if (response.Status) {
          setRoomTypesLoading(false);
          const updateData = response.Data.reduce(
            (acc: any[], element: RoomsDetailsDataType) => {
              if (
                element.board_type_list &&
                Array.isArray(element.board_type_list)
              ) {
                element.board_type_list.forEach((board) => {
                  const updatedElement = {
                    ...element,
                    board_type: board,
                    id: uuidv4(),
                    room_type_id: element.id,
                  };
                  delete updatedElement.board_type_list;
                  acc.push(updatedElement);
                });
              } else if (element.board_type_list === false) {
                const updatedElement = {
                  ...element,
                  board_type: false,
                  id: uuidv4(),
                  room_type_id: element.id,
                };
                delete updatedElement.board_type_list;
                acc.push(updatedElement);
              }
              return acc;
            },
            []
          );
          setRoomsDetails(updateData);
        }
      })
      .catch(() => {});
  };
  useEffect(() => {
    console.log(
      "adult_capacity",
      adult_capacity,
      "child_capacity",
      child_capacity
    );
    console.log(
      "accommodationPassengersCapacity",
      accommodationPassengersCapacity
    );
  }, [adult_capacity, child_capacity, accommodationPassengersCapacity]);

  // handle get accommodation details
  const searchParamsValidation = (searchParams: ReadonlyURLSearchParams) => {
    let dateRegex: RegExp = /[0-9]{4}-[0-9]{2}-[0-9]{2}/i;
    // let departureCheck = dateRegex.test(
    //   testConvertPersianToEnglishNumbers(
    //     searchParams.get("departing") as string
    //   )
    // );
    // let returnCheck = dateRegex.test(
    //   testConvertPersianToEnglishNumbers(
    //     searchParams.get("returning") as string
    //   )
    // );

    let destinationCheck =
      searchParams.get("destination") !== "null" &&
      searchParams.get("destination")
        ? true
        : false;

    // console.log({ departureCheck, returnCheck, destinationCheck });
    console.log({ destinationCheck });

    // return departureCheck && returnCheck && destinationCheck;
    return destinationCheck;
  };

  useEffect(() => {
    if (searchParamsValidation(searchParams)) {
      const checkin_date = searchParams.get("departing") as string;
      const checkout_date = searchParams.get("returning") as string;
      const accommodationId = Number(searchParams.get("destination"));
      const adult_capacity_params = Number(searchParams.get("adultCapacity"));
      const child_capacity_params = Number(searchParams.get("childCapacity"));
      getAccommodationDetails(accommodationId, checkin_date, checkout_date)
        .then((res: any) => {
          if (res.Status) {
            set_adult_capacity(
              adult_capacity_params === 0 ? 1 : adult_capacity_params
            );
            set_child_capacity(child_capacity_params);

            setAdditionalDetailsAccommodation(res.Data);
            setAccommodationPassengersCapacity({
              adultCapacity:
                adult_capacity_params === 0 ? 1 : adult_capacity_params,
              childCapacity: child_capacity_params,
            });
            handleFetchRoomTypes(accommodationId, checkin_date, checkout_date);
          }
        })
        .catch(() => {});
    } else {
      router.push("/");
    }
  }, []);

  const renderAccommodationComponents = () => {
    return (
      <>
        {/* for desktop */}
        <div className="hidden md:block">
          <AccommodationDetailsOnDesktop />
        </div>
        {/* for mobile */}
        <div className="md:hidden">
          <AccommodationDetailsOnMobile />
        </div>
      </>
    );
  };
  return (
    <>
      {" "}
      {additionalDetailsAccommodation ? (
        <>{renderAccommodationComponents()}</>
      ) : (
        <AccommodationDetailsProgress />
      )}
    </>
  );
};

export default AccommodationDetailsContainer;

// for desktop
const AccommodationDetailsOnDesktop = () => {
  // initial states
  const { additionalDetailsAccommodation } =
    useGlobalContext().accommodationContext.accommodationSearch;
  const renderInitialDetails = () => {
    return (
      <>
        <div className="grid grid-cols-1 gap-3">
          <span className="flex items-center justify-center text-primary-main font-bold text-base">
            {additionalDetailsAccommodation?.title.fa}
          </span>
          <div className="grid grid-cols-1 gap-1">
            <div className="flex items-center justify-center">
              <Rating
                size="small"
                value={additionalDetailsAccommodation?.rate || 0}
                readOnly
              />
            </div>
            <span className="flex items-center justify-center text-text-main text-xs text-justify">
              {additionalDetailsAccommodation?.communicational.address}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2 text-text-main">
            <div className="p-1 rounded-2xl bg-paper shadow-md flex flex-col items-center justify-between gap-4">
              <span className="text-xs">تعداد طبقه</span>
              <span className="text-sm font-semibold">
                {additionalDetailsAccommodation?.details.floors
                  ? additionalDetailsAccommodation?.details.floors
                  : "_"}
              </span>
            </div>{" "}
            <div className="p-1 rounded-2xl bg-paper shadow-md flex flex-col items-center justify-between gap-4">
              <span className="text-xs">تعداد اتاق</span>
              <span className="text-sm font-semibold">
                {additionalDetailsAccommodation?.details.rooms
                  ? additionalDetailsAccommodation?.details.rooms
                  : "_"}
              </span>
            </div>{" "}
            <div className="p-1 rounded-2xl bg-paper shadow-md flex flex-col items-center justify-between gap-4">
              <span className="text-xs">تحویل اتاق</span>
              <span className="text-sm font-semibold">
                {additionalDetailsAccommodation?.details.login
                  ? additionalDetailsAccommodation?.details.login
                  : "_"}
              </span>
            </div>{" "}
            <div className="p-1 rounded-2xl bg-paper shadow-md flex flex-col items-center justify-between gap-4">
              <span className="text-xs">تخلیه اتاق</span>
              <span className="text-sm font-semibold">
                {additionalDetailsAccommodation?.details.logout
                  ? additionalDetailsAccommodation?.details.logout
                  : "_"}
              </span>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderFilterDateBox = () => {
    return (
      <>
        <Card className="rounded-2xl border border-divider sticky top-24 w-full">
          <CardContent className="grid grid-cols-1 gap-3">
            <TextField size="small" label="ورود و خروج" />
            <TextField size="small" label="مسافران" />
            <Button variant="contained" size="medium" className="rounded-lg">
              مشاهده اتاق ها
            </Button>
          </CardContent>
        </Card>
      </>
    );
  };

  const renderKindOfDetails = () => {
    return (
      <>
        <div className="text-text-main p-1 border border-divider rounded-2xl grid grid-cols-6 gap-1 h-fit sticky top-20 bg-paper">
          <div className="flex items-center justify-center gap-0">
            <HistoryEduOutlinedIcon fontSize="small" />
            <span className="text-base truncate">امکانات هتل</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <EventSeatOutlinedIcon fontSize="small" />
            <span className="text-base truncate">رزرو اتاق</span>
          </div>{" "}
          <div className="flex items-center justify-center gap-1">
            <LocationOnOutlinedIcon fontSize="small" />
            <span className="text-base truncate">موقعیت</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <HomeOutlinedIcon fontSize="small" />
            <span className="text-base truncate">درباره هتل</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <LiveHelpOutlinedIcon fontSize="small" />
            <span className="text-base truncate">قوانین و مقررات هتل</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <IconButton size="small" color="primary">
              <BookmarksOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="primary">
              <ShareOutlinedIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      </>
    );
  };

  const renderAccommodationImages = () => {
    return <></>;
  };

  const renderAccommodationFacilities = () => {
    return (
      <>
        <div className="bg-main grid-cols-1 gap-3 rounded-2xl">
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center justify-center gap-1">
              <HistoryEduOutlinedIcon fontSize="small" />
              <span className="text-text-main font-semibold text-sm">
                امکانات هتل
              </span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <VisibilityOutlinedIcon fontSize="small" />
              <span className="text-text-main font-semibold text-sm">
                مشاهده همه امکانات
              </span>
            </div>
          </div>
          <div className="h-[2px] bg-paper"></div>
          <div className="py-5 px-9 grid grid-cols-3 gap-3">
            {additionalDetailsAccommodation?.facility_categories
              .find((item) => item.title_fa === "عمومی")
              .facilities.map((element) => (
                <span className="text-text-main text-sm font-semibold">
                  {element.title_fa}
                </span>
              ))}
          </div>
        </div>
      </>
    );
  };

  const renderRoomList = () => {
    return (
      <>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-1">
              <BalconyOutlinedIcon fontSize="small" />
              <span className="text-sm text-text-main font-semibold">
                اتاق های موجود در هتل {additionalDetailsAccommodation?.title.fa}
              </span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-sm text-text-main font-semibold">
                فیلتر براساس
              </span>
              <span className="py-px px-3 rounded-2xl border border-text-main text-text-main">
                با صبحانه
              </span>
              <span className="py-px px-3 rounded-2xl border border-text-main text-text-main">
                با شام
              </span>
              <span className="py-px px-3 rounded-2xl border border-text-main text-text-main">
                با ناهار
              </span>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="container py-24">
        <div className="grid grid-cols-12 gap-4 p-5 rounded-2xl bg-paper relative">
          <div className="col-span-3 flex flex-col items-center justify-start gap-8">
            {renderInitialDetails()}
            {renderFilterDateBox()}
          </div>
          <div className="col-span-9 grid grid-cols-1 gap-3">
            {renderKindOfDetails()}
            {!additionalDetailsAccommodation ||
            !additionalDetailsAccommodation.media ||
            !additionalDetailsAccommodation.media.images ||
            additionalDetailsAccommodation.media.images.length === 0 ? (
              <div className="w-full h-64 flex flex-col items-center justify-center bg-main rounded-2xl">
                <PhotoLibraryOutlinedIcon fontSize="large" />{" "}
              </div>
            ) : (
              renderAccommodationImages()
            )}
            {renderAccommodationFacilities()}
            {renderRoomList()}
          </div>
        </div>
      </div>
    </>
  );
};

// for mobile
const AccommodationDetailsOnMobile = () => {
  return <></>;
};
