"use client";
import {
  Autocomplete,
  Box,
  Button,
  Drawer,
  IconButton,
  Popover,
  TextField,
  useTheme,
} from "@mui/material";
import React, { FC, useEffect, useImperativeHandle, useState } from "react";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import LoopIcon from "@mui/icons-material/Loop";
import DatePickerComponent from "@/components/BasUIComponents/datePickersComponents/DatePickerComponent";
import { useGlobalContext } from "@/context/store";
import { AirportDataType } from "@/DataTypes/flight/flightTicket";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import HistoryIcon from "@mui/icons-material/History";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import { convertPersianToEnglishNumbers } from "@/global-files/function";
import ClearIcon from "@mui/icons-material/Clear";

const FlightSearchForm = () => {
  // initial states
  const {
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    origin,
    destination,
    setTicketLoading,
    setTravelRoute,
    setChangeStatusRequest,
    dropOffLocationType,
    setIsInitialSearchDone,
  } = useGlobalContext().flightContext.searchContext;
  // handle navigate
  const router = useRouter();

  const handleTransfer = () => {
    setTicketLoading(true);

    router.push(
      `/listing/flights?origin=${origin?.iata}&destination=${
        destination?.iata
      }&departure_date=${convertPersianToEnglishNumbers(
        fromDate as string
      )}&returning_date=${
        toDate ? convertPersianToEnglishNumbers(toDate as string) : false
      }`
    );
  };

  const handleClickSubmit = (submit = false) => {
    // if (refFlightSearch.current) {
    // refFlightSearch.current ? refFlightSearch.current.handleTrigger() : "";
    // if (refFlightSearch.current.getIsValid()) {
    handleTransfer();
    setTravelRoute(dropOffLocationType);
    setChangeStatusRequest(true);
    setIsInitialSearchDone(false);
    // }
    // }
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
          forcedReturn={false}
        />
      </>
    );
  };
  const renderConfirmButton = () => {
    return (
      <>
        <Button
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

  // for render flight search form in desktop
  const renderSearchFormOnDesktop = () => {
    return (
      <>
        <div className="bg-paper w-full rounded-xl p-5 hidden md:block">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-6">
              <RoundWayInput />
            </div>
            <div className="col-span-4">{renderDatePicker()}</div>
            <div className="col-span-2">{renderConfirmButton()}</div>
          </div>
        </div>
      </>
    );
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
              <span className="font-semibold text-xs text-gray-400">
                نتایج{" "}
              </span>
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
              {filteredData.map((item: AirportDataType) => (
                <div
                  className="w-full flex items-center justify-start gap-1 py-1 px-2 text-gray-500 hover:text-primary-main cursor-pointer"
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
            <span className="font-semibold text-xs text-gray-400">
              شهرهای پرتردد{" "}
            </span>
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            {airportsList.slice(0, 10).map((item: AirportDataType) => (
              <div
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
          marginTop: "-4px",
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
            <span className="font-semibold text-xs text-gray-400">نتایج </span>
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            {filteredData.map((item: AirportDataType) => (
              <div
                className="w-full flex items-center justify-start gap-1 py-1 px-2 text-gray-500 hover:text-primary-main cursor-pointer"
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
          <span className="font-semibold text-xs text-gray-400">
            شهرهای پرتردد{" "}
          </span>
        </div>
        <div className="flex flex-col items-start justify-start gap-2">
          {data.slice(0, 10).map((item: AirportDataType) => (
            <div
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
