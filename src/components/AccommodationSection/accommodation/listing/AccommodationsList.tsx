"use client";
import { useGlobalContext } from "@/context/store";
import React, { FC, useEffect, useRef, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Skeleton,
  TextField,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AppsIcon from "@mui/icons-material/Apps";
import { motion } from "framer-motion";
import ListingAccommodationsProgress from "@/components/Skelton-Components/AccommodationSection/listing/ListingAccommodationsProgress";
import AccommodationCard from "./AccommodationCard";
import InfiniteScroll from "react-infinite-scroll-component";
import ProgressLoading from "@/components/BasUIComponents/ProgressLoading";
import { RoomsDetailsDataType } from "@/DataTypes/accommodation/accommodationsListTypes";
import CloseIcon from "@mui/icons-material/Close";
import moment from "jalali-moment";
import customAxios from "@/utils/customAxios";
import { AccommodationDataType } from "@/DataTypes/accommodation/accommodationTypes";
import {
  calculateNights,
  convertToPersianDate,
  formatInputWithCommas,
} from "@/global-files/function";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { v4 as uuidv4 } from "uuid";
import { isEqual } from "lodash";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ChildCareOutlinedIcon from "@mui/icons-material/ChildCareOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useShowAlert } from "@/hooks/useShowAlert";
// import { FixedSizeList as List, ListChildComponentProps } from "react-window";
// import { AccommodationsListDataType } from "@/DataTypes/accommodation/accommodationsListTypes";

// import InfiniteLoader from "react-window-infinite-loader";
// import { FixedSizeGrid as Grid } from "react-window";

interface AccommodationsListProps {
  fetchMore: boolean;
  page: number;
  fetchAccommodations: (currentPage: number) => void;
  infiniteScrollRef: any;
  hasMore: boolean;
  scrollableDivRef: any;
  showProgressLoading: boolean;
}
const AccommodationsList: FC<AccommodationsListProps> = ({
  fetchMore,
  page,
  fetchAccommodations,
  infiniteScrollRef,
  hasMore,
  scrollableDivRef,
  showProgressLoading,
}) => {
  // initial states
  const [filterTabValue, setFilterTabValue] = useState<string>("1");
  const [openRoomsDialog, setOpenRoomsDialog] = useState<{
    isOpen: boolean;
    item: AccommodationDataType | null;
  }>({
    isOpen: false,
    item: null,
  });
  // const [addedRooms, setAddedRooms] = useState({});
  const {
    accommodationsLoading,
    filteredSearchAccommodationsList,
    typeOfAccommodation,
    setTypeOfAccommodation,
    addedRooms,
    setAddedRooms,
  } = useGlobalContext().accommodationContext.accommodationSearch;

  const handleAddedRooms = (accoId: any, rooms: any) => {
    // if (rooms.length) {
    //   setAddedRooms((prev) => ({ ...prev, [accoId]: rooms }));
    // } else {
    //   let { [accoId]: _, ...rest } = addedRooms;
    //   setAddedRooms(rest);
    // }
    setAddedRooms(rooms);
  };

  useEffect(() => {
    console.log("addedRooms", addedRooms);
  }, [addedRooms]);

  const handleCloseRoomsDrawer = () => {
    setOpenRoomsDialog({
      isOpen: false,
      item: null,
    });
  };

  // handle change of filter tab
  const handleFilterTabChange = (newValue: string) => {
    setFilterTabValue(newValue);
  };

  // for handle change type of Show list
  const handleTypesOfShowList = (action: string) => {
    switch (action) {
      case "list":
        setTypeOfAccommodation(action);
      case "grid":
        setTypeOfAccommodation(action);
      default:
        console.warn("Invalid action type:", action);
    }
  };

  // for filter tabs
  const renderFilterTab = () => {
    const filtersOptions = [
      { id: "1", label: "پیش فرض" },
      { id: "2", label: "ارزانترین" },
      { id: "3", label: "گرانترین" },
      { id: "4", label: "بالاترین امتیاز" },
    ];
    return (
      <>
        <div className="col-span-7 grid grid-cols-8 gap-0">
          {filtersOptions.map((tab) => {
            const isActive = filterTabValue === tab.id;
            return (
              <span
                key={tab.id}
                onClick={() => handleFilterTabChange(tab.id)}
                className={`truncate col-span-2 text-sm hover:cursor-pointer flex items-center justify-center font-semibold h-9 rounded-tab-up-sm ${
                  isActive
                    ? "bg-main text-primary-main"
                    : "bg-paper text-text-subText"
                }`}
              >
                {tab.label}
              </span>
            );
          })}
        </div>
      </>
    );
  };
  useEffect(() => {
    console.log("filteredSearchAccommodationsList", {
      filteredSearchAccommodationsList,
      accommodationsLoading,
    });
  }, [filteredSearchAccommodationsList, accommodationsLoading]);
  // render accommodations
  const renderAccommodations = () => {
    return (
      <>
        <InfiniteScroll
          ref={infiniteScrollRef}
          dataLength={filteredSearchAccommodationsList.length}
          next={fetchAccommodations}
          hasMore={hasMore}
          scrollThreshold={1}
          loader={<ListingAccommodationsProgress />}
          className="!overflow-hidden"
        >
          {filteredSearchAccommodationsList
            .filter((elm) => elm.min_price !== 0)
            .map((item, index) => (
              // <HotelItemCard
              //   item={item}
              //   key={index}
              //   setOpenRoomsDrawer={setOpenRoomsDrawer}
              // />
              <AccommodationCard
                data={item}
                key={index}
                setOpenRoomsDialog={setOpenRoomsDialog}
              />
            ))}
        </InfiniteScroll>
        {!hasMore && filteredSearchAccommodationsList.length > 0 && (
          <div>
            {filteredSearchAccommodationsList
              .filter((elm) => elm.min_price == 0)
              .map((item, index) => (
                // <HotelItemCard
                //   item={item}
                //   key={index}
                //   setOpenRoomsDrawer={setOpenRoomsDrawer}
                // />
                <AccommodationCard
                  data={item}
                  key={index}
                  setOpenRoomsDialog={setOpenRoomsDialog}
                />
              ))}
          </div>
        )}
      </>
    );
  };

  // for Desktop
  const renderOnDesktop = () => {
    return (
      <>
        {showProgressLoading && <ProgressLoading />}

        <div className="hidden md:grid grid-cols-1 gap-2">
          <div className="flex items-center justify-start">
            <span className="text-text-subText text-base flex items-center justify-center gap-0">
              <span>رزرو</span>
              <KeyboardArrowLeftIcon fontSize="small" />
              <span>هتل</span>
            </span>
          </div>
          <div className="bg-paper rounded-xl px-5 pb-3 grid grid-cols-1 gap-3">
            <div className="grid grid-cols-10 gap-5">
              <div className="col-span-1 flex items-center justify-center gap-1">
                <span className="text-text-main text-sm truncate font-semibold">
                  مرتب سازی
                </span>
              </div>
              {renderFilterTab()}
              <div className="col-span-2 flex items-end">
                <div className="w-full flex items-center justify-center gap-0 py-0 px-2 rounded-lg bg-main mt-2 h-8">
                  <span className="text-text-main text-xs font-semibold">
                    نوع نمایش
                  </span>
                  <IconButton
                    size="small"
                    // onClick={() => {
                    //   handleTypesOfShowList("list");
                    // }}
                  >
                    {typeOfAccommodation === "list" ? (
                      <MenuIcon fontSize="small" color="primary" />
                    ) : (
                      <MenuIcon fontSize="small" />
                    )}
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => {
                      handleTypesOfShowList("grid");
                    }}
                  >
                    {typeOfAccommodation === "grid" ? (
                      <AppsIcon fontSize="small" color="primary" />
                    ) : (
                      <AppsIcon fontSize="small" />
                    )}
                  </IconButton>
                </div>
              </div>
              <div className="col-span-10" ref={scrollableDivRef}>
                {showProgressLoading ? (
                  <ListingAccommodationsProgress />
                ) : filteredSearchAccommodationsList.length > 0 ? (
                  renderAccommodations()
                ) : (
                  <div className="flex items-center justify-center min-h-52 w-full">
                    <span className="text-base font-semibold">
                      هتلی جهت نمایش وجود ندارد
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {openRoomsDialog.isOpen && (
          <RoomListDialog
            openDialog={openRoomsDialog.isOpen}
            accommodationId={openRoomsDialog.item?.id as string | number}
            closeDialog={handleCloseRoomsDrawer}
            item={openRoomsDialog.item as AccommodationDataType}
            addedRooms={addedRooms}
            setAddedRooms={setAddedRooms}
            onAdd={handleAddedRooms}
          />
        )}
      </>
    );
  };

  // for Mobile
  const renderOnMobile = () => {
    return <></>;
  };

  return (
    <>
      {renderOnDesktop()}
      {renderOnMobile()}
    </>
  );
};

export default AccommodationsList;

interface RoomListDialogProps {
  openDialog: boolean;
  closeDialog: () => void;
  accommodationId: number | string;
  jsonData?: any;
  item: AccommodationDataType;
  addedRooms: any;
  setAddedRooms: any;
  onAdd: any;
  // selectedRooms: any;
  // setSelectedRooms: any;
}
const RoomListDialog: FC<RoomListDialogProps> = ({
  accommodationId,
  closeDialog,
  openDialog,
  jsonData,
  item,
  addedRooms,
  setAddedRooms,
  onAdd,
  // selectedRooms,
  // setSelectedRooms,
}) => {
  // initial states
  const [rooms, setRooms] = useState<any>([]);
  const [showRoomsLoading, setShowRoomsLoading] = useState<boolean>(true);
  const [selectedRooms, setSelectedRooms] = useState(addedRooms);
  const {
    accommodationFromDate,
    accommodationToDate,
    accommodationPassengersCapacity,
    setAccommodationFromDate,
    setAccommodationToDate,
    // selectedRooms,
    // setSelectedRooms,
  } = useGlobalContext().accommodationContext.accommodationSearch;
  const {
    capacitySelectedAccommodation,
    setCapacitySelectedAccommodation,
    wentFlightCapacity,
    returnFlightCapacity,
    setSearchListTab,
  } = useGlobalContext().flightAccommodationContext.flightAccommodationSearch;
  const { selectedReturnFlight, selectedWentFlight } =
    useGlobalContext().flightContext.searchContext;
  const { setShowAlertDetails, searchType } = useGlobalContext().global;

  const [itemsTrigger, setItemsTrigger] = useState(false);

  const searchParams = useSearchParams();
  const json = useRef(null);
  const router = useRouter();

  // handle clear selected rooms
  // useEffect(() => {
  // return () => {
  // setCapacitySelectedAccommodation(0);
  // setSelectedRooms([]);
  // setAddedRooms([]);
  // };
  // }, []);

  // handle get rooms
  const getRooms = () => {
    const sumPassengerCapacity =
      accommodationPassengersCapacity.adultCapacity +
      accommodationPassengersCapacity.childCapacity;
    setShowRoomsLoading(true);
    json.current = jsonData
      ? jsonData
      : {
          // accommodation_id: 425,
          accommodation_id: accommodationId,
          checkin_date: moment(
            new URLSearchParams(window.location.search).get("departing"),
            "jYYYY-jMM-jDD"
          ).format("YYYY-MM-DD"),
          checkout_date: moment(
            new URLSearchParams(window.location.search).get("returning"),
            "jYYYY-jMM-jDD"
          ).format("YYYY-MM-DD"),
          passenger_count: sumPassengerCapacity,
        };

    console.log("sent data", json.current);

    customAxios
      .get(`/online/accommodation/get_room_type_prices`, {
        params: json.current,
      })
      .then((response) => {
        console.log("response get rooms", response.data);
        const newData = {
          Data: response.data.Data.flatMap((item: any) =>
            item.board_type_list
              ? item.board_type_list.map((board: any) => ({
                  ...item,
                  uuid: uuidv4(),
                  board_type_list: board,
                }))
              : [item]
          ),
        };

        console.log("newRooms", newData);

        setRooms(newData);
        setShowRoomsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log("room lst", rooms);
  }, [rooms]);

  useEffect(() => {
    if (accommodationId) {
      getRooms();
    }
  }, [accommodationId]);

  // handle flight-accommodation selected room
  const handleAccommodationSelectedRoom = (room: any) => {
    const tempRoom = {
      room_type: { ...room },
      ...item,
      type: "accommodation",
      details: {
        ...item.details,
        from_date: accommodationFromDate,
        to_date: accommodationToDate,
        note: "",
      },
      validated: true,
    };

    console.log("temproom", tempRoom);

    const currentHotelId = tempRoom.id;

    const isDifferentHotel =
      selectedRooms.length > 0 && selectedRooms[0].id !== currentHotelId;

    console.log("currentHotelId", currentHotelId);

    let tempExistingRoom = null;
    const isRoomAlreadyAdded = selectedRooms.some((existingItem: any) => {
      tempExistingRoom = { ...existingItem };
      delete tempExistingRoom["uuid"];
      return isEqual(tempExistingRoom, tempRoom);
    });

    if (
      !isRoomAlreadyAdded ||
      (isRoomAlreadyAdded &&
        selectedRooms.filter(
          (elm: any) =>
            elm.id === tempRoom.id &&
            tempRoom.room_type.uuid === elm.room_type.uuid
        ).length < tempRoom.room_type.capacity.purchase)
    ) {
      if (isDifferentHotel) {
        setSelectedRooms([{ ...tempRoom, uuid: uuidv4() }]);
        setCapacitySelectedAccommodation(1);
      } else {
        setSelectedRooms((prevItems: any) => [
          ...prevItems,
          { ...tempRoom, uuid: uuidv4() },
        ]);
        setCapacitySelectedAccommodation((prev: number) => prev + 1);
      }
    } else {
      setShowAlertDetails({
        alertMessage: "اتاق خالی موجود نیست",
        alertType: "error",
        showAlert: true,
      });
    }
  };

  // handle flight-accommodation selected room
  const handleFlightAccommodationSelectedRoom = (room: any) => {
    const tempRoom = {
      room_type: { ...room },
      ...item,
      type: "accommodation",
      details: {
        ...item.details,
        from_date: accommodationFromDate,
        to_date: accommodationToDate,
      },
    };

    let tempExistingRoom = null;
    const isRoomAlreadyAdded = selectedRooms.some((existingItem: any) => {
      tempExistingRoom = { ...existingItem };
      delete tempExistingRoom["uuid"];
      return isEqual(tempExistingRoom, tempRoom);
    });

    const currentHotelId = tempRoom.id;

    const isDifferentHotel =
      selectedRooms.length > 0 && selectedRooms[0].id !== currentHotelId;

    const flightCapacity =
      selectedWentFlight && !selectedReturnFlight
        ? wentFlightCapacity
        : selectedReturnFlight && !selectedWentFlight
        ? returnFlightCapacity
        : selectedReturnFlight && selectedWentFlight
        ? Math.min(wentFlightCapacity, returnFlightCapacity)
        : false;

    console.log("flightCapacity", flightCapacity);

    if (flightCapacity) {
      if (capacitySelectedAccommodation < flightCapacity) {
        if (
          !isRoomAlreadyAdded ||
          (isRoomAlreadyAdded &&
            selectedRooms.filter(
              (elm: any) =>
                elm.id === tempRoom.id &&
                tempRoom.room_type.uuid === elm.room_type.uuid
            ).length < tempRoom.room_type.capacity.purchase)
        ) {
          if (isDifferentHotel) {
            setSelectedRooms([{ ...tempRoom, uuid: uuidv4() }]);
            setCapacitySelectedAccommodation(1);
          } else {
            setSelectedRooms((prevItems: any) => [
              ...prevItems,
              { ...tempRoom, uuid: uuidv4() },
            ]);
            setCapacitySelectedAccommodation((prev: number) => prev + 1);
          }
        } else {
          setShowAlertDetails({
            alertMessage: "اتاق خالی موجود نیست",
            alertType: "error",
            showAlert: true,
          });
        }
      } else {
        setShowAlertDetails({
          showAlert: true,
          alertType: "error",
          alertMessage:
            "تعداد مسافران خود بیشتر از تعداد ظرفیت بلیت پرواز انتخاب شده میباشد",
        });
      }
    } else {
      if (
        !isRoomAlreadyAdded ||
        (isRoomAlreadyAdded &&
          selectedRooms.filter(
            (elm: any) =>
              elm.id === tempRoom.id &&
              tempRoom.room_type.uuid === elm.room_type.uuid
          ).length < tempRoom.room_type.capacity.purchase)
      ) {
        if (isDifferentHotel) {
          setSelectedRooms([{ ...tempRoom, uuid: uuidv4() }]);
          setCapacitySelectedAccommodation(1);
        } else {
          setSelectedRooms((prevItems: any) => [
            ...prevItems,
            { ...tempRoom, uuid: uuidv4() },
          ]);
          setCapacitySelectedAccommodation((prev: number) => prev + 1);
        }
      } else {
        setShowAlertDetails({
          alertMessage: "اتاق خالی موجود نیست",
          alertType: "error",
          showAlert: true,
        });
      }
    }
  };

  useEffect(() => {
    console.log({
      wentFlightCapacity,
      returnFlightCapacity,
      capacitySelectedAccommodation,
    });
  }, [selectedReturnFlight, selectedWentFlight]);

  // handle selected room type of search field object
  const selectedRoomFieldObject: {
    [key: string]: (room: any) => void;
  } = {
    accommodation: handleAccommodationSelectedRoom,
    "flight-accommodation": handleFlightAccommodationSelectedRoom,
  };

  const handleSelectRoom = (room: any) => {
    selectedRoomFieldObject[searchType](room);
  };

  function handleDeleteSelectedRoom(id: string) {
    const roomToDelete = selectedRooms.find(
      (element: any) => element.uuid === id
    );

    if (roomToDelete) {
      const { passengers } = roomToDelete.room_type;
      const totalToDecrease = (passengers.adult || 0) + (passengers.child || 0);

      setCapacitySelectedAccommodation(
        (prev: number) => prev - totalToDecrease
      );
    }

    const newArray = selectedRooms.filter(
      (element: any) => element.uuid !== id
    );
    setSelectedRooms(newArray);
  }

  // on accommodation
  const accommodationCreateSearchparams = (roomList: any) => {
    return {
      data: roomList,
      system_id: false,
      messages: JSON.stringify([]),
      time: Date.now(),
    };
  };

  // on flight accommodation
  const flightAccommodationCreateSearchparams = (roomList: any) => {
    return {
      data: roomList,
      system_id: false,
      messages: JSON.stringify([]),
      time: Date.now(),
      wentTicket: selectedWentFlight,
      returnTicket: selectedReturnFlight,
      departureDate: searchParams.get("departing"),
      returningDate: searchParams.get("returning"),
    };
  };

  const createSearchParamsFieldObject: {
    [key: string]: (roomList: any) => any;
  } = {
    accommodation: accommodationCreateSearchparams,
    "flight-accommodation": flightAccommodationCreateSearchparams,
  };

  const createSearchparams = (roomList: any) => {
    return createSearchParamsFieldObject[searchType](roomList);
  };

  const setUrl = (id: string) => {
    router.push(`/accommodation/checkout?factor=${id}`);
  };

  useEffect(() => {
    console.log("selectedRooms", selectedRooms);
  }, [selectedRooms]);
  useEffect(() => {
    console.log("addedRooms", addedRooms);
  }, []);

  useEffect(() => {
    console.log("capacitySelectedAccommodation", capacitySelectedAccommodation);
  }, [capacitySelectedAccommodation]);

  // handle accommodation checkout page
  const handleAccommodationCheckout = (accoId: any) => {
    onAdd(accoId, selectedRooms);
    closeDialog();

    const local_id = uuidv4().substr(0, 6);
    setUrl(local_id);
    // const rooms = Object.values(addedRooms).flat();
    const rooms = selectedRooms;
    const queryParams = createSearchparams(rooms);
    // console.log("987987987", searchType);
    console.log("addedRooms", addedRooms);

    console.log("queryParams", queryParams);
    console.log("rooms", rooms);

    localStorage.setItem(local_id, JSON.stringify(queryParams));
  };

  // handle flight accommodation checkout page
  const handleFlightAccommodationCheckout = (accoId: any) => {
    if (selectedWentFlight && selectedReturnFlight) {
      onAdd(accoId, selectedRooms);
      closeDialog();

      const local_id = uuidv4().substr(0, 6);
      setUrl(local_id);
      // const rooms = Object.values(addedRooms).flat();
      const rooms = selectedRooms;
      const queryParams = createSearchparams(rooms);
      // console.log("987987987", searchType);
      console.log("addedRooms", addedRooms);

      console.log("queryParams", queryParams);
      console.log("rooms", rooms);

      localStorage.setItem(local_id, JSON.stringify(queryParams));
    } else {
      onAdd(selectedRooms);
      closeDialog();
      setSearchListTab("accommodation");
      // console.log("987987987", searchType);
      console.log("addedRooms", addedRooms);

      console.log("rooms", rooms);
    }
  };

  // handle move to checkout page field type object
  const moveToCheckoutPageFieldObject: {
    [key: string]: (roomList: any) => void;
  } = {
    accommodation: handleAccommodationCheckout,
    "flight-accommodation": handleFlightAccommodationCheckout,
  };

  // move to checkout passenger page
  const handleMoveToCheckoutPage = (
    searchType: "accommodation" | "flight-accommodation",
    accoId: any
  ) => {
    moveToCheckoutPageFieldObject[searchType](accoId);
  };

  useEffect(() => {
    console.log("rooms@@@", rooms);
  }, [selectedRooms]);

  // render on desktop
  const renderDesktop = () => (
    <Dialog
      open={openDialog}
      fullWidth
      // maxWidth="lg"
      PaperProps={{
        sx: { maxWidth: "1100px", width: "100%", maxHeight: 600 },
      }}
    >
      <DialogTitle className="text-text-primary text-base">{`اتاق های موجود در اقامتگاه ${item.title.fa}`}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={closeDialog}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ overflowY: "hidden" }}>
        <div className="grid grid-cols-3 gap-8">
          <div className="h-[450px] col-span-2 space-y-3 overflow-y-auto">
            {!showRoomsLoading ? (
              rooms.Data.length > 0 ? (
                rooms.Data.sort(
                  (a: any, b: any) =>
                    (a.board_type_list !== false ? -1 : 1) -
                    (b.board_type_list !== false ? -1 : 1)
                ).map((room: any) => (
                  <RoomItem
                    key={room.id}
                    item={room}
                    handleSelectRoom={handleSelectRoom}
                    selectedRooms={selectedRooms}
                    onDelete={handleDeleteSelectedRoom}
                  />
                ))
              ) : (
                <div className="text-text-main font-semibold text-lg h-full flex items-center justify-center">
                  <span> اتاقی جهت نمایش موجود نیست</span>
                </div>
              )
            ) : (
              Array.from(new Array(4)).map((_, index) => (
                <LoadingRoomItem key={index} />
              ))
            )}
          </div>
          <div className="h-[450px] col-span-1 flex flex-col gap-2 bg-main rounded-md p-3 relative">
            <span className="text-text-main font-bold text-sm">
              اتاق های انتخابی
            </span>
            {selectedRooms.length > 0 ? (
              <div className="space-y-3 flex-1 overflow-y-auto overflow-x-hidden">
                {selectedRooms.map((elm: any, index: number) => {
                  console.log("elmmmmmmmmmmmm", elm.uuid);
                  // return <>{elm.uuid}</>;
                  return (
                    <SelectedRoomItem
                      key={elm.uuid}
                      item={elm}
                      index={index}
                      fromDate={accommodationFromDate}
                      toDate={accommodationToDate}
                      onDelete={handleDeleteSelectedRoom}
                      selectedRooms={selectedRooms}
                      setSelectedRooms={setSelectedRooms}
                      itemsTrigger={itemsTrigger}
                      setItemsTrigger={setItemsTrigger}
                    />
                  );
                })}
                <div className="flex items-center justify-between px-5">
                  <span className="text-text-main font-bold text-sm">
                    مجموع
                  </span>
                  <span className="text-text-main font-bold text-sm">
                    {`${formatInputWithCommas(
                      selectedRooms.reduce(
                        (acc: any, curr: any) =>
                          acc +
                          parseInt(
                            // calculateRoomPrice(curr.room_type)
                            curr.room_type.board_type_list.financial_total
                              .net_price +
                              curr.room_type.board_type_list.financial_total
                                .extra_bed_price *
                                curr.room_type.passengers.extra +
                              curr.room_type.board_type_list.financial_total
                                .child_price *
                                curr.room_type.passengers.extra_child

                            // curr.room_type.board_type_list.financial_total
                            //   .net_price
                          ),
                        0
                      )
                    )} ریال`}
                  </span>
                </div>
              </div>
            ) : (
              <div className="relative w-full flex flex-1 flex-col items-center justify-center">
                <Image
                  loading="lazy"
                  className="object-cover"
                  alt=""
                  width={70}
                  height={70}
                  src={"/assets/images/accommodationSection/hotel-key.svg"}
                />
                <p className="text-text-main font-bold text-sm">
                  اتاق مورد نظر خود را انتخاب کنید.
                </p>
              </div>
            )}
            <Button
              size="large"
              variant="contained"
              disabled={!selectedRooms.length}
              className="w-full"
              onClick={() => {
                let itemsValidated = true;
                selectedRooms.forEach((element: any) => {
                  if (element.validated === false) itemsValidated = false;
                });
                if (itemsValidated) {
                  handleMoveToCheckoutPage(
                    searchType === "flight-accommodation"
                      ? "flight-accommodation"
                      : "accommodation",
                    item.id
                  );
                  // onClose();
                } else {
                  setItemsTrigger(true);
                  setShowAlertDetails({
                    showAlert: true,
                    alertType: "error",
                    alertMessage: "لطفا فیلدهای ضروری را به درستی وارد کنید",
                  });
                }
              }}
            >
              {!selectedRooms.length ? "افزودن" : "ادامه فرآیند رزرو"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return <>{renderDesktop()}</>;
};

const LoadingRoomItem = () => {
  return (
    <div className="rounded-[15px] py-10 px-16 grid grid-cols-5 border">
      <div className="col-span-4 flex items-center gap-10">
        <Skeleton variant="rounded" width={60} height={60} />
        <div className="flex flex-col gap-10">
          <Skeleton variant="rounded" height={5} width="80%" />
          <div className="flex items-center gap-3">
            <Skeleton variant="rounded" width={60} height={15} />
            <Skeleton variant="rounded" width={70} height={15} />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-8 col-span-1">
        <Skeleton variant="rounded" height={5} width="80%" />
        <Skeleton variant="rounded" width={"100%"} height={30} />
      </div>
    </div>
  );
};

interface RoomItemProps {
  item: any;
  handleSelectRoom: any;
  selectedRooms: any;
  onDelete: any;
}

const RoomItem: FC<RoomItemProps> = ({
  item,
  handleSelectRoom,
  selectedRooms,
  onDelete,
}) => {
  const isMDUp = useMediaQuery((theme: any) => theme.breakpoints.up("md"));
  const from = new URLSearchParams(window.location.search).get("departing");
  const to = new URLSearchParams(window.location.search).get("returning");
  const { accommodationPassengersCapacity } =
    useGlobalContext().accommodationContext.accommodationSearch;
  const isSelected = selectedRooms.some(
    (elm: any) =>
      elm.room_type.uuid === item.uuid &&
      elm.room_type.board_type_list.id === item.board_type_list.id
  );
  const selectedNumber = selectedRooms.filter(
    (elm: any) =>
      elm.room_type.uuid === item.uuid &&
      elm.room_type.board_type_list.id === item.board_type_list.id
  ).length;

  return (
    <div className="bg-main rounded-md grid grid-cols-3 md:grid-cols-4 gap-x-1 p-2">
      <div className="w-full col-span-2 md:col-span-3 flex items-center gap-2">
        <Image
          className="object-cover"
          width={80}
          height={80}
          alt=""
          src={"/assets/images/accommodationSection/roombed.svg"}
        />
        <div className="flex-1 grid grid-cols-1 gap-3">
          <Tooltip title={item.title.fa}>
            <span className="block text-text-primary text-sm font-semibold truncate w-full">
              {item.title.fa}
            </span>
          </Tooltip>
          {item.board_type_list && (
            <div className="flex items-center justify-start">
              <Chip
                label={
                  item.board_type_list.title.fa || item.board_type_list.title.en
                }
                size="small"
                color="primary"
              />
              {/* <span className="badge badge-outline-primary rounded-full whitespace-nowrap text-xs">
                {item.board_type_list.title.fa || item.board_type_list.title.en}
              </span> */}
            </div>
          )}
        </div>
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center gap-2">
        {item.board_type_list && (
          <span className="text-sm text-text-main">
            {isSelected
              ? "تعداد اتاق"
              : `قیمت برای ${calculateNights(from, to, "jYYYY-jMM-jDD")} شب`}
          </span>
        )}
        {isSelected ? (
          <div className="w-full flex items-center justify-between">
            <Button
              size="small"
              variant="contained"
              className=""
              disabled={selectedNumber == item.capacity.purchase}
              onClick={() =>
                handleSelectRoom({
                  ...item,
                  passengers: {
                    adult: 1,
                    child: 0,
                    extra_child: 0,
                    infant: 0,
                    extra_infant: 0,
                    extra: 0,
                  },
                  children_age: [],
                })
              }
            >
              <AddIcon />
            </Button>
            <span className="text-sm text-text-main">{`${selectedNumber} اتاق`}</span>
            <Button
              size="small"
              variant="contained"
              onClick={() => {
                onDelete(
                  selectedRooms.find(
                    (elm: any) =>
                      elm.room_type.uuid === item.uuid &&
                      elm.room_type.board_type_list.id ===
                        item.board_type_list.id
                  ).uuid
                );
              }}
              disabled={selectedNumber == 1}
            >
              <RemoveIcon />
            </Button>
          </div>
        ) : (
          <Button
            variant="contained"
            size="small"
            className="rounded-lg"
            disabled={!item.board_type_list}
            onClick={() =>
              handleSelectRoom({
                ...item,
                passengers: {
                  adult: 1,
                  child: 0,
                  extra_child: 0,
                  infant: 0,
                  extra_infant: 0,
                  extra: 0,
                },
                children_age: [],
              })
            }
          >
            {item.board_type_list ? (
              <>
                {formatInputWithCommas(
                  parseInt(item.board_type_list.financial_total.net_price)
                )}
                &nbsp;<span className="text-[11px]">ریال</span>
              </>
            ) : (
              "تکمیل ظرفیت"
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

interface SelectedRoomItemProps {
  item: any;
  fromDate: any;
  toDate: any;
  index: number;
  onDelete: any;
  selectedRooms: any;
  setSelectedRooms: any;
  itemsTrigger: boolean;
  setItemsTrigger: any;
}
const SelectedRoomItem: FC<SelectedRoomItemProps> = ({
  item,
  fromDate,
  toDate,
  index,
  onDelete,
  selectedRooms,
  setSelectedRooms,
  itemsTrigger,
  setItemsTrigger,
}) => {
  // initial states
  const [adultCount, setAdultCount] = useState(item.room_type.passengers.adult);
  const [childCount, setChildCount] = useState(
    item.room_type.passengers.child +
      item.room_type.passengers.infant +
      item.room_type.passengers.extra_child +
      item.room_type.passengers.extra_infant
  );
  const [extraBed, setExtraBed] = useState(item.room_type.passengers.extra);
  const [childrenAge, setChildrenAge] = useState(
    item.room_type.children_age || []
  );

  const {
    setCapacitySelectedAccommodation,
    capacitySelectedAccommodation,
    wentFlightCapacity,
    returnFlightCapacity,
  } = useGlobalContext().flightAccommodationContext.flightAccommodationSearch;
  const { selectedWentFlight, selectedReturnFlight } =
    useGlobalContext().flightContext.searchContext;
  const { searchType, setShowAlertDetails } = useGlobalContext().global;

  const schema = yup.object().shape({
    children: yup
      .array()
      .of(
        yup
          .number()
          .required()
          .min(0, "سن نمی‌تواند منفی باشد")
          .max(
            item.room_type.age.child || 6,
            `سن کودک حداکثر ${item.room_type.age.child || 6} سال است`
          )
      )
      .required(),
  });
  const {
    control,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      children: [],
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    console.log("errors", errors);
  }, [errors]);

  useEffect(() => {
    item["validated"] = isValid;
  }, [isValid]);

  useEffect(() => {
    if (itemsTrigger) {
      trigger();
      setItemsTrigger(false);
    }
  }, [itemsTrigger]);

  function classifyPassengers() {
    let remainingAdultCapacity = item.room_type.beds - adultCount;

    let passengers = {
      adult: adultCount,
      child: 0,
      infant: 0,
      extra: extraBed,
      extra_child: 0,
      extra_infant: 0,
    };

    const sorted = [...childrenAge].sort((a, b) => {
      return b - a;
    });

    sorted.forEach((age) => {
      const isInfant = age < item.room_type.age.infant;
      if (remainingAdultCapacity > 0) {
        if (isInfant) passengers.infant += 1;
        else passengers.child += 1;
        remainingAdultCapacity--;
      } else {
        if (isInfant) passengers.extra_infant += 1;
        else passengers.extra_child += 1;
      }
    });
    item.room_type.passengers = { ...passengers };
    // setSelectedRooms((prevRooms: any[]) => {
    //   return prevRooms.map((room) => {
    //     if (room.uuid === item.uuid) {
    //       return {
    //         ...room,
    //         room_type: {
    //           ...room.room_type,
    //           passengers: { ...passengers },
    //         },
    //       };
    //     }
    //   });
    // });
  }

  useEffect(() => {
    classifyPassengers();
  }, [childCount, childrenAge]);

  const handleChangeChildrenAge = (count: any) => {
    setChildrenAge((prev: any) => {
      const newAges = [...prev.slice(0, count)];
      while (newAges.length < count) {
        newAges.push(null);
      }
      return newAges;
    });
  };

  const handleAgeChange = (index: any, newValue: any) => {
    const updatedAges = [...childrenAge];
    let value: any = newValue ? Number(newValue) : null;
    updatedAges[index] = value;
    setValue(`children.${index}`, value);
    trigger(`children.${index}`);
    setChildrenAge(updatedAges);
    item.room_type.children_age = updatedAges;
  };

  // useEffect(() => {
  //   console.log("room Price", calculateRoomPrice(item.room_type));
  // }, [adultCount, childCount, childrenAge]);

  // handle add passenger accommodation type
  const handleAccommodationAddPassenger = (ageCategory: "child" | "adult") => {
    setSelectedRooms((prevRooms: any[]) =>
      prevRooms.map((room, index) => {
        if (room.uuid === item.uuid) {
          return {
            ...room,
            room_type: {
              ...room.room_type,
              passengers: {
                ...room.room_type.passengers,
                [ageCategory]: room.room_type.passengers[ageCategory] + 1,
              },
            },
          };
        }
        return room;
      })
    );
  };

  // handle add passenger flight accommodation type
  const handleFlightAccommodationAddPassenger = (
    ageCategory: "child" | "adult"
  ) => {
    const flightCapacity =
      selectedWentFlight && !selectedReturnFlight
        ? wentFlightCapacity
        : selectedReturnFlight && !selectedWentFlight
        ? returnFlightCapacity
        : selectedReturnFlight && selectedWentFlight
        ? Math.min(wentFlightCapacity, returnFlightCapacity)
        : false;
    if (flightCapacity) {
      if (capacitySelectedAccommodation < flightCapacity) {
        setCapacitySelectedAccommodation((prev: number) => prev + 1);
        setSelectedRooms((prevRooms: any[]) =>
          prevRooms.map((room, index) => {
            if (room.uuid === item.uuid) {
              return {
                ...room,
                room_type: {
                  ...room.room_type,
                  passengers: {
                    ...room.room_type.passengers,
                    [ageCategory]: room.room_type.passengers[ageCategory] + 1,
                  },
                },
              };
            }
            return room;
          })
        );
      } else {
        setShowAlertDetails({
          showAlert: true,
          alertType: "error",
          alertMessage:
            "تعداد مسافران خود بیشتر از تعداد ظرفیت بلیت پرواز انتخاب شده میباشد",
        });
      }
    } else {
      setCapacitySelectedAccommodation((prev: number) => prev + 1);
      setSelectedRooms((prevRooms: any[]) =>
        prevRooms.map((room, index) => {
          if (room.uuid === item.uuid) {
            return {
              ...room,
              room_type: {
                ...room.room_type,
                passengers: {
                  ...room.room_type.passengers,
                  [ageCategory]: room.room_type.passengers[ageCategory] + 1,
                },
              },
            };
          }
          return room;
        })
      );
    }
  };

  // handle add passengers search type field
  const addPassengersFieldObject: {
    [key: string]: (ageCategory: "child" | "adult") => void;
  } = {
    accommodation: handleAccommodationAddPassenger,
    "flight-accommodation": handleFlightAccommodationAddPassenger,
  };

  // handle add room passengers
  const handleAddRoomPassengers = (ageCategory: "child" | "adult") => {
    addPassengersFieldObject[searchType](ageCategory);
  };
  // handle delete room passengers
  const handleDeleteRoomPassengers = (ageCategory: string) => {
    setCapacitySelectedAccommodation((prev: number) => prev - 1);
    setSelectedRooms((prevRooms: any[]) =>
      prevRooms.map((room, index) => {
        if (room.uuid === item.uuid) {
          return {
            ...room,
            room_type: {
              ...room.room_type,
              passengers: {
                ...room.room_type.passengers,
                [ageCategory]: room.room_type.passengers[ageCategory] - 1,
              },
            },
          };
        }
        return room;
      })
    );
  };

  // handle add extra bed
  const handleAddExtraBed = () => {
    setSelectedRooms((prevRooms: any[]) =>
      prevRooms.map((room, index) => {
        if (room.uuid === item.uuid) {
          return {
            ...room,
            room_type: {
              ...room.room_type,
              passengers: {
                ...room.room_type.passengers,
                extra: room.room_type.passengers.extra + 1,
              },
            },
          };
        }
      })
    );
  };

  // handle delete extra bed
  const handleDeleteExtraBed = () => {
    setSelectedRooms((prevRooms: any[]) =>
      prevRooms.map((room, index) => {
        if (room.uuid === item.uuid) {
          return {
            ...room,
            room_type: {
              ...room.room_type,
              passengers: {
                ...room.room_type.passengers,
                extra: room.room_type.passengers.extra - 1,
              },
            },
          };
        }
      })
    );
  };

  return (
    <div className="w-full rounded-md border border-primary-main divide-y divide-primary-main">
      <div className="flex items-center justify-between p-1 px-3">
        <div className="rounded-full py-2 text-text-primary font-medium text-xs whitespace-nowrap">
          {`اتاق ${index + 1}`}
        </div>
        <Tooltip title={item.room_type.title.fa}>
          <span className="text-text-primary font-bold text-[14px] truncate">
            {item.room_type.title.fa}
          </span>
        </Tooltip>
        <IconButton onClick={() => onDelete(item.uuid)}>
          <CloseIcon className="text-primary-main" fontSize="small" />
        </IconButton>
      </div>
      <div className="grid grid-cols-1 gap-3 p-2">
        <div className="grid grid-cols-1 gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-1">
              <PeopleAltOutlinedIcon fontSize="small" />
              <span className="text-xs font-semibold text-text-main">
                بزرگسال
              </span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <IconButton
                // onClick={() => handleAddRoomPassengers("adult")}
                // disabled={
                //   item.room_type.passengers.adult ===
                //   item.room_type.capacity.adult
                // }
                onClick={() => {
                  // item.room_type.passengers.adult = adultCount + 1;
                  handleAddRoomPassengers("adult");
                  setAdultCount((prev: any) => prev + 1);
                }}
                disabled={
                  item.room_type.beds -
                    Math.max(0, childCount - item.room_type.capacity.child) ===
                  adultCount
                  // item.room_type.capacity.adult === adultCount
                }
                size="small"
                color="primary"
              >
                <AddOutlinedIcon fontSize="small" />
              </IconButton>
              <span className="text-sm text-text-main">
                {/* {item.room_type.passengers.adult} */}
                {adultCount}
              </span>
              <IconButton
                // onClick={() => handleDeleteRoomPassengers("adult")}
                // disabled={item.room_type.passengers.adult === 1}
                onClick={() => {
                  // item.room_type.passengers.adult = adultCount - 1;
                  handleDeleteRoomPassengers("adult");
                  setAdultCount((prev: any) => prev - 1);
                }}
                disabled={adultCount === 1}
                size="small"
                color="primary"
              >
                <RemoveOutlinedIcon fontSize="small" />
              </IconButton>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-1">
              <ChildCareOutlinedIcon fontSize="small" />
              <span className="text-xs font-semibold text-text-main">کودک</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <IconButton
                // onClick={() => {
                //   handleAddRoomPassengers("child");
                // }}
                // disabled={
                //   item.room_type.passengers.child ===
                //   item.room_type.capacity.child
                // }
                onClick={() => {
                  handleChangeChildrenAge(childCount + 1);
                  setChildCount((prev: any) => prev + 1);
                }}
                disabled={
                  item.room_type.beds -
                    adultCount +
                    item.room_type.capacity.child ===
                    childCount && item.room_type.age.child > 0
                  // item.room_type.capacity.child === childCount + infantCount
                }
                size="small"
                color="primary"
              >
                <AddOutlinedIcon fontSize="small" />
              </IconButton>
              <span className="text-sm text-text-main">
                {/* {item.room_type.passengers.child} */}
                {childCount}
              </span>
              <IconButton
                // onClick={() => {
                //   handleDeleteRoomPassengers("child");
                // }}
                // disabled={item.room_type.passengers.child === 0}
                onClick={() => {
                  handleChangeChildrenAge(childCount - 1);
                  setChildCount((prev: any) => prev - 1);
                }}
                disabled={childCount === 0}
                size="small"
                color="primary"
              >
                <RemoveOutlinedIcon fontSize="small" />
              </IconButton>
            </div>{" "}
          </div>{" "}
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start justify-center gap-1">
              <span className="text-xs font-semibold text-text-main">
                تخت اضافه
              </span>
              <span className="text-[10px] font-semibold opacity-80 text-text-main">
                {item.room_type.extra_bed > 0 && (
                  <p className="text-text-muted text-12">
                    {`هزینه مسافر اضافه: ${formatInputWithCommas(
                      item.room_type.board_type_list.financial_total
                        .extra_bed_price
                    )} ریال`}
                  </p>
                )}
              </span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <IconButton
                onClick={() => {
                  setExtraBed((prev: any) => prev + 1);
                  handleAddExtraBed();
                  // item.room_type.passengers.extra += 1;
                }}
                disabled={item.room_type.extra_bed === extraBed}
                size="small"
                color="primary"
              >
                <AddOutlinedIcon fontSize="small" />
              </IconButton>
              <span className="text-sm text-text-main">{extraBed}</span>
              <IconButton
                onClick={() => {
                  setExtraBed((prev: any) => prev - 1);
                  handleDeleteExtraBed();
                  // item.room_type.passengers.extra -= 1;
                }}
                disabled={extraBed === 0}
                size="small"
                color="primary"
              >
                <RemoveOutlinedIcon fontSize="small" />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {childrenAge.map((age: any, index: number) => (
            <Controller
              control={control}
              name={`children.${index}`}
              render={({ filed }: any) => (
                <TextField
                  {...filed}
                  fullWidth
                  label={`سن کودک ${ordinals[index]} را وارد کنید.`}
                  value={age}
                  type="number"
                  error={!!errors.children?.[index]}
                  helperText={
                    errors.children?.[index] &&
                    (errors.children?.[index]?.type === "max" ||
                      errors.children?.[index]?.type === "min")
                      ? errors.children[index].message
                      : ""
                  }
                  onChange={(e) => handleAgeChange(index, e.target.value)}
                  autoComplete="off"
                  size="small"
                />
              )}
            />
          ))}
        </div>
        <div className="flex items-center justify-end gap-2">
          <span className="text-text-main text-xs font-medium"></span>
          <span className="text-text-main font-bold text-sm">
            {`${formatInputWithCommas(
              parseInt(item.room_type.board_type_list.financial_total.net_price)
            )} ریال`}
          </span>
        </div>
        {item.room_type.capacity.child > 0 &&
          calculateExtraChildren(adultCount, childCount, item.room_type.beds) >
            0 && (
            <>
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-text-main">{`هزینه کودک اضافه ${item.room_type.age.infant} تا ${item.room_type.age.child} سال`}</span>
                <div className="font-bold">
                  <span className="text-sm text-text-main">
                    {item.room_type.board_type_list.financial_total.child_price
                      ? formatInputWithCommas(
                          item.room_type.board_type_list.financial_total
                            .child_price
                        )
                      : "رایگان"}
                  </span>
                  {item.room_type.board_type_list.financial_total.child_price >
                    0 && <span className="text-sm mr-3">ریال</span>}
                </div>
              </div>
              {item.room_type.age.infant > 0 && (
                <div className="flex items-center justify-between">
                  <span className="font-medium text-text-main text-sm">{`کودک اضافه زیر ${item.room_type.age.infant} سال`}</span>
                  <span className="font-semibold text-text-main text-sm">
                    رایگان
                  </span>
                </div>
              )}
            </>
          )}
      </div>
    </div>
  );
};

function calculateExtraChildren(adults: any, children: any, maxCapacity: any) {
  const totalPeople = adults + children;
  if (totalPeople <= maxCapacity) {
    return 0; // هیچ کودکی مشمول هزینه نیست
  } else {
    const extraPeople = totalPeople - maxCapacity;
    return Math.min(children, extraPeople); // تعداد کودکان مشمول هزینه
  }
}

function calculateRoomPrice(roomType: any) {
  const basePrice = roomType.board_type_list.financial_total.net_price;
  const maxAdults = roomType.beds;
  const maxExtraChildren = roomType.capacity.child;
  const adult = roomType.passengers.adult;

  let total = basePrice;

  let remainingAdultSlots = maxAdults - adult;

  let childAges = [...roomType.children_age];
  const promotedToAdult = [];

  // اولویت ارتقای کودکان دارای هزینه (مثلاً کودک 10 ساله)
  const chargeableChildren = childAges.filter(
    (age) => age >= roomType.age.infant && age <= roomType.age.child
  );

  const freeChildren = childAges.filter((age) => age < roomType.age.infant);
  // ارتقای کودکان دارای هزینه به بزرگسال (برای جلوگیری از هزینه اضافی)
  for (
    let i = 0;
    i < chargeableChildren.length && remainingAdultSlots > 0;
    i++
  ) {
    const idx = childAges.indexOf(chargeableChildren[i]);
    promotedToAdult.push(childAges[idx]);
    childAges.splice(idx, 1);
    remainingAdultSlots--;
  }

  // در صورت باقی ماندن ظرفیت، کودکان رایگان هم ارتقا پیدا می‌کنند
  for (let i = 0; i < freeChildren.length && remainingAdultSlots > 0; i++) {
    const idx = childAges.indexOf(freeChildren[i]);
    promotedToAdult.push(childAges[idx]);
    childAges.splice(idx, 1);
    remainingAdultSlots--;
  }

  // حالا آن کودکانی که باقی ماندند و خارج از ظرفیت هستند را بررسی کنیم
  const chargeableLeft = childAges.filter(
    (age) => age >= roomType.age.infant && age <= roomType.age.child
  );

  const freeLeft = childAges.filter((age) => age < roomType.age.infant);

  const finalChargeableCount = Math.min(
    chargeableLeft.length,
    maxExtraChildren
  );
  const extraChildCost =
    finalChargeableCount * roomType.board_type_list.financial_total.child_price;

  return total + extraChildCost;
}

const ordinals = [
  "اول",
  "دوم",
  "سوم",
  "چهارم",
  "پنجم",
  "ششم",
  "هفتم",
  "هشتم",
  "نهم",
  "دهم",
  "یازدهم",
  "دوازدهم",
  "سیزدهم",
  "چهاردهم",
  "پانزدهم",
  "شانزدهم",
  "هفدهم",
  "هجدهم",
  "نوزدهم",
  "بیستم",
];
