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
import { useRouter } from "next/navigation";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ChildCareOutlinedIcon from "@mui/icons-material/ChildCareOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
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

  const handleAddedRooms = (rooms) => {
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
  onAdd,
  // selectedRooms,
  // setSelectedRooms,
}) => {
  // initial states
  const [rooms, setRooms] = useState<any>([]);
  const [showRoomsLoading, setShowRoomsLoading] = useState<boolean>(false);
  const [selectedRooms, setSelectedRooms] = useState(addedRooms);
  const {
    accommodationFromDate,
    accommodationToDate,
    accommodationPassengersCapacity,
    // selectedRooms,
    // setSelectedRooms,
  } = useGlobalContext().accommodationContext.accommodationSearch;
  const { capacitySelectedAccommodation, setCapacitySelectedAccommodation } =
    useGlobalContext().flightAccommodationContext.flightAccommodationSearch;
  const { setShowAlertDetails } = useGlobalContext().global;
  const json = useRef(null);
  const router = useRouter();

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

  const handleSelectRoom = (room: any) => {
    const tempRoom = {
      room_type: { ...room },
      ...item,
      type: "accommodation",
      details: {
        ...item.details,
        from_date: accommodationFromDate,
        to_date: convertToPersianDate,
      },
    };
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
            elm.id === tempRoom.id && tempRoom.room_type.id === elm.room_type.id
        ).length < tempRoom.room_type.capacity.room)
    ) {
      setSelectedRooms((prevItems: any) => [
        ...prevItems,
        { ...tempRoom, uuid: uuidv4() },
      ]);
      setCapacitySelectedAccommodation((prev: number) => prev + 1);
    } else {
      setShowAlertDetails({
        alertMessage: "اتاق خالی موجود نیست",
        alertType: "error",
        showAlert: true,
      });
    }
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

  const createSearchparams = (roomList: any) => {
    return {
      data: roomList,
      system_id: false,
      messages: JSON.stringify([]),
      time: Date.now(),
    };
  };
  const setUrl = (id: string) => {
    router.push(`/accommodation/checkout?factor=${id}`);
  };

  useEffect(() => {
    console.log("selectedRooms", selectedRooms);
  }, [selectedRooms]);

  useEffect(() => {
    console.log("capacitySelectedAccommodation", capacitySelectedAccommodation);
  }, [capacitySelectedAccommodation]);

  // move to checkout passenger page
  const handleMoveToCheckoutPage = () => {
    onAdd(selectedRooms);
    closeDialog();

    const local_id = uuidv4().substr(0, 6);
    setUrl(local_id);
    // const rooms = Object.values(addedRooms).flat();
    const rooms = selectedRooms;
    const queryParams = createSearchparams(rooms);
    console.log("addedRooms", addedRooms);

    console.log("queryParams", queryParams);
    console.log("rooms", rooms);

    localStorage.setItem(local_id, JSON.stringify(queryParams));
  };

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
            {rooms.Data
              ? rooms.Data.sort(
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
              : Array.from(new Array(4)).map((_, index) => (
                  <LoadingRoomItem key={index} />
                ))}
          </div>
          <div className="h-[450px] col-span-1 flex flex-col gap-2 bg-main rounded-md p-3 relative">
            <span className="text-text-main font-bold text-sm">
              اتاق های انتخابی
            </span>
            {selectedRooms.length ? (
              <div className="space-y-3 flex-1 overflow-y-auto overflow-x-hidden">
                {selectedRooms.map((elm: any, index: number) => (
                  <SelectedRoomItem
                    key={elm.uuid}
                    item={elm}
                    index={index}
                    fromDate={accommodationFromDate}
                    toDate={accommodationToDate}
                    onDelete={handleDeleteSelectedRoom}
                    selectedRooms={selectedRooms}
                    setSelectedRooms={setSelectedRooms}
                  />
                ))}
                <div className="flex items-center justify-between px-5">
                  <span className="text-text-main font-bold text-sm">
                    مجموع
                  </span>
                  <span className="text-text-main font-bold text-sm">
                    {`${formatInputWithCommas(
                      selectedRooms.reduce(
                        (acc, curr) =>
                          acc +
                          parseInt(
                            curr.room_type.board_type_list.financial_total
                              .net_price
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
                handleMoveToCheckoutPage();
              }}
            >
              {!selectedRooms.length ? "افزودن" : "اقدام به رزرو"}
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
  const from = new URLSearchParams(window.location.search).get("checkin_date");
  const to = new URLSearchParams(window.location.search).get("checkout_date");
  const { accommodationPassengersCapacity } =
    useGlobalContext().accommodationContext.accommodationSearch;
  const isSelected = selectedRooms.some(
    (elm: any) =>
      elm.room_type.id === item.id &&
      elm.room_type.board_type_list.id === item.board_type_list.id
  );
  const selectedNumber = selectedRooms.filter(
    (elm: any) =>
      elm.room_type.id === item.id &&
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
              onClick={() =>
                handleSelectRoom({
                  ...item,
                  passengers: {
                    adult: 1,
                    child: 0,
                  },
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
                      elm.room_type.id === item.id &&
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
                },
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
}
const SelectedRoomItem: FC<SelectedRoomItemProps> = ({
  item,
  fromDate,
  toDate,
  index,
  onDelete,
  selectedRooms,
  setSelectedRooms,
}) => {
  // initial states
  const { setCapacitySelectedAccommodation, capacitySelectedAccommodation } =
    useGlobalContext().flightAccommodationContext.flightAccommodationSearch;

  // handle add room passengers
  const handleAddRoomPassengers = (ageCategory: "child" | "adult") => {
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
      <div className="flex items-start justify-between p-2">
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="flex items-center justify-center">
            <PeopleAltOutlinedIcon fontSize="small" />
            <div className="flex items-center justify-center gap-1">
              <IconButton
                onClick={() => handleAddRoomPassengers("adult")}
                disabled={
                  item.room_type.passengers.adult ===
                  item.room_type.capacity.adult
                }
                size="small"
                color="primary"
              >
                <AddOutlinedIcon fontSize="small" />
              </IconButton>
              <span className="text-sm text-text-main">
                {item.room_type.passengers.adult}
              </span>
              <IconButton
                onClick={() => handleDeleteRoomPassengers("adult")}
                disabled={item.room_type.passengers.adult === 1}
                size="small"
                color="primary"
              >
                <RemoveOutlinedIcon fontSize="small" />
              </IconButton>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <ChildCareOutlinedIcon fontSize="small" />
            <div className="flex items-center justify-center gap-1">
              <IconButton
                onClick={() => {
                  handleAddRoomPassengers("child");
                }}
                disabled={
                  item.room_type.passengers.child ===
                  item.room_type.capacity.child
                }
                size="small"
                color="primary"
              >
                <AddOutlinedIcon fontSize="small" />
              </IconButton>
              <span className="text-sm text-text-main">
                {item.room_type.passengers.child}
              </span>
              <IconButton
                onClick={() => {
                  handleDeleteRoomPassengers("child");
                }}
                disabled={item.room_type.passengers.child === 0}
                size="small"
                color="primary"
              >
                <RemoveOutlinedIcon fontSize="small" />
              </IconButton>
            </div>{" "}
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-text-main text-xs font-medium">
            {/* {`${NumberToPersianWordMin.convert(
            calculateNights(fromDate, toDate, "YYYY-MM-DD")
          )} شب اقامت`} */}
            3 شب{" "}
          </span>
          <span className="text-text-main font-bold text-sm">
            {`${formatInputWithCommas(
              parseInt(item.room_type.board_type_list.financial_total.net_price)
            )} ریال`}
          </span>
        </div>
      </div>
    </div>
  );
};
