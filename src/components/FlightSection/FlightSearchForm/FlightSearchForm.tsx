"use client";
import {
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  Popover,
  Radio,
  RadioGroup,
  TextField,
  useTheme,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import LoopIcon from "@mui/icons-material/Loop";
import DatePickerComponent from "@/components/BasUIComponents/datePickersComponents/DatePickerComponent";
import { useGlobalContext } from "@/context/store";
import { AirportDataType } from "@/DataTypes/flight/flightTicket";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter, useSearchParams } from "next/navigation";
import {
  applyMask,
  convertPersianToEnglishNumbers,
  formatDateWithDash,
  formatDateWithSlash,
} from "@/global-files/function";
import ClearIcon from "@mui/icons-material/Clear";
import { useGlobalActions } from "@/context/actionStore";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

interface FlightSearchFormProps {
  type: "flight" | "flight-accommodation";
}

const FlightSearchForm: FC<FlightSearchFormProps> = ({ type }) => {
  // initial states
  const {
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    origin,
    destination,
    isFlightSearching,
  } = useGlobalContext().flightContext.searchContext;
  const { handleFlightSearch } = useGlobalActions().flightActions;
  const {
    accommodationPassengersCapacity,
    setAccommodationPassengersCapacity,
  } = useGlobalContext().accommodationContext.accommodationSearch;
  const {
    numberStars,
    setNumberStars,
    flightOnlyCharters,
    setFlightOnlyCharters,
    accommodationOnlyCharters,
    setAccommodationOnlyCharters,
  } = useGlobalContext().flightAccommodationContext.flightAccommodationSearch;
  // popOver state
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPassengerCapacityPopover, setOpenPassengerCapacityPopover] =
    useState<boolean>(false);
  // handle navigate
  const router = useRouter();
  const searchParams = useSearchParams();

  // handle initial value
  useEffect(() => {
    const accommodationOnlyCharter =
      searchParams.get("accommodationOnlyCharters") === "true" ? true : false;
    const flightOnlyCharter =
      searchParams.get("flightOnlyCharters") === "true" ? true : false;
    setAccommodationOnlyCharters(accommodationOnlyCharter);
    setFlightOnlyCharters(flightOnlyCharter);
  }, []);

  const handleTransfer = () => {
    router.push(
      `/search/flights?origin=${origin?.iata}&destination=${
        destination?.iata
      }&departing=${convertPersianToEnglishNumbers(
        fromDate as string
      )}&returning=${
        toDate ? convertPersianToEnglishNumbers(toDate as string) : false
      }`
    );
  };

  const handleFlightAccommodationTransfer = () => {
    router.push(
      `/search/flight-accommodation?origin=${origin?.iata}&destination=${
        destination?.iata
      }&accommodation=${
        destination?.iata
      }&departing=${convertPersianToEnglishNumbers(
        fromDate as string
      )}&returning=${
        toDate ? convertPersianToEnglishNumbers(toDate as string) : false
      }&adultCapacity=${
        accommodationPassengersCapacity.adultCapacity
      }&childCapacity=${
        accommodationPassengersCapacity.childCapacity
      }&flightOnlyCharters=${flightOnlyCharters}&accommodationOnlyCharters=${accommodationOnlyCharters}&stars=${numberStars}`
    );
  };

  // search flight
  const searchFlight = () => {
    if (origin && destination && fromDate && !isFlightSearching) {
      handleTransfer();
      handleFlightSearch({
        origin: origin?.iata as string,
        destination: destination?.iata as string,
        departure_date: formatDateWithSlash(fromDate as string),
        returning_date: toDate ? formatDateWithSlash(toDate) : false,
        only_charters: false,
      });
    }
  };

  const searchFlightAccommodation = () => {
    if (origin && destination && fromDate && toDate && !isFlightSearching) {
      handleFlightAccommodationTransfer();
      handleFlightSearch({
        origin: origin?.iata as string,
        destination: destination?.iata as string,
        departure_date: formatDateWithSlash(fromDate as string),
        returning_date: toDate ? formatDateWithSlash(toDate) : false,
        only_charters: flightOnlyCharters,
      });
    }
  };

  // handle search field object
  const searchFieldObject = {
    flight: searchFlight,
    "flight-accommodation": searchFlightAccommodation,
  };

  const handleClickSubmit = (submit = false) => {
    searchFieldObject[type]();
  };
  const renderDatePicker = () => {
    return (
      <>
        <DatePickerComponent
          showProgress={true}
          fromDate={fromDate}
          toDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
          forcedReturn={type == "flight" ? false : true}
        />
      </>
    );
  };
  const renderConfirmButton = () => {
    return (
      <>
        <Button
          // disabled
          onClick={() => {
            handleClickSubmit();
          }}
          variant="contained"
          size="small"
          className="w-full h-full rounded-lg"
        >
          جستجو
        </Button>
      </>
    );
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

  // render passenger capacity
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

  // handle render star input
  const renderStarInput = () => {
    return (
      <TextField
        size="small"
        type="number"
        dir="ltr"
        label="ستاره اقامتگاه"
        value={numberStars}
        inputProps={{ min: 1, max: 5 }}
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          if (value >= 1 && value <= 5) {
            setNumberStars(value);
          } else if (e.target.value === "") {
            setNumberStars(5);
          }
        }}
      />
    );
  };

  // handle onchange flight charter
  const handleOnchangeFlightCharter = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFlightOnlyCharters(event.target.checked);
  };

  // handle onchange accommodation charter
  const handleOnchangeAccommodationCharter = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAccommodationOnlyCharters(event.target.checked);
  };

  // handle render flight type input
  const renderFlightTypeInput = () => {
    return (
      <FormGroup>
        <FormControlLabel
          className="text-text-main"
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: "14px",
              fontWeight: 500,
            },
          }}
          control={
            <Checkbox
              checked={flightOnlyCharters}
              onChange={handleOnchangeFlightCharter}
              size="small"
              color="primary"
            />
          }
          label="پرواز های چارتری"
        />
      </FormGroup>
    );
  };

  // handle render accommodation type input
  const renderAccommodationTypeInput = () => {
    return (
      <FormGroup>
        <FormControlLabel
          className="text-text-main"
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: "14px",
              fontWeight: 500,
            },
          }}
          control={
            <Checkbox
              checked={accommodationOnlyCharters}
              onChange={handleOnchangeAccommodationCharter}
              size="small"
              color="primary"
            />
          }
          label="هتل های چارتری"
        />
      </FormGroup>
    );
  };

  // for render flight search form in desktop
  const renderSearchFormOnDesktop = () => {
    const flightSearchForm = (
      <div className="bg-paper w-full rounded-xl p-5 hidden md:block">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-6">
            <RoundWayInput />
          </div>
          <div className="col-span-4">{renderDatePicker()}</div>
          <div className="col-span-2">{renderConfirmButton()}</div>
        </div>
      </div>
    );

    const flightAccommodationSearchForm = (
      <div className="bg-paper w-full rounded-xl p-5 hidden md:grid grid-cols-1 gap-2">
        <div className="flex items-center justify-start gap-2">
          <div className="">{renderFlightTypeInput()}</div>
          <div className="">{renderAccommodationTypeInput()}</div>
        </div>
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-10 grid grid-cols-12 gap-1">
            <div className="col-span-6">
              <RoundWayInput />
            </div>
            {/* <div className="col-span-2">{renderPassengerInput()}</div> */}
            <div className="col-span-4">{renderDatePicker()}</div>
            <div className="col-span-2">{renderStarInput()}</div>
          </div>
          <div className="col-span-2 flex items-center">
            {renderConfirmButton()}
          </div>
        </div>
      </div>
    );

    const formFieldObject = {
      flight: flightSearchForm,
      "flight-accommodation": flightAccommodationSearchForm,
    };

    return <>{formFieldObject[type]}</>;
  };

  // const renderDatePickerOnMobile = () => {
  //   return (
  //     <>
  //       <div className="grid grid-cols-2 gap-2">
  //         <TextField size="small" label="تاریخ رفت" />
  //         <TextField size="small" label="تاریخ برگشت" />
  //       </div>
  //     </>
  //   );
  // };

  const renderConfirmButtonOnMobile = () => {
    return (
      <>
        <Button
          // disabled
          onClick={() => {
            handleClickSubmit();
          }}
          variant="contained"
          size="medium"
          className="rounded-lg"
        >
          جستجو
        </Button>
      </>
    );
  };

  const renderSearchFormOnMobile = () => {
    return (
      <>
        <div className="md:hidden rounded-b-lg p-3 bg-paper">
          <div className="grid grid-cols-1 gap-2">
            <div>
              <RoundWayInput />
            </div>
            {renderDatePicker()}
            {renderConfirmButtonOnMobile()}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {renderSearchFormOnDesktop()}
      {renderSearchFormOnMobile()}
    </>
  );
};

export default FlightSearchForm;

const RoundWayInput = () => {
  // initial states
  const { origin, setOrigin, destination, setDestination, airports } =
    useGlobalContext().flightContext.searchContext;
  const [popOverState, setPopOverState] = useState<any>({
    value: null,
    setValue: () => {},
    type: "",
  });
  const [openMobileDrawer, setOpenMobileDrawer] = useState(false);
  const [drawerState, setDrawerState] = useState<any>({
    value: null,
    setValue: () => {},
    type: "",
  });

  const [openRoundWayPopover, setOpenRoundWayPopover] =
    useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // for airport autocomplete options
  const airportsList = airports.map((airport) => airport);

  //  handle open round way popover
  const handleOpenRoundWayPopover = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const anchor = event.currentTarget;
    const rect = anchor.getBoundingClientRect();
    const popoverHeight = 395; // ارتفاع تقریبی Popover
    const spaceBelow = window.innerHeight - rect.bottom;

    if (spaceBelow < popoverHeight) {
      const offset = 120;
      const scrollAmount = popoverHeight - spaceBelow;
      window.scrollBy({ top: scrollAmount, behavior: "smooth" });
    }

    setAnchorEl(anchor);
    setOpenRoundWayPopover(true);
  };
  // handle convert routes
  const handleConvertRoutes = () => {
    setOrigin(destination);
    setDestination(origin);
  };
  // for validation
  const schema = yup.object().shape({
    originValidation: yup.string().required(""),
    destinationValidation: yup.string().required(""),
  });
  const defaultValues = {
    originValidation: origin?.iata ? origin?.iata : "",
    destinationValidation: destination?.iata ? destination?.iata : "",
  };
  const { control, formState, trigger, setValue } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, errors } = formState;
  // useImperativeHandle(ref, () => ({
  //   handleTrigger() {
  //     trigger();
  //   },
  //   getIsValid() {
  //     // return isValid;
  //     return isValid;
  //   },
  // }));

  // handle render Round Way input on desktop
  const renderRoundWayInputOnDesktop = () => {
    return (
      <>
        <div className="hidden md:flex item-center justify-center gap-3 relative">
          <RoundWayPopover
            open={openRoundWayPopover}
            setOpen={setOpenRoundWayPopover}
            value={popOverState.value}
            setValue={popOverState.setValue}
            anchorEl={anchorEl}
            airportsList={airportsList}
            type={popOverState.type}
          />
          <Controller
            control={control}
            name="originValidation"
            render={({ field }) => (
              <TextField
                {...field}
                label={"شهر مبدا"}
                value={origin?.title_fa}
                size="small"
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <span>
                      {/* {tab}{" "} */}
                      <FlightTakeoffIcon
                        sx={{ color: "#c2c2c2", transform: "scaleX(-1)" }}
                      />
                    </span>
                  ),
                }}
                onClick={(e: any) => {
                  setAnchorEl(e.currentTarget);
                  handleOpenRoundWayPopover(e);
                  setPopOverState({
                    value: origin,
                    setValue: setOrigin,
                    type: "origin",
                  });
                }}
                onChange={(e) => field.onChange(e.target.value)}
                error={!!errors.originValidation}
              />
            )}
          />
          <div className="flex justify-center items-center absolute top-0 bottom-0 m-auto z-10">
            <IconButton
              size="small"
              color="primary"
              className="bg-main border border-primary-main hover:cursor-pointer"
              onClick={handleConvertRoutes}
            >
              <LoopIcon fontSize="small" />
            </IconButton>
          </div>
          <Controller
            control={control}
            name="destinationValidation"
            render={({ field }) => (
              <TextField
                {...field}
                label={"شهر مقصد"}
                value={destination?.title_fa}
                size="small"
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <span>
                      {/* {tab}{" "} */}
                      <FlightLandIcon
                        sx={{ color: "#c2c2c2", transform: "scaleX(-1)" }}
                      />
                    </span>
                  ),
                }}
                onClick={(e: any) => {
                  setAnchorEl(e.currentTarget);
                  handleOpenRoundWayPopover(e);
                  setPopOverState({
                    value: destination,
                    setValue: setDestination,
                    type: "destination",
                  });
                }}
                onChange={(e) => field.onChange(e.target.value)}
                error={!!errors.destinationValidation}
              />
            )}
          />
        </div>
      </>
    );
  };

  // handle render round way input on desktop
  const renderRoundWayInputOnMobile = () => {
    return (
      <>
        <div className="md:hidden grid grid-cols-1 gap-2 relative">
          <Controller
            control={control}
            name="originValidation"
            render={({ field }) => (
              <TextField
                {...field}
                label={"شهر مبدا"}
                value={origin?.title_fa}
                size="small"
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <span>
                      {/* {tab}{" "} */}
                      <FlightTakeoffIcon
                        sx={{ color: "#c2c2c2", transform: "scaleX(-1)" }}
                      />
                    </span>
                  ),
                }}
                onClick={(e: any) => {
                  setDrawerState({
                    value: origin,
                    setValue: setOrigin,
                    type: "origin",
                  });
                  setOpenMobileDrawer(true);
                }}
                onChange={(e) => field.onChange(e.target.value)}
                error={!!errors.originValidation}
              />
            )}
          />{" "}
          <div className="flex justify-center items-center absolute top-0 bottom-0  left-0 ml-4  m-auto z-10">
            <IconButton
              size="small"
              color="primary"
              className="bg-main border border-primary-main hover:cursor-pointer"
              onClick={handleConvertRoutes}
            >
              <LoopIcon fontSize="small" />
            </IconButton>
          </div>
          <Controller
            control={control}
            name="destinationValidation"
            render={({ field }) => (
              <TextField
                {...field}
                label={"شهر مقصد"}
                value={destination?.title_fa}
                size="small"
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <span>
                      {/* {tab}{" "} */}
                      <FlightLandIcon
                        sx={{ color: "#c2c2c2", transform: "scaleX(-1)" }}
                      />
                    </span>
                  ),
                }}
                onClick={(e: any) => {
                  setDrawerState({
                    value: destination,
                    setValue: setDestination,
                    type: "destination",
                  });
                  setOpenMobileDrawer(true);
                }}
                onChange={(e) => field.onChange(e.target.value)}
                error={!!errors.destinationValidation}
              />
            )}
          />
        </div>{" "}
        <DrawerMobile
          open={openMobileDrawer}
          setOpen={setOpenMobileDrawer}
          value={drawerState.value}
          setValue={drawerState.setValue}
          type={drawerState.type}
          data={airportsList}
        />
      </>
    );
  };

  return (
    <>
      {renderRoundWayInputOnDesktop()}
      {renderRoundWayInputOnMobile()}
    </>
  );
};
interface RoundWayPopoverProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  value: any;
  setValue: (value: any) => void;
  type: string;
  anchorEl: any;
  airportsList: AirportDataType[] | [];
}
const RoundWayPopover: FC<RoundWayPopoverProps> = ({
  open,
  setOpen,
  value,
  setValue,
  anchorEl,
  airportsList,
  type,
}) => {
  // initial states
  const [filteredData, setFilteredData] = React.useState([]);
  const theme = useTheme();
  // hadle close popover
  const handleClose = () => {
    setOpen(false);
  };
  // handle change input
  const handleChangeInput = (query: any) => {
    if (query)
      setFilteredData(
        airportsList.filter((item: any) => item.title_fa.includes(query)) as any
      );
    else setFilteredData([]);
  };

  const anchorWidth = anchorEl?.getBoundingClientRect()?.width || "auto";

  const handleClickSelectItem = (item: any) => {
    setValue(item);
    setOpen(false);
  };
  const tabList = [
    {
      id: "1",
      label: "داخلی",
    },
    {
      id: "2",
      label: "خارجی",
    },
  ];
  const [destinationsTab, setDestinationsTab] = useState<string>("1");

  const handleChangeTab = (tabValue: string) => {
    setDestinationsTab(tabValue);
  };

  const popoverContent = (
    <>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col items-center justify-center gap-0">
          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: `2px solid ${theme.palette.primary.main}`,
                },
                "&:hover fieldset": {
                  borderColor: theme.palette.primary.main,
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
            className="w-full"
            size="small"
            label={type === "origin" ? "شهر مبدا" : "شهر مقصد"}
            onChange={(e) => handleChangeInput(e.target.value)}
            InputProps={{
              startAdornment: (
                <span>
                  {type === "origin" ? (
                    <FlightTakeoffIcon
                      color="primary"
                      sx={{ transform: "scaleX(-1)" }}
                    />
                  ) : (
                    <FlightLandIcon
                      color="primary"
                      sx={{ transform: "scaleX(-1)" }}
                    />
                  )}
                </span>
              ),
              endAdornment: (
                <span>
                  <SearchIcon fontSize="small" color="primary" />
                </span>
              ),
            }}
          />
          {/* <div className="overflow-hidden flex items-center justify-center gap-0 rounded-tab-up-sm h-7">
            {" "}
            {tabList.map((tab) => {
              const isActive = destinationsTab === tab.id;
              return (
                <>
                  {" "}
                  <span
                    key={tab.id}
                    onClick={() => handleChangeTab(tab.id)}
                    className={`w-full h-full hover:cursor-pointer col-span-1 flex items-center justify-center font-semibold rounded-tab-up-sm -ml-4  ${
                      isActive
                        ? "bg-primary-main text-paper"
                        : "text-primary-main bg-paper"
                    }`}
                  >
                    {tab.label}
                  </span>
                </>
              );
            })}{" "}
          </div> */}
        </div>
        {/* <div className="grid grid-cols-1 gap-2">
          <div className="bg-main flex items-center justify-between rounded-lg p-1 px-2">
            <span className="font-semibold text-xs text-gray-400">
              تاریخچه جستجو
            </span>
            <span className="font-semibold text-xs text-primary-main">
              پاک کردن
            </span>
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <div className="w-full flex items-center justify-start gap-1 px-2">
              <HistoryIcon fontSize="small" color="primary" />
              <span className="text-primary-main text-sm">اصفهان-INF</span>
            </div>
          </div>
        </div>*/}
        {filteredData.length > 0 && (
          <div className="grid grid-cols-1 gap-2">
            <div className="bg-main flex items-center justify-start rounded-lg p-1 px-2">
              <span className="font-semibold text-xs text-text-subText">
                نتایج{" "}
              </span>
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
              {filteredData.map((item: AirportDataType) => (
                <div
                  key={item.id}
                  className="w-full flex items-center justify-start gap-1 py-1 px-2 text-text-subText hover:text-primary-main cursor-pointer"
                  onClick={() => {
                    handleClickSelectItem(item);
                  }}
                >
                  {/* <HistoryIcon className="text-sm" /> */}
                  <LocationOnIcon className="text-sm" />
                  <span className="text-xs font-bold truncate">
                    {item.title_fa} - {item.iata}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}{" "}
        <div className="grid grid-cols-1 gap-2">
          <div className="bg-main flex items-center justify-start rounded-lg p-1 px-2">
            <span className="font-semibold text-xs text-text-subText">
              شهرهای پرتردد{" "}
            </span>
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            {airportsList.slice(0, 10).map((item: AirportDataType) => (
              <div
                key={item.id}
                onClick={() => {
                  handleClickSelectItem(item);
                }}
                className="text-text-subText hover:text-primary-main cursor-pointer w-full flex items-center justify-start gap-1 py-1 px-2"
              >
                <LocationOnIcon className="text-sm" />
                <span className="text-xs font-bold truncate">
                  {item.title_fa} - {item.iata}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
  return (
    <>
      {/* <Popover
        // disablePortal={true}
        anchorEl={anchorEl}
        onClose={handleClose}
        open={open}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          marginTop: "-4px",
        }}
        classes={{
          paper: "p-2 border-2 border-primary-main rounded-xl",
        }}
      >
        {popoverContent}
      </Popover> */}
      <Popover
        anchorEl={anchorEl}
        onClose={handleClose}
        open={open}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          marginTop: "-7px",
          "& .MuiPopover-paper": {
            width: anchorWidth,
            maxHeight: "420px",
          },
        }}
        classes={{
          paper: "p-2 border-2 border-primary-main rounded-xl",
        }}
      >
        {popoverContent}
      </Popover>
    </>
  );
};

// for mobile ui
interface DrawerMobileProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: any;
  setValue: (value: any) => void;
  type: string;
  data: AirportDataType[];
}
const DrawerMobile: FC<DrawerMobileProps> = ({
  open,
  setOpen,
  setValue,
  value,
  data,
  type,
}) => {
  // initial states
  const [filteredData, setFilteredData] = React.useState([]);
  const theme = useTheme();
  // for toggle drawer
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleChangeInput = (query: any) => {
    if (query)
      setFilteredData(
        data.filter((item: any) => item.title_fa.includes(query)) as any
      );
    else setFilteredData([]);
  };

  const handleClickSelectItem = (item: any) => {
    setValue(item);
    setOpen(false);
  };

  const DrawerList = (
    <div className="grid grid-cols-1 gap-4">
      <Box className="flex justify-between items-center p-3 bg-main text-text-main">
        <span className="font-bold text-sm">
          انتخاب شهر یا فرودگاه {type === "origin" ? "مبدا" : "مقصد"}
        </span>
        <IconButton onClick={toggleDrawer(false)}>
          <ClearIcon fontSize="small" />
        </IconButton>
      </Box>
      <div className="flex flex-col items-center justify-center gap-0 py-2 px-3">
        <TextField
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: `2px solid ${theme.palette.primary.main}`,
              },
              "&:hover fieldset": {
                borderColor: theme.palette.primary.main,
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.primary.main,
              },
            },
          }}
          className="w-full"
          size="small"
          label={type === "origin" ? "شهر مبدا" : "شهر مقصد"}
          onChange={(e) => handleChangeInput(e.target.value)}
          InputProps={{
            startAdornment: (
              <span>
                {type === "origin" ? (
                  <FlightTakeoffIcon
                    color="primary"
                    sx={{ transform: "scaleX(-1)" }}
                  />
                ) : (
                  <FlightLandIcon
                    color="primary"
                    sx={{ transform: "scaleX(-1)" }}
                  />
                )}
              </span>
            ),
            endAdornment: (
              <span>
                <SearchIcon fontSize="small" color="primary" />
              </span>
            ),
          }}
        />
      </div>
      {filteredData.length > 0 && (
        <div className="grid grid-cols-1 gap-2">
          <div className="bg-main flex items-center justify-start p-1 px-2">
            <span className="font-semibold text-xs text-text-subText">
              نتایج{" "}
            </span>
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            {filteredData.map((item: AirportDataType) => (
              <div
                key={item.id}
                className="w-full flex items-center justify-start gap-1 py-1 px-2 text-text-subText hover:text-primary-main cursor-pointer"
                onClick={() => {
                  handleClickSelectItem(item);
                }}
              >
                {/* <HistoryIcon className="text-sm" /> */}
                <LocationOnIcon className="text-sm" />
                <span className="text-xs font-bold truncate">
                  {item.title_fa} - {item.iata}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}{" "}
      <div className="grid grid-cols-1 gap-2">
        <div className="bg-main flex items-center justify-start p-1 px-2">
          <span className="font-semibold text-xs text-text-subText">
            شهرهای پرتردد{" "}
          </span>
        </div>
        <div className="flex flex-col items-start justify-start gap-2">
          {data.slice(0, 10).map((item: AirportDataType) => (
            <div
              key={item.id}
              onClick={() => {
                handleClickSelectItem(item);
              }}
              className="text-gray-500 hover:text-primary-main cursor-pointer w-full flex items-center justify-start gap-1 py-1 px-2"
            >
              <LocationOnIcon className="text-sm" />
              <span className="text-xs font-bold truncate">
                {item.title_fa} - {item.iata}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  return (
    <>
      {" "}
      <div className="w-full">
        <Drawer
          anchor={"right"}
          PaperProps={{
            sx: { width: "100%" },
          }}
          open={open}
          onClose={toggleDrawer(false)}
        >
          {DrawerList}
        </Drawer>
      </div>
    </>
  );
};
