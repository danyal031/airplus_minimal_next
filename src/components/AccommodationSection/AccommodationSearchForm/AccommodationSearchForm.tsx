"use client";
import { useGlobalContext } from "@/context/store";
import { AccommodationDataType } from "@/DataTypes/accommodation/accommodationTypes";
import {
  Autocomplete,
  Button,
  Divider,
  IconButton,
  Popover,
  Rating,
  TextField,
  Tooltip,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { recommendedAccommodations } from "@/global-files/axioses";
import { debounce } from "lodash";
import { styled, lighten, darken } from "@mui/system";
import SearchAccommodationsProgress from "@/components/Skelton-Components/AccommodationSection/SearchAccommodationsProgress";
import DatePickerComponent from "@/components/BasUIComponents/datePickersComponents/DatePickerComponent";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
const AccommodationSearchForm = () => {
  // initial states
  // const cancelTokenRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const {
    setAccommodationDestination,
    accommodationDestination,
    setAccommodations,
    accommodations,
    accommodationFromDate,
    setAccommodationFromDate,
    accommodationToDate,
    setAccommodationToDate,
    accommodationPassengersCapacity,
    setAccommodationPassengersCapacity,
    setAccommodationsList,
    setFilteredSearchAccommodationsList,
  } = useGlobalContext().accommodationContext.accommodationSearch;

  const [anchorEl, setAnchorEl] = useState(null);
  const [openPassengerCapacityPopover, setOpenPassengerCapacityPopover] =
    useState<boolean>(false);
  const router = useRouter();

  // handle move to search accommodation page
  const handleClickSubmit = () => {
    setAccommodationsList([]);
    setFilteredSearchAccommodationsList([]);
    if (accommodationDestination?.category.title === "شهر") {
      router.push(
        `/search/accommodations?destination=${accommodationDestination.title.fa}&departing=${accommodationFromDate}&returning=${accommodationToDate}&adultCapacity=${accommodationPassengersCapacity.adultCapacity}&childCapacity=${accommodationPassengersCapacity.childCapacity}`
      );
    } else if (
      accommodationDestination &&
      accommodationDestination?.category.title !== "شهر"
    ) {
      router.push(
        `/accommodation/details?destination=${accommodationDestination.id}&departing=${accommodationFromDate}&returning=${accommodationToDate}&adultCapacity=${accommodationPassengersCapacity.adultCapacity}&childCapacity=${accommodationPassengersCapacity.childCapacity}`
      );
    }
  };

  // handle add passenger
  const handleAddPassenger = (action: string) => {
    // setHotelPassengers((prev) => [...prev, defaultPassengerInformation]);

    switch (action) {
      case "adult":
        setAccommodationPassengersCapacity((pre) => {
          if (pre.adultCapacity < 10) {
            return { ...pre, adultCapacity: pre.adultCapacity + 1 };
          } else {
            return pre;
          }
        });
        // setAdultCapacity((prev) => (prev < 10 ? prev + 1 : prev));
        break;
      case "child":
        setAccommodationPassengersCapacity((pre) => {
          if (pre.childCapacity < 5) {
            return { ...pre, childCapacity: pre.childCapacity + 1 };
          } else {
            return pre;
          }
        });
        // setChildCapacity((prev) => (prev < 5 ? prev + 1 : prev));
        break;
      default:
        break;
    }
  };

  // handle decrease passenger
  const handleDecreasePassenger = (action: string) => {
    // setHotelPassengers((prev) => prev.slice(0, prev.length - 1));
    switch (action) {
      case "adult":
        setAccommodationPassengersCapacity((pre) => {
          if (pre.adultCapacity > 0) {
            return { ...pre, adultCapacity: pre.adultCapacity - 1 };
          } else {
            return pre;
          }
        });
        // setAdultCapacity((prev) => (prev > 1 ? prev - 1 : prev));
        break;
      case "child":
        setAccommodationPassengersCapacity((pre) => {
          if (pre.childCapacity > 0) {
            return { ...pre, childCapacity: pre.childCapacity - 1 };
          } else {
            return pre;
          }
        });
        // setChildCapacity((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      default:
        break;
    }
  };

  // handle close passenger capacity popover
  const handleClosePassengerCapacityPopover = () => {
    setOpenPassengerCapacityPopover(false);
  };

  // handle fetch accommodation
  const fetchAccommodations = debounce((value: string) => {
    // if (cancelTokenRef.current) {
    //   cancelTokenRef.current.cancel("Request canceled due to new input");
    // }
    // cancelTokenRef.current = axios.CancelToken.source();
    setLoading(true);
    recommendedAccommodations(value)
      .then((res: any) => {
        console.log(777, res);

        if (res.status) {
          const result: any = [];
          Object.values(res.data).forEach((item) => {
            if (item) {
              if (Array.isArray(item)) {
                result.push(...item);
              } else {
                result.push(item);
              }
            }
          });
          setAccommodations(result);
        }
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  }, 700);

  const GroupHeader = styled("div")(({ theme }) => ({
    position: "sticky",
    top: "-8px",
    padding: "4px 10px",
    color: theme.palette.primary.main,
    backgroundColor: lighten(theme.palette.primary.light, 0.85),
    ...theme.applyStyles("dark", {
      backgroundColor: darken(theme.palette.primary.main, 0.8),
    }),
  }));

  useEffect(() => {
    fetchAccommodations("");
  }, []);

  const GroupItems = styled("ul")({
    padding: 0,
  });

  const options = accommodations.map((item) => ({
    ...item,
    groupType: item.category.title,
  }));

  const renderRoundWayInput = () => {
    return (
      <>
        <Autocomplete
          size="small"
          loading={loading}
          loadingText={<SearchAccommodationsProgress />}
          options={loading ? [] : options}
          groupBy={(option: any) => option.groupType}
          getOptionLabel={(option) => option.title.fa}
          filterOptions={(options) => options}
          onChange={(e, value: AccommodationDataType | null) => {
            setAccommodationDestination(value);
          }}
          value={accommodationDestination}
          onInputChange={(event, value) => {
            if (value.trim().length > 1 || value.trim().length === 0) {
              console.log("4544444444");

              fetchAccommodations(value);
            }
          }}
          renderOption={(props, option: any, state) => {
            const isLastItemInGroup =
              state.index + 1 === options.length ||
              options[state.index + 1]?.groupType !== option.groupType;

            return (
              <>
                <li {...props}>
                  <div className="p-1 flex items-center gap-3 w-full">
                    {option.groupType === "شهر" ? (
                      <LocationOnOutlinedIcon fontSize="small" />
                    ) : option.logo ? (
                      <Image
                        alt=""
                        className="rounded-full"
                        src={
                          process.env.NEXT_PUBLIC_MEDIA_URL_1 +
                          "/" +
                          option.logo
                        }
                        width={23}
                        height={23}
                      />
                    ) : (
                      <BusinessRoundedIcon fontSize="small" />
                    )}
                    <div className="flex flex-col w-full truncate">
                      <div className="flex items-center justify-between">
                        <span className="text-[14px] font-bold">
                          {option.title.fa}
                        </span>
                        {option.groupType !== "شهر" && (
                          <Rating
                            size="small"
                            className="self-start"
                            defaultValue={option.rate}
                            readOnly
                          />
                        )}
                      </div>
                      {option.groupType === "شهر" &&
                        option.state.fa &&
                        option.country.fa && (
                          <span className="text-[11px]">
                            {option.state.fa}، {option.country.fa}
                          </span>
                        )}
                      <Tooltip title={option.address} placement="top">
                        <span className="text-[10px] truncate">
                          {option.address}
                        </span>
                      </Tooltip>
                    </div>
                  </div>
                </li>
                {!isLastItemInGroup && (
                  <Divider className="w-full" variant="fullWidth" />
                )}
              </>
            );
          }}
          renderInput={(params) => (
            <TextField label="مقصد یا هتل" {...params} variant="outlined" />
          )}
          renderGroup={(params) => (
            <li key={params.key}>
              <GroupHeader>{params.group}</GroupHeader>
              <GroupItems>{params.children}</GroupItems>
            </li>
          )}
        />{" "}
      </>
    );
  };
  const renderPassengerInput = () => {
    const popoverContent = (
      <>
        <div className="grid grid-cols-1 gap-2">
          <TextField
            InputProps={{
              readOnly: true,
            }}
            value={`${accommodationPassengersCapacity.adultCapacity} بزرگسال،${accommodationPassengersCapacity.childCapacity} کودک`}
            size="small"
            label="مسافران"
          />
          <div className="flex flex-col items-center justify-start gap-2">
            <div className="flex items-center justify-between gap-5 w-full">
              <span className="text-sm text-text-main font-semibold">
                بزرگسال (12 سال به بالا)
              </span>
              <div className="flex items-center gap-2">
                <IconButton
                  onClick={() => handleAddPassenger("adult")}
                  disabled={accommodationPassengersCapacity.adultCapacity >= 10}
                  color="primary"
                  size="small"
                >
                  <AddIcon fontSize="small" />
                </IconButton>
                <span className="text-sm text-text-main min-w-[2ch]">
                  {accommodationPassengersCapacity.adultCapacity}
                </span>
                <IconButton
                  onClick={() => handleDecreasePassenger("adult")}
                  disabled={accommodationPassengersCapacity.adultCapacity <= 1}
                  size="small"
                  color="primary"
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
            <div className="flex items-center justify-between gap-5 w-full">
              <span className="text-sm text-text-main font-semibold">
                کودک (2 تا 12 سال){" "}
              </span>
              <div className="flex items-center gap-2">
                <IconButton
                  onClick={() => handleAddPassenger("child")}
                  disabled={accommodationPassengersCapacity.childCapacity >= 4}
                  color="primary"
                  size="small"
                >
                  <AddIcon fontSize="small" />
                </IconButton>
                <span className="text-text-main text-sm min-w-[2ch]">
                  {accommodationPassengersCapacity.childCapacity}
                </span>
                <IconButton
                  onClick={() => handleDecreasePassenger("child")}
                  disabled={accommodationPassengersCapacity.childCapacity <= 0}
                  color="primary"
                  size="small"
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
              </div>
            </div>{" "}
          </div>
        </div>
      </>
    );
    return (
      <>
        <Popover
          anchorEl={anchorEl}
          onClose={handleClosePassengerCapacityPopover}
          open={openPassengerCapacityPopover}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={{
            marginTop: "-4px",
            "& .MuiPopover-paper": {
              // width: anchorWidth,
              maxHeight: "420px",
            },
          }}
          classes={{
            paper: "p-2 border-2 border-primary-main rounded-xl",
          }}
        >
          {popoverContent}
        </Popover>
        <TextField
          InputProps={{
            readOnly: true,
          }}
          value={`${accommodationPassengersCapacity.adultCapacity} بزرگسال،${accommodationPassengersCapacity.childCapacity} کودک`}
          size="small"
          label="تعداد مسافر"
          onClick={(e: any) => {
            setAnchorEl(e.currentTarget);
            setOpenPassengerCapacityPopover(true);
          }}
        />
      </>
    );
  };
  const renderDatePicker = () => {
    return (
      <>
        <DatePickerComponent
          className="flex-1 col-span-4"
          fromDate={accommodationFromDate}
          toDate={accommodationToDate}
          setFromDate={setAccommodationFromDate}
          setToDate={setAccommodationToDate}
          forcedReturn={true}
        />
      </>
    );
  };
  const renderConfirmButton = () => {
    return (
      <>
        <Button
          variant="contained"
          size="small"
          className="w-full h-full rounded-lg"
          onClick={() => {
            handleClickSubmit();
          }}
        >
          جستجو
        </Button>
      </>
    );
  };

  const renderAccommodationSearchFormOnDesktop = () => {
    return (
      <>
        <div className="hidden md:block bg-paper w-full rounded-xl p-5">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-4">{renderRoundWayInput()}</div>
            <div className="col-span-2">{renderPassengerInput()}</div>
            <div className="col-span-4">{renderDatePicker()}</div>
            <div className="col-span-2">{renderConfirmButton()}</div>
          </div>
        </div>
      </>
    );
  };

  // for mobile
  const renderAccommodationSearchFormOnMobile = () => {
    return <></>;
  };

  return (
    <>
      {renderAccommodationSearchFormOnDesktop()}
      {renderAccommodationSearchFormOnMobile()}
    </>
  );
};

export default AccommodationSearchForm;
