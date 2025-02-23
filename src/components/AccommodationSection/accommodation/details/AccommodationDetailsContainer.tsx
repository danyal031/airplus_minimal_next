"use client";
import AccommodationDetailsProgress from "@/components/Skelton-Components/AccommodationSection/details/AccommodationDetailsProgress";
import { useGlobalContext } from "@/context/store";
import {
  getAccommodationDetails,
  getRoomTypesAccommodation,
} from "@/global-files/axioses";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  Rating,
  TextField,
} from "@mui/material";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { FC, useEffect, useRef, useState } from "react";
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
import AccommodationRoomsProgress from "./AccommodationRoomsProgress";
import { formatInputWithCommas } from "@/global-files/function";
import Image from "next/image";
import { Swiper } from "swiper/types"; // Add this import for the type
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { RoomsDetailsDataType } from "@/DataTypes/accommodation/accommodationsListTypes";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  defaultChildrenInformation,
  defaultPassengerInformation,
} from "@/DataTypes/globalTypes";
import Map from "@/components/global/map/Map";
import { motion, AnimatePresence } from "framer-motion";

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
    roomsDetails,
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
          <AccommodationDetailsOnDesktop roomTypesLoading={roomTypesLoading} />
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
interface AccommodationDetailsOnDesktopProps {
  roomTypesLoading: boolean;
}
const AccommodationDetailsOnDesktop: FC<AccommodationDetailsOnDesktopProps> = ({
  roomTypesLoading,
}) => {
  // initial states
  const [openGallery, setOpenGallery] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<Swiper | null>(null);

  const { additionalDetailsAccommodation, roomsDetails } =
    useGlobalContext().accommodationContext.accommodationSearch;

  useEffect(() => {
    console.log("roomsDetails", roomsDetails);
  }, [roomsDetails]);

  // handle open gallery
  const handleOpenGallery = (index: number) => {
    setSelectedIndex(index);
    setOpenGallery(true);
  };
  // handle close Gallery
  const handleCloseGallery = () => {
    setOpenGallery(false);
    setThumbsSwiper(null);
  };

  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  const renderInitialDetails = () => {
    return (
      <>
        <div className="w-full grid grid-cols-1 gap-3">
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
            <span className="flex items-center justify-center text-text-main text-sm text-justify">
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
        <div className="text-text-main p-1 border border-divider rounded-2xl grid grid-cols-6 gap-1 h-fit sticky top-20 bg-paper z-50">
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

  // handle show images
  const renderImageDialog = () => {
    if (
      !additionalDetailsAccommodation ||
      !additionalDetailsAccommodation?.media ||
      additionalDetailsAccommodation?.media.images.length === 0
    )
      return null;
    return (
      <Dialog
        open={openGallery}
        onClose={handleCloseGallery}
        fullWidth
        maxWidth="md"
        PaperProps={{ style: { overflow: "hidden", borderRadius: "12px" } }}
      >
        <DialogContent>
          <SwiperComponent
            ref={swiperRef}
            initialSlide={selectedIndex}
            navigation={false}
            modules={[Navigation, Thumbs]}
            className="imageSwiper"
            loop={false}
            spaceBetween={10}
            slidesPerView={1}
            thumbs={{ swiper: thumbsSwiper }}
            style={{ width: "100%", height: "500px" }}
            onSlideChange={(swiper) => setSelectedIndex(swiper.activeIndex)}
          >
            {additionalDetailsAccommodation?.media.images.map(
              (image, index: number) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-full">
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_MEDIA_URL_1 + "/" + image.path
                      }
                      alt={`Hotel Image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </SwiperSlide>
              )
            )}
            <div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-[2] bg-gray-500 bg-opacity-55 rounded-full flex items-center justify-center">
              <ChevronLeftOutlinedIcon
                fontSize="large"
                className="hover:cursor-pointer text-neutral-200"
                onClick={handleNext}
              />
            </div>
            <div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-[2] bg-gray-500 bg-opacity-55 rounded-full flex items-center justify-center">
              <KeyboardArrowRightOutlinedIcon
                fontSize="large"
                className="hover:cursor-pointer text-neutral-200"
                onClick={handlePrev}
              />
            </div>
          </SwiperComponent>
          <SwiperComponent
            modules={[Thumbs]}
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={5}
            style={{ marginTop: "20px" }}
            className="px-1"
          >
            {additionalDetailsAccommodation?.media.images.map(
              (image, index: number) => (
                <SwiperSlide key={index}>
                  <div
                    className={`relative w-full rounded-md overflow-hidden h-24 cursor-pointer ${
                      selectedIndex === index
                        ? "border-2 border-primary-main"
                        : ""
                    }`}
                  >
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_MEDIA_URL_1 + "/" + image.path
                      }
                      alt={`Thumbnail ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </SwiperSlide>
              )
            )}
          </SwiperComponent>
        </DialogContent>
      </Dialog>
    );
  };
  const renderAccommodationImages = () => {
    if (
      !additionalDetailsAccommodation ||
      !additionalDetailsAccommodation.media ||
      additionalDetailsAccommodation.media.images.length === 0
    ) {
      return (
        <div className="w-full h-64 flex flex-col items-center justify-center bg-main rounded-2xl">
          <PhotoLibraryOutlinedIcon fontSize="large" />
        </div>
      );
    }

    const images = additionalDetailsAccommodation.media.images;
    const remainingImages = images.length - 4;

    return (
      <div className="grid grid-cols-3 gap-2 relative">
        <div
          className="min-h-80 col-span-3 relative cursor-pointer"
          onClick={() => {
            handleOpenGallery(0);
          }}
        >
          {images[0] ? (
            <Image
              src={process.env.NEXT_PUBLIC_MEDIA_URL_1 + "/" + images[0]?.path}
              alt=""
              layout="fill"
              objectFit="cover"
              className="rounded-t-2xl"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-main rounded-t-2xl text-center text-text-main">
              عکس نداره
            </div>
          )}
        </div>

        {[1, 2, 3].map((item) => {
          const image = images[item];
          return (
            <div
              key={item}
              className="relative h-28 cursor-pointer"
              onClick={() => handleOpenGallery(item)}
            >
              {image ? (
                <Image
                  src={process.env.NEXT_PUBLIC_MEDIA_URL_1 + "/" + image.path}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  className={
                    item === 1
                      ? "rounded-br-2xl"
                      : item === 2
                      ? ""
                      : "rounded-bl-2xl"
                  }
                />
              ) : (
                <div
                  className={`w-full h-full flex items-center justify-center bg-main text-text-main ${
                    item === 1
                      ? "rounded-br-2xl"
                      : item === 2
                      ? ""
                      : "rounded-bl-2xl"
                  }`}
                >
                  عکس نداره
                </div>
              )}
            </div>
          );
        })}

        {remainingImages > 0 && (
          <button
            className="absolute bottom-4 left-2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-lg z-10"
            onClick={() => handleOpenGallery(5)}
          >
            +{remainingImages} تصویر دیگر
          </button>
        )}
      </div>
    );
  };

  const renderAccommodationFacilities = () => {
    return (
      <>
        {additionalDetailsAccommodation &&
          additionalDetailsAccommodation.facility_categories && (
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
                {additionalDetailsAccommodation.facility_categories
                  .find((item) => item.title_fa === "عمومی")
                  ?.facilities?.map((element) => (
                    <span className="text-text-main text-sm font-semibold">
                      {element.title_fa}
                    </span>
                  ))}
              </div>
            </div>
          )}
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
          {roomsDetails && roomsDetails.length !== 0 ? (
            <div className="grid grid-cols-1 gap-2">
              {roomsDetails.map((room) => {
                return <RoomCard room={room} id={room.id} />;
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <span className="text-sm font-semibold">
                اتاقی جهت رزرو وجود ندارد
              </span>
            </div>
          )}{" "}
        </div>
      </>
    );
  };

  // for render accommodation map
  const renderAccommodationMap = () => {
    return (
      <>
        <div className="bg-paper border-[3px] border-main rounded-2xl grid grid-cols-1 gap-0 overflow-hidden">
          <div className="p-3 flex items-center justify-start gap-2">
            <LocationOnOutlinedIcon fontSize="small" />
            <span className="text-sm text-text-main font-semibold">
              مکان های مهم اطراف هتل{" "}
            </span>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-64"
          >
            <Map
              zoom={13}
              posix={
                additionalDetailsAccommodation?.communicational.location
                  .split(",")
                  .map(Number) as [number, number]
              }
            />
          </motion.div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="container py-24">
        <div className="grid grid-cols-12 gap-4 p-5 rounded-2xl bg-paper relative">
          <div className="col-span-4 flex flex-col items-center justify-start gap-8">
            {renderInitialDetails()}
            {renderFilterDateBox()}
          </div>
          <div className="col-span-8 grid grid-cols-1 gap-3">
            {renderKindOfDetails()}

            {renderAccommodationImages()}
            {renderImageDialog()}

            {renderAccommodationFacilities()}
            {!roomTypesLoading ? (
              renderRoomList()
            ) : (
              <AccommodationRoomsProgress />
            )}
            {renderAccommodationMap()}
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

// handle roomCard component
interface RoomCardProps {
  room: RoomsDetailsDataType;
  id: string;
}
const RoomCard: FC<RoomCardProps> = ({ room, id }) => {
  // initial states
  const searchParams = useSearchParams();

  const {
    accommodationFromDate,
    accommodationToDate,
    selectedAccommodation,
    additionalDetailsAccommodation,
    setSelectedAccommodation,
    accommodationPassengersCapacity,
  } = useGlobalContext().accommodationContext.accommodationSearch;

  const [roomCounter, setRoomCounter] = useState<number>(() => {
    const matchingRoom = selectedAccommodation?.room_types.find(
      (el) => el.id === room.id
    );
    return matchingRoom?.numberOfRoom || 0;
  });

  // handle add room
  const handleAddRoom = (room: RoomsDetailsDataType, boardType: any) => {
    if (additionalDetailsAccommodation) {
      if (selectedAccommodation) {
        const updatedRoomTypes = selectedAccommodation.room_types
          ? selectedAccommodation.room_types.map((item) =>
              item.id === room.id
                ? {
                    ...item,
                    numberOfRoom: item.numberOfRoom + 1,
                  }
                : item
            )
          : [];

        const isNewRoom = !updatedRoomTypes.some((item) => item.id === room.id);

        if (isNewRoom) {
          updatedRoomTypes.push({
            ...room,
            board_type: boardType,
            numberOfRoom: 1,
          });
        }

        setSelectedAccommodation({
          communicational: additionalDetailsAccommodation.communicational,
          facilities: additionalDetailsAccommodation.facilities,
          id: additionalDetailsAccommodation.id,
          rate: additionalDetailsAccommodation.rate,
          status: additionalDetailsAccommodation.status,
          title: additionalDetailsAccommodation.title,
          type: additionalDetailsAccommodation.type,
          rules: additionalDetailsAccommodation.rules,
          logo: additionalDetailsAccommodation.logo,

          room_types: updatedRoomTypes.map((room) => ({
            ...room,
            passengers: {
              child: Array.from(
                Array(accommodationPassengersCapacity.childCapacity)
              ).map(() => {
                return {
                  ...defaultChildrenInformation,
                  id: uuidv4(),
                  ageCategory: "child",
                };
              }),
              adult: Array.from(
                Array(accommodationPassengersCapacity.adultCapacity)
              ).map((el, ind) => {
                return {
                  ...defaultPassengerInformation,
                  id: uuidv4(),
                  ageCategory: "adult",
                  leader: ind === 0 ? true : false,
                };
              }),
            },
          })),
          details: {
            ...additionalDetailsAccommodation.details,
            fromDate: accommodationFromDate as string,
            toDate: accommodationToDate as string,
          },
        });
        setRoomCounter((pre) => pre + 1);
      } else {
        const updatedRoomTypes: RoomsDetailsDataType[] = [];
        const existingRoom = updatedRoomTypes.find(
          (item) => item.id === room.id
        );

        if (existingRoom) {
          updatedRoomTypes.forEach((item) => {
            if (item.id === room.id) {
              item.numberOfRoom += 1;
            }
          });
        } else {
          updatedRoomTypes.push({
            ...room,
            board_type: boardType,
            numberOfRoom: 1,
          });
        }

        const adultCapacity = Number(
          searchParams.get("adultCapacity") as string
        );
        const childCapacity = Number(
          searchParams.get("childCapacity") as string
        );
        setSelectedAccommodation({
          communicational: additionalDetailsAccommodation.communicational,
          facilities: additionalDetailsAccommodation.facilities,
          id: additionalDetailsAccommodation.id,
          rate: additionalDetailsAccommodation.rate,
          status: additionalDetailsAccommodation.status,
          title: additionalDetailsAccommodation.title,
          type: additionalDetailsAccommodation.type,
          rules: additionalDetailsAccommodation.rules,
          logo: additionalDetailsAccommodation.logo,
          room_types: updatedRoomTypes.map((room) => ({
            ...room,
            passengers: {
              child: Array.from(
                Array(accommodationPassengersCapacity.childCapacity)
              ).map(() => {
                return {
                  ...defaultChildrenInformation,
                  id: uuidv4(),
                  ageCategory: "child",
                };
              }),
              adult: Array.from(
                Array(accommodationPassengersCapacity.adultCapacity)
              ).map((el, ind) => {
                return {
                  ...defaultPassengerInformation,
                  id: uuidv4(),
                  ageCategory: "adult",
                  leader: ind === 0 ? true : false,
                };
              }),
            },
          })),
          details: {
            ...additionalDetailsAccommodation.details,
            fromDate: accommodationFromDate as string,
            toDate: accommodationToDate as string,
          },
        });
        setRoomCounter((pre) => pre + 1);
      }
    }
  };

  // handle Decrease room
  const handleDecreaseRoom = (selectedRoomId: string) => {
    if (additionalDetailsAccommodation) {
      const updatedRoomTypes = selectedAccommodation.room_types
        ? selectedAccommodation.room_types.reduce<RoomsDetailsDataType[]>(
            (acc, item) => {
              if (item.id === selectedRoomId) {
                if (item.numberOfRoom > 1) {
                  acc.push({
                    ...item,
                    numberOfRoom: item.numberOfRoom - 1,
                  });
                }
              } else {
                acc.push(item);
              }
              return acc;
            },
            []
          )
        : [];

      if (updatedRoomTypes.length === 0) {
        setSelectedAccommodation(null);
      } else {
        setSelectedAccommodation({
          communicational: additionalDetailsAccommodation.communicational,
          facilities: additionalDetailsAccommodation.facilities,
          id: additionalDetailsAccommodation.id,
          rate: additionalDetailsAccommodation.rate,
          status: additionalDetailsAccommodation.status,
          title: additionalDetailsAccommodation.title,
          type: additionalDetailsAccommodation.type,
          rules: additionalDetailsAccommodation.rules,
          logo: additionalDetailsAccommodation.logo,
          room_types: updatedRoomTypes.map((room) => ({
            ...room,
            passengers: {
              child: Array.from(
                Array(accommodationPassengersCapacity.childCapacity)
              ).map(() => {
                return defaultChildrenInformation;
              }),
              adult: Array.from(
                Array(accommodationPassengersCapacity.adultCapacity)
              ).map(() => {
                return defaultPassengerInformation;
              }),
            },
          })),
          details: {
            ...additionalDetailsAccommodation.details,
            fromDate: accommodationFromDate as string,
            toDate: accommodationToDate as string,
          },
        });
      }
      setRoomCounter((pre) => pre - 1);
    }
  };

  useEffect(() => {
    console.log("selectedAccommodation", selectedAccommodation);
  }, [selectedAccommodation]);

  // handle mobile
  const renderOnMobile = () => {
    return (
      <>
        <div className="md:hidden"></div>
      </>
    );
  };

  // handle desktop
  const renderOnDesktop = () => {
    const totalPrice = room.board_type.financial.reduce((sum, item) => {
      return sum + item.board_price;
    }, 0);
    return (
      <>
        <div className="hidden md:grid grid-cols-12 bg-main hover:shadow-md rounded-2xl overflow-hidden transition-shadow">
          <div className="col-span-4">
            <div className="relative min-h-32">
              <Image
                src={
                  process.env.NEXT_PUBLIC_MEDIA_URL_1 + "/" + room.image[0].path
                }
                alt={`room image`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="col-span-8 grid grid-cols-4 gap-2 px-3 py-4">
            <div className="col-span-3 flex flex-col items-start justify-between">
              <div className="flex flex-col items-start justify-start gap-2">
                <span className="text-sm text-text-main font-semibold">
                  {room.title.fa}
                </span>
                <Chip
                  variant="outlined"
                  color="primary"
                  label={room.board_type.title.fa}
                  size="small"
                />{" "}
              </div>
              <span className="text-text-main text-xs font-semibold">
                {room.capacity.adult} بزرگسال، {room.capacity.child} کودک
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-primary-main font-semibold text-base">
                {formatInputWithCommas(totalPrice / 10)}
              </span>
              {roomCounter === 0 ? (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className="min-w-24 rounded-lg"
                  disabled={roomCounter < room.capacity.room ? false : true}
                  onClick={() => {
                    handleAddRoom(room, room.board_type as any);
                  }}
                >
                  {roomCounter < room.capacity.room
                    ? "رزرو اتاق"
                    : "تکمیل ظرفیت"}
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <IconButton
                    color="primary"
                    size="small"
                    className="h-7 w-7 rounded-full"
                    disabled={roomCounter < room.capacity.room ? false : true}
                    onClick={() => {
                      handleAddRoom(room, room.board_type as any);
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                  {roomCounter}
                  <IconButton
                    color="primary"
                    size="small"
                    className="h-7 w-7 rounded-full"
                    disabled={roomCounter === 0 ? true : false}
                    onClick={() => {
                      handleDecreaseRoom(room.id);
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {renderOnMobile()}
      {renderOnDesktop()}
    </>
  );
};
