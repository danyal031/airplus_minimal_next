// "use client";
// import { useGlobalContext } from "@/context/store";
// import {
//   AccommodationShoppingCartDataType,
//   AccommodationsListDataType,
//   RoomsDetailsDataType,
// } from "@/DataTypes/accommodation/accommodationsListTypes";
// import { Button, Rating, Tooltip } from "@mui/material";
// import Image from "next/image";
// import React, { FC, useEffect, useMemo, useRef, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";
// import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
// import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
// import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
// import moment from "jalali-moment";
// import { motion } from "framer-motion";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import dynamic from "next/dynamic";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import { useRouter, useSearchParams } from "next/navigation";
// import { getRoomTypesAccommodation } from "@/global-files/axioses";
// import { v4 as uuidv4 } from "uuid";
// import RoomTypesAccommodationCartProgress from "@/components/Skelton-Components/AccommodationSection/roomTypes/RoomTypesAccommodationCartProgress";
// import {
//   convertToGregorian,
//   formatInputWithCommas,
// } from "@/global-files/function";
// import { Route } from "next";

// interface AccommodationCardProps {
//   data: AccommodationsListDataType;
// }

// const AccommodationCard: FC<AccommodationCardProps> = ({ data }) => {
//   // initial states
//   const [openAccommodationMap, setOpenAccommodationMap] = useState(false);
//   const [isQuickReserveOpen, setIsQuickReserveOpen] = useState<boolean>(false);
//   const [allowGetRooms, setAllowGetRooms] = useState<boolean>(true);
//   const [roomTypesLoading, setRoomTypesLoading] = useState<boolean>(false);
//   const [roomTypes, setRoomTypes] = useState<RoomsDetailsDataType[] | []>([]);

//   const swiperRef = useRef<any>(null);
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const {
//     typeOfAccommodation,
//     accommodationFromDate,
//     accommodationToDate,
//     selectedAccommodation,
//     accommodationPassengersCapacity,
//   } = useGlobalContext().accommodationContext.accommodationSearch;

//   useEffect(() => {
//     if (isQuickReserveOpen && roomTypes.length === 0 && allowGetRooms) {
//       setRoomTypesLoading(true);
//       setAllowGetRooms(false);
//       const departing = searchParams.get("departing") as string;
//       const returning = searchParams.get("returning") as string;
//       getRoomTypesAccommodation(data.id, departing, returning)
//         .then((res: any) => {
//           if (res.Status) {
//             setAllowGetRooms(true);
//             setRoomTypesLoading(false);
//             if (!res.Data) {
//               setRoomTypes([]);
//             } else {
//               const updateData = res.Data.reduce(
//                 (acc: any[], element: RoomsDetailsDataType) => {
//                   if (
//                     element.board_type_list &&
//                     Array.isArray(element.board_type_list)
//                   ) {
//                     element.board_type_list.forEach((board) => {
//                       const updatedElement = {
//                         ...element,
//                         board_type: board,
//                         id: uuidv4(),
//                         room_type_id: element.id,
//                       };
//                       delete updatedElement.board_type_list;
//                       acc.push(updatedElement);
//                     });
//                   } else if (element.board_type_list === false) {
//                     const updatedElement = {
//                       ...element,
//                       board_type: false,
//                       id: uuidv4(),
//                       room_type_id: element.id,
//                     };
//                     delete updatedElement.board_type_list;
//                     acc.push(updatedElement);
//                   }
//                   return acc;
//                 },
//                 []
//               );
//               setRoomTypes(updateData);
//             }
//           }
//         })
//         .catch((err) => {});

//       console.log(roomTypes);
//     }
//   }, [isQuickReserveOpen]);

//   const toggleQuickReserve = () => {
//     setIsQuickReserveOpen((prev) => !prev);
//   };

//   const handlePrev = () => {
//     swiperRef.current.swiper.slidePrev();
//   };

//   const handleNext = () => {
//     swiperRef.current.swiper.slideNext();
//   };

//   // handle move to reservation page
//   const createSearchparams = (
//     selectedAccommodation: AccommodationShoppingCartDataType
//   ) => {
//     const expandedRoomTypes = selectedAccommodation.room_types.flatMap(
//       (room: any) =>
//         Array.from({ length: room.numberOfRoom }, () => {
//           const { numberOfRoom, ...rest } = room;
//           return {
//             ...rest,
//             id: uuidv4(),
//           };
//         })
//     );

//     return {
//       ...data,
//       room_types: expandedRoomTypes,
//       details: {
//         ...data.details,
//         from_date: convertToGregorian(accommodationFromDate as string),
//         to_date: convertToGregorian(accommodationToDate as string),
//       },
//     };
//   };

//   const moveToReservationPage = () => {
//     const queryParams = createSearchparams(
//       selectedAccommodation as AccommodationShoppingCartDataType
//     );
//     const local_id = uuidv4().substr(0, 6);
//     localStorage.setItem(local_id, JSON.stringify(queryParams));
//     // console.log(222, queryParams);
//     router.push(`/accommodation/checkout?factor=${local_id}` as Route);
//   };

//   // handle move to accommodation details page
//   const moveToAccommodationDetailsPage = () => {
//     if (selectedAccommodation) {
//       // moveToReservationPage();
//       console.log("moveToReservationPage");
//     } else {
//       router.push(
//         `/accommodation/details?destination=${data.id}&departing=${accommodationFromDate}&returning=${accommodationToDate}&adultCapacity=${accommodationPassengersCapacity.adultCapacity}&childCapacity=${accommodationPassengersCapacity.childCapacity}`
//       );
//     }
//   };

//   const Map = useMemo(
//     () =>
//       dynamic(() => import("@/components/global/map/Map"), {
//         // loading: () => <p>A map is loading</p>,
//         ssr: false,
//       }),
//     []
//   );

//   const renderAccommodationLocation = () => {
//     if (!openAccommodationMap) return null;
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="mt-[7px] h-48 border-4 border-main rounded-2xl overflow-hidden"
//       >
//         {/* <DynamicMap
//           zoom={13}
//           posix={
//             data?.communicational.location.split(",").map(Number) as [
//               number,
//               number
//             ]
//           }
//         /> */}
//         <Map
//           zoom={13}
//           posix={
//             data?.communicational.location.split(",").map(Number) as [
//               number,
//               number
//             ]
//           }
//         />
//       </motion.div>
//     );
//   };

//   const renderRoomsAccommodation = () => {
//     return (
//       <>
//         <div className="w-full flex flex-col items-center justify-start gap-0 bg-paper rounded-2xl">
//           {isQuickReserveOpen &&
//             (roomTypesLoading ? (
//               <div className="w-full flex overflow-x-auto gap-4 p-4">
//                 <RoomTypesAccommodationCartProgress />
//               </div>
//             ) : roomTypes.length === 0 ? (
//               <div className="bg-gray-100 w-full min-h-10 flex items-center justify-center">
//                 <span className="text-sm font-semibold">
//                   اتاقی جهت رزرو وجود ندارد
//                 </span>
//               </div>
//             ) : (
//               <div className="w-full flex overflow-x-auto gap-4 p-2 border-t">
//                 {/* {roomTypes.map((room, index) => {
//                   return <RoomSection room={room} data={data} />;
//                 })} */}
//               </div>
//             ))}
//         </div>
//       </>
//     );
//   };

//   // for type of list
//   const renderListCard = () => {
//     const start = moment(accommodationFromDate as string, "jYYYY-jMM-jDD");
//     const end = moment(accommodationToDate as string, "jYYYY-jMM-jDD");
//     let duration = end.diff(start, "days");
//     return (
//       <>
//         <div
//           className={`grid grid-cols-5 gap-0 bg-main rounded-2xl ${
//             isQuickReserveOpen ? "pb-3" : "pb-0"
//           } p-3`}
//         >
//           <div className="col-span-4 grid grid-cols-3 gap-3 pb-3 pl-3 border-l-2 border-dashed border-paper">
//             <div className="h-40 relative rounded-xl overflow-hidden">
//               {data.media.length > 0 ? (
//                 <Swiper
//                   navigation={false}
//                   modules={[Navigation]}
//                   className="mySwiper"
//                   loop={true}
//                   spaceBetween={1}
//                   slidesPerView={1}
//                   ref={swiperRef}
//                   style={{ width: "100%", height: "100%" }}
//                 >
//                   {data.media.map((image: any, index: number) => (
//                     <SwiperSlide key={index}>
//                       <div className="relative w-full h-full aspect-video">
//                         <Image
//                           src={
//                             process.env.NEXT_PUBLIC_MEDIA_URL_1 +
//                             "/" +
//                             image.path
//                           }
//                           alt={"image"}
//                           layout="fill"
//                           objectFit="cover"
//                         />
//                       </div>
//                     </SwiperSlide>
//                   ))}
//                 </Swiper>
//               ) : (
//                 <div className="h-full w-full bg-gray-50 flex items-center justify-center">
//                   <PhotoLibraryOutlinedIcon fontSize="large" />
//                 </div>
//               )}
//               {data.media.length > 1 && (
//                 <>
//                   <div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-[2] bg-text-subText bg-opacity-55 rounded-full flex items-center justify-center">
//                     <ChevronLeftOutlinedIcon
//                       fontSize="medium"
//                       className="hover:cursor-pointer text-neutral-200"
//                       onClick={handleNext}
//                     />
//                   </div>
//                   <div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-[2] bg-text-subText bg-opacity-55 rounded-full flex items-center justify-center">
//                     <KeyboardArrowRightOutlinedIcon
//                       fontSize="medium"
//                       className="hover:cursor-pointer text-neutral-200"
//                       onClick={handlePrev}
//                     />
//                   </div>
//                 </>
//               )}
//             </div>
//             <div className="col-span-2 flex flex-col justify-between items-start">
//               <div className="grid grid-cols-1 gap-2">
//                 <span className="text-text-main font-semibold text-base">
//                   {data.title.fa}
//                 </span>
//                 <div className="flex items-center justify-start">
//                   <Rating size="small" value={data.rate || 0} readOnly />
//                 </div>
//                 <div className="flex items-center justify-start">
//                   <span className="text-text-main text-xs text-justify">
//                     {data.communicational.address}
//                   </span>
//                 </div>
//               </div>
//               <span
//                 onClick={() => {
//                   if (data?.communicational.location) {
//                     setOpenAccommodationMap(!openAccommodationMap);
//                   }
//                 }}
//                 className={`${
//                   openAccommodationMap
//                     ? "text-primary-main"
//                     : "opacity-30 text-text-main"
//                 } font-semibold text-sm flex items-center justify-center gap-1 cursor-pointer`}
//               >
//                 {openAccommodationMap && (
//                   <VisibilityIcon fontSize="small" color="primary" />
//                 )}
//                 مشاهده روی نقشه
//               </span>
//             </div>
//           </div>
//           <div className="col-span-1 pb-0 flex flex-col items-center justify-between">
//             <div className="grid grid-cols-1 gap-3">
//               <Button
//                 onClick={moveToAccommodationDetailsPage}
//                 variant="contained"
//                 color="primary"
//                 size="medium"
//                 className="rounded-[10px] min-w-32"
//               >
//                 {selectedAccommodation?.id === data.id &&
//                 selectedAccommodation ? (
//                   "اقدام به رزرو"
//                 ) : typeof data.min_price === "undefined" ? (
//                   "Loading"
//                 ) : (
//                   <>
//                     <div className="flex items-center justify-center">
//                       {formatInputWithCommas(data.min_price)}{" "}
//                     </div>
//                   </>
//                 )}
//               </Button>
//               <span className="text-sm text-text-main opacity-20 flex items-center justify-center font-semibold">
//                 {duration} شب
//               </span>
//             </div>
//             <span
//               onClick={() => {
//                 toggleQuickReserve();
//               }}
//               className="cursor-pointer rounded-tab-down-sm w-4/5 bg-paper text-text-subText text-sm font-semibold h-9 flex items-center justify-center gap-1"
//             >
//               رزرو فوری
//               {isQuickReserveOpen ? (
//                 <KeyboardArrowUpIcon fontSize="small" />
//               ) : (
//                 <KeyboardArrowDownIcon fontSize="small" />
//               )}
//             </span>
//           </div>
//           <div className="col-span-5">{renderRoomsAccommodation()}</div>
//         </div>
//         {renderAccommodationLocation()}
//       </>
//     );
//   };

//   // for type of grid
//   const renderGridCard = () => {
//     return (
//       <div className="grid grid-cols-1 gap-2">
//         <div className="h-48 relative rounded-xl overflow-hidden">
//           {data.media ? (
//             <>
//               {/* <span className="bg-primary-main text-paper absolute top-7 left-0 px-2 rounded-r-2xl z-10 py-1 text-xs">
//                 پیشنهاد ویژه
//               </span> */}
//               <Image
//                 alt=""
//                 fill
//                 className="object-cover"
//                 src={
//                   process.env.NEXT_PUBLIC_MEDIA_URL_1 + "/" + data.media[0].path
//                 }
//               />
//             </>
//           ) : (
//             <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//               <span className="text-sm font-semibold">No image</span>
//             </div>
//           )}
//         </div>
//         <div className="flex items-center justify-start">
//           <Rating size="small" value={data.rate || 0} readOnly />
//         </div>
//         <div className="flex items-center justify-start">
//           <span className="text-text-main font-semibold text-sm">
//             {data.title.fa}
//           </span>
//         </div>
//         <div className="flex items-center justify-start">
//           <Tooltip placement="top" title={data.communicational.address}>
//             <span className="truncate text-xs text-text-main">
//               {data.communicational.address}
//             </span>
//           </Tooltip>
//         </div>
//         <div className="flex items-center justify-start">
//           <span className="text-sm text-text-main font-semibold cursor-pointer">
//             از {formatInputWithCommas(data.min_price)} تومان
//           </span>
//         </div>
//       </div>
//     );
//   };

//   const renderTypeOfCard = () => {
//     switch (typeOfAccommodation) {
//       case "list":
//         return renderListCard();
//       case "grid":
//         return renderGridCard();
//     }
//   };
//   return <>{renderTypeOfCard()}</>;
// };

// export default AccommodationCard;

//

"use client";
import { AccommodationsListDataType } from "@/DataTypes/accommodation/accommodationsListTypes";
import { Box, Button, Rating, Tooltip } from "@mui/material";
import Image from "next/image";
import React, { FC } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Lottie from "lottie-react";
import loadingDot from "../../../../../public/assets/lottie/loading-dot.json";
import { formatInputWithCommas } from "@/global-files/function";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface AccommodationCardProps {
  data: any;
}

const AccommodationCard: FC<AccommodationCardProps> = ({ data }) => {
  const renderItemInDesktop = () => (
    <div
      style={{
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
      className="relative flex flex-col flex-auto shadow overflow-hidden rounded-md mb-[10px] bg-main"
    >
      <div className="w-full grid grid-cols-12 divide-x-reverse divide-x-1">
        <div className="col-span-4 relative overflow-hidden">
          <Image
            className="object-cover"
            src={process.env.NEXT_PUBLIC_MEDIA_URL_1 + "/" + data.media[0].path}
            fill
            alt={data.title.fa}
            loading="lazy"
          />
        </div>
        <div className="w-full col-span-5 p-2 flex flex-col justify-center items-start gap-2">
          <span className="text-text-main font-semibold text-sm">
            {data.title.fa}
          </span>{" "}
          <Rating
            sx={{ direction: "rtl" }}
            name="half-rating-read"
            // defaultValue={item.rate}
            value={data.rate}
            readOnly
            size="small"
          />
          <span className="text-text-main font-semibold text-[10px]">
            {data.communicational.address}
          </span>
        </div>
        <div className="col-span-3 p-2 flex flex-col items-center justify-center gap-1">
          {data.min_price && data.min_price !== 0 ? (
            <span className="text-sm text-text-main font-semibold">
              {`قیمت از ${formatInputWithCommas(
                parseInt((data.min_price / 10) as any)
              )} تومان`}
            </span>
          ) : null}

          <Button
            disabled={!data.min_price}
            // onClick={() =>
            //   props.setOpenRoomsDrawer({
            //     isOpen: true,
            //     item: item,
            //   })
            // }
            variant="contained"
            className="w-full"
          >
            <ExpandMoreIcon />
            <div className="w-full flex items-center justify-end gap-2">
              {data.min_price
                ? "نمایش اتاق ها"
                : data.min_price == 0
                ? "اتاق خالی وجود ندارد"
                : ""}{" "}
              {!data.min_price && data.min_price != 0 && (
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  <Lottie
                    animationData={loadingDot}
                    loop={true}
                    style={{ width: "100%", height: "18px" }}
                  />
                </Box>
              )}
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
  return <div>{renderItemInDesktop()}</div>;
};

export default AccommodationCard;
