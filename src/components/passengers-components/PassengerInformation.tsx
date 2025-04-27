"use client";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
  useTheme,
} from "@mui/material";
import React, {
  FC,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useGlobalContext } from "@/context/store";
import {
  defaultCitizenship,
  defaultPassengerInformation,
  UserInformationDataType,
  vMask,
  vReg,
} from "@/DataTypes/globalTypes";
import { motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";
import {
  applyMask,
  calculateAgeCategory,
  removeMask,
  validateMelliCode,
} from "@/global-files/function";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 as uuidv4 } from "uuid";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useMask } from "@react-input/mask";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { getCountryList, getPreviousPassengers } from "@/global-files/axioses";
import { PreviousPassengerDataType } from "@/DataTypes/previousPassengerTypes";

interface PassengerInformationProps {
  index: number;
  item: UserInformationDataType;
  passengers: UserInformationDataType[];
  handleOnChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    field: string,
    roomId?: string
  ) => void;
  handleRemovePassenger: (item: UserInformationDataType) => void;
  roomId?: string;
  ref?: React.Ref<any>;
  type: string;
  setPassengers: (passengers: UserInformationDataType[] | []) => void;
}

interface PassengerRef {
  handleTrigger: () => void;
  getIsValid: () => boolean;
}
const PassengerInformation = forwardRef<
  PassengerRef,
  PassengerInformationProps
>(
  (
    {
      item,
      index,
      passengers,
      handleOnChange,
      roomId,
      type,
      handleRemovePassenger,
    },
    ref
  ) => {
    // initial states
    const { selectedWentFlight, selectedReturnFlight } =
      useGlobalContext().flightContext.searchContext;
    const { userData } = useGlobalContext().userContext;
    const { setOpenLoginDialog } = useGlobalContext().loginContext;
    const localRef = useRef("1");
    const [tabFormValue, setTabFormValue] = React.useState("1");
    const [openPassengerForm, setOpenPassengerForm] =
      React.useState<boolean>(true);
    const [openPreviousPassengersList, setOpenPreviousPassengersList] =
      useState<boolean>(false);
    const theme = useTheme();
    const dateRefOnDesktop = useMask(vMask?.date_yyyy_mm_dd);
    const dateRefOnMobile = useMask(vMask?.date_yyyy_mm_dd);
    const passExRefOnDesktop = useMask(vMask?.date_yyyy_mm_dd);
    const passExRefOnMobile = useMask(vMask?.date_yyyy_mm_dd);
    const [openCitizenShip, setOpenCitizenShip] = useState<boolean>(false);
    const [citizenshipList, setCitizenshipList] = useState<any[]>([]);
    const [selectedCitizenship, setSelectedCitizenship] =
      useState<any>(defaultCitizenship);
    const isFirstRender = useRef(true);

    //for validation
    const schema = yup.object().shape({
      nameFaValidation: yup.string().required("نام فارسی انتخاب نشده است"),
      lastNameFaValidation: yup
        .string()
        .required("نام خانوادگی فارسی انتخاب نشده است"),
      nameEnValidation: yup.string().required("نام لاتین انتخاب نشده است"),
      lastNameEnValidation: yup
        .string()
        .required("نام خانوادگی لاتین انتخاب نشده است"),
      nationalCodeValidation: yup
        .string()
        .required("شماره ملی معتبر انتخاب نشده است")
        .min(10, "شماره ملی نباید بیشتر از 10 رقم باشد")
        .max(10, "")
        .test("is-valid-national-code", "شماره ملی معتبر نیست", (value) => {
          return validateMelliCode(value);
        }),
      birthdayValidation: yup
        .string()
        .trim()
        .matches(vReg?.date_yyyy_mm_dd, "")
        .test("minYear", "سال تولد باید بعد از 1310 باشد", (value) => {
          if (!value) return false;
          const year = parseInt(value.split("-")[0], 10);
          return year >= 1310;
        })
        .test("maxYear", "سال تولد باید حداکثر 1403 باشد", (value) => {
          if (!value) return false;
          const year = parseInt(value.split("-")[0], 10);
          return year <= 1403;
        })
        .required("تاریخ تولد وارد نشده است"),
      sexValidation: yup
        .string()
        .test("required", "Required", (value) => value != "not-chosen"),
      mobileValidation:
        calculateAgeCategory(item.birthday as string) === "ADU"
          ? yup.string().matches(vReg?.mobile, "").required()
          : yup.string().notRequired(),
      // passportCodeValidation:
      //   type === "flight"
      //     ? item.citizenship.title.fa === "ایرانی" &&
      //       ((selectedWentFlight &&
      //         selectedWentFlight.FlightRoute === "Internal") ||
      //         (selectedReturnFlight &&
      //           selectedReturnFlight.FlightRoute === "Internal"))
      //       ? yup.string().notRequired()
      //       : yup.string().required()
      //     : item.citizenship.title.fa === "ایرانی"
      //     ? yup.string().notRequired()
      //     : yup.string().required(),
      passportCodeValidation:
        type === "flight"
          ? tabFormValue === "1" &&
            ((selectedWentFlight &&
              selectedWentFlight.FlightRoute === "Internal") ||
              (selectedReturnFlight &&
                selectedReturnFlight.FlightRoute === "Internal"))
            ? yup.string().notRequired()
            : yup.string().required()
          : tabFormValue === "1"
          ? yup.string().notRequired()
          : yup.string().required(),
      passExValidation: item.pass_code
        ? yup.string().matches(vReg?.date_yyyy_mm_dd, "").required()
        : yup.string().notRequired(),
      citizenshipValidation: yup.string().required(),
    });

    const defaultValues = {
      nameFaValidation: item.name_fa,
      lastNameFaValidation: item.lastname_fa,
      nameEnValidation: item.name_en,
      lastNameEnValidation: item.lastname_en,
      nationalCodeValidation: item.national_code,
      birthdayValidation: applyMask("date", item.birthday as string),
      citizenshipValidation: item.citizenship.title.fa,
      sexValidation: item.sex,
      mobileValidation: item.mobile,
      passportCodeValidation: item.pass_code,
      passExValidation: applyMask("date", item.pass_ex as string),
    };
    const { control, formState, trigger, setValue } = useForm({
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(schema),
    });
    const { isValid, errors } = formState;
    useImperativeHandle(ref, () => ({
      handleTrigger() {
        trigger();
      },
      getIsValid() {
        return isValid;
      },
    }));

    useEffect(() => {
      if (openCitizenShip) {
        getCountryList({ action: "citizenship", route: "1" }).then(
          (response: any) => {
            setCitizenshipList(response?.data?.titles as any);
          }
        );
      }
    }, [openCitizenShip]);

    // handle change open passenger form
    const togglePassengerForm = () => {
      setOpenPassengerForm(!openPassengerForm);
    };

    // useEffect(() => {
    //   if (!item) return;

    //   setValue("nameFaValidation", item.name_fa);
    //   setValue("lastNameFaValidation", item.lastname_fa);
    //   setValue("sexValidation", item.sex);
    //   setValue("nationalCodeValidation", item.national_code);
    //   setValue("nameEnValidation", item.name_en);
    //   setValue("lastNameEnValidation", item.lastname_en);
    //   setValue(
    //     "birthdayValidation",
    //     applyMask("date", item.birthday as string)
    //   );
    //   setValue("mobileValidation", item.mobile);
    //   setValue("passportCodeValidation", item.pass_code);
    //   setValue("passExValidation", applyMask("date", item.pass_ex as string));
    // }, [item, tabFormValue]);

    // handle change tab form value
    const handleChangeTabFormValue = (newValue: string) => {
      localRef.current = newValue;
      setTabFormValue(newValue);
    };

    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      trigger();
    }, [tabFormValue]);

    // handle open Previous passengers list dialog
    const handleOpenPreviousPassengers = () => {
      if (userData === null) {
        setOpenLoginDialog(true);
      } else {
        setOpenPreviousPassengersList(true);
      }
    };

    // handle close Previous passengers list dialog
    const handleClosePreviousPassengers = () => {
      setOpenPreviousPassengersList(false);
    };

    // render header each passenger
    const renderHeaderPassenger = () => {
      return (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-2">
              <span className="py-1 px-2 rounded-full border border-primary-main text-primary-main text-xs font-semibold">
                {item.birthday
                  ? calculateAgeCategory(item.birthday as string) === "ADU"
                    ? "بزرگسال"
                    : calculateAgeCategory(item.birthday as string) === "CHI"
                    ? "کودک"
                    : "نوزاد"
                  : "رده سنی"}
              </span>
              <RadioGroup
                row
                onChange={(e) => handleChangeTabFormValue(e.target.value)}
                defaultValue="1"
              >
                <FormControlLabel
                  value="1"
                  control={<Radio size="small" />}
                  label="کارت ملی"
                  sx={{
                    fontBold: "bold",
                    color:
                      localRef.current === "1"
                        ? theme.palette.primary.main
                        : "",
                    "& .MuiTypography-root": {
                      fontSize: "0.9rem",
                    },
                  }}
                />
                <FormControlLabel
                  value="2"
                  control={<Radio size="small" />}
                  label="پاسپورت"
                  sx={{
                    fontBold: "bold",
                    color:
                      localRef.current === "2"
                        ? theme.palette.primary.main
                        : "",
                    "& .MuiTypography-root": {
                      fontSize: "0.9rem",
                    },
                  }}
                />
              </RadioGroup>
            </div>
            <div className="flex items-center justify-center gap-0">
              <Tooltip title="انتخاب مسافران سابق">
                <IconButton onClick={handleOpenPreviousPassengers}>
                  <PersonSearchIcon />
                </IconButton>
              </Tooltip>
              {index !== 0 && (
                <Tooltip title="حذف مسافر">
                  <IconButton
                    onClick={() => {
                      handleRemovePassenger(item);
                    }}
                  >
                    <DeleteSweepIcon className={`text-primary-main`} />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          </div>
        </>
      );
    };

    useEffect(() => {
      console.log("localRef.current", localRef.current);
    }, [localRef.current]);
    // for desktop
    const passengerInformationContainerOnDesktop = () => {
      const renderFormOnDesktop = (
        <div className="hidden md:grid grid-cols-12 gap-2">
          <Controller
            control={control}
            name="nameFaValidation"
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="نام"
                className="col-span-3"
                autoComplete="off"
                size="small"
                onChange={(e) => {
                  field.onChange(e);
                  handleOnChange(e, item.id, "name_fa", roomId);
                }}
                InputLabelProps={{
                  sx: {
                    fontSize: 15,
                  },
                }}
                error={!!errors.nameFaValidation}
              />
            )}
          />
          <Controller
            control={control}
            name="lastNameFaValidation"
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="نام خانوادگی"
                className="col-span-3"
                autoComplete="off"
                size="small"
                onChange={(e) => {
                  field.onChange(e);
                  handleOnChange(e, item.id, "lastname_fa", roomId);
                }}
                InputLabelProps={{
                  sx: {
                    fontSize: 15,
                  },
                }}
                error={!!errors.lastNameFaValidation}
              />
            )}
          />
          <FormControl className="col-span-3">
            <InputLabel>جنسیت</InputLabel>
            <Controller
              control={control}
              name="sexValidation"
              render={({ field }) => (
                <Select
                  {...field}
                  size="small"
                  label="جنسیت"
                  // className="col-span-3"
                  onChange={(e: SelectChangeEvent) => {
                    field.onChange(e);
                    handleOnChange(e, item.id, "sex", roomId);
                  }}
                  error={!!errors.sexValidation}
                >
                  <MenuItem value="not-chosen">انتخاب نشده</MenuItem>
                  <MenuItem value="male">مرد</MenuItem>
                  <MenuItem value="female">زن</MenuItem>
                </Select>
              )}
            />
          </FormControl>
          {tabFormValue === "2" && (
            <>
              <div className="grid grid-cols-2 gap-2 col-span-3">
                <Controller
                  control={control}
                  name="passportCodeValidation"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="col-span-1"
                      label="شماره گذرنامه"
                      autoComplete="off"
                      size="small"
                      onChange={(e) => {
                        field.onChange(e);
                        handleOnChange(e, item.id, "pass_code", roomId);
                      }}
                      dir="ltr"
                      error={!!errors.passportCodeValidation}
                    />
                  )}
                />{" "}
                {item.pass_code && (
                  <Controller
                    control={control}
                    name="passExValidation"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="انقضای گذرنامه"
                        autoComplete="off"
                        className="col-span-1"
                        size="small"
                        onChange={(e) => {
                          field.onChange(e);
                          handleOnChange(
                            {
                              target: {
                                value: removeMask("date", e.target.value),
                              },
                            } as any,

                            item.id as number,
                            "pass_ex",
                            roomId
                          );
                        }}
                        placeholder="YYYY-MM-DD"
                        inputRef={passExRefOnDesktop}
                        dir="ltr"
                        error={!!errors.passExValidation}
                      />
                    )}
                  />
                )}
              </div>
              <Controller
                control={control}
                name="citizenshipValidation"
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    value={selectedCitizenship}
                    disableClearable
                    size="small"
                    className="col-span-3"
                    disablePortal
                    open={openCitizenShip}
                    onOpen={() => {
                      setOpenCitizenShip(true);
                    }}
                    onClose={() => {
                      setOpenCitizenShip(false);
                    }}
                    onChange={(e, value: any) => {
                      if (value) {
                        field.onChange(value.title.fa);
                        setSelectedCitizenship(value);
                        handleOnChange(
                          { target: { value: value } },
                          item.id,
                          "citizenship"
                        );
                      }
                    }}
                    options={citizenshipList}
                    getOptionLabel={(option: any) =>
                      option?.nationality?.fa || ""
                    }
                    renderInput={(params) => (
                      <TextField
                        error={!!errors.citizenshipValidation}
                        label="ملیت"
                        {...params}
                      />
                    )}
                  />
                )}
              />
            </>
          )}
          {tabFormValue === "1" && (
            <Controller
              control={control}
              name="nationalCodeValidation"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  // disabled={item.citizenship.title.fa === "ایرانی" ? false : true}
                  // disabled={tabFormValue === "2" ? true : false}
                  {...field}
                  className="col-span-3"
                  autoComplete="off"
                  label="شماره ملی"
                  size="small"
                  dir="ltr"
                  error={!!errors.nationalCodeValidation}
                  onChange={(e) => {
                    field.onChange(e);
                    handleOnChange(e, item.id, "national_code", roomId);
                  }}
                  InputLabelProps={{
                    sx: {
                      fontSize: 15,
                    },
                  }}
                />
              )}
            />
          )}
          <Controller
            control={control}
            name="nameEnValidation"
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="نام لاتین"
                className="col-span-3"
                autoComplete="off"
                size="small"
                onChange={(e) => {
                  field.onChange(e);
                  handleOnChange(e, item.id, "name_en", roomId);
                }}
                error={!!errors.nameEnValidation}
                dir="ltr"
              />
            )}
          />
          <Controller
            control={control}
            name="lastNameEnValidation"
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="نام خانوادگی لاتین"
                className="col-span-3"
                autoComplete="off"
                size="small"
                onChange={(e) => {
                  field.onChange(e);
                  handleOnChange(e, item.id, "lastname_en", roomId);
                }}
                InputLabelProps={{
                  sx: {
                    fontSize: 15,
                  },
                }}
                error={!!errors.lastNameEnValidation}
                dir="ltr"
              />
            )}
          />{" "}
          <Controller
            control={control}
            name="birthdayValidation"
            render={({ field }) => (
              <TextField
                {...field}
                className="col-span-3"
                label="تاریخ تولد"
                autoComplete="off"
                size="small"
                inputRef={dateRefOnDesktop}
                onChange={(e) => {
                  field.onChange(e);
                  handleOnChange(
                    {
                      target: {
                        value: removeMask("date", e.target.value),
                      },
                    } as any,
                    item.id as number,
                    "birthday",
                    roomId
                  );
                }}
                placeholder="YYYY-MM-DD"
                dir="ltr"
                InputLabelProps={{
                  sx: {
                    fontSize: 15,
                  },
                }}
                error={!!errors.birthdayValidation}
              />
            )}
          />
          <Controller
            control={control}
            name="mobileValidation"
            render={({ field }) => (
              <TextField
                {...field}
                label="تلفن همراه"
                className="col-span-3"
                autoComplete="off"
                size="small"
                onChange={(e) => {
                  field.onChange(e);
                  handleOnChange(e, item.id, "mobile", roomId);
                }}
                dir="ltr"
                error={!!errors.mobileValidation}
              />
            )}
          />
        </div>
      );
      return (
        <>
          {" "}
          <div className="p-2 hidden md:grid grid-cols-1 gap-4 border-b-2 border-main">
            {renderHeaderPassenger()}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {renderFormOnDesktop}
            </motion.div>
          </div>
        </>
      );
    };

    // for mobile

    const renderHeaderPassengerOnMobile = () => {
      return (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-2">
              <RadioGroup
                row
                onChange={(e) => handleChangeTabFormValue(e.target.value)}
                defaultValue="1"
              >
                <FormControlLabel
                  value="1"
                  control={<Radio size="small" />}
                  label="کارت ملی"
                  sx={{
                    fontBold: "bold",
                    color:
                      localRef.current === "1"
                        ? theme.palette.primary.main
                        : "",
                    "& .MuiTypography-root": {
                      fontSize: "0.9rem",
                    },
                  }}
                />
                <FormControlLabel
                  value="2"
                  control={<Radio size="small" />}
                  label="پاسپورت"
                  sx={{
                    fontBold: "bold",
                    color:
                      localRef.current === "2"
                        ? theme.palette.primary.main
                        : "",
                    "& .MuiTypography-root": {
                      fontSize: "0.9rem",
                    },
                  }}
                />
              </RadioGroup>
            </div>
            <div className="flex items-center justify-center gap-0">
              <Tooltip title="انتخاب مسافران سابق">
                <IconButton onClick={handleOpenPreviousPassengers}>
                  <PersonSearchIcon />
                </IconButton>
              </Tooltip>
              {index !== 0 && (
                <Tooltip title="حذف مسافر">
                  <IconButton
                    onClick={() => {
                      handleRemovePassenger(item);
                    }}
                  >
                    <DeleteSweepIcon className={`text-primary-main`} />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          </div>
        </>
      );
    };
    const passengerInformationContainerOnMobile = () => {
      const renderFormOnMobile = (
        <div className="md:hidden grid grid-cols-2 gap-2">
          <Controller
            control={control}
            name="nameFaValidation"
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="نام"
                autoComplete="off"
                size="small"
                onChange={(e) => {
                  field.onChange(e);
                  handleOnChange(e, item.id, "name_fa", roomId);
                }}
                InputLabelProps={{
                  sx: {
                    fontSize: 15,
                  },
                }}
                error={!!errors.nameFaValidation}
              />
            )}
          />
          <Controller
            control={control}
            name="lastNameFaValidation"
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="نام خانوادگی"
                autoComplete="off"
                size="small"
                onChange={(e) => {
                  field.onChange(e);
                  handleOnChange(e, item.id, "lastname_fa", roomId);
                }}
                InputLabelProps={{
                  sx: {
                    fontSize: 15,
                  },
                }}
                error={!!errors.lastNameFaValidation}
              />
            )}
          />{" "}
          <Controller
            control={control}
            name="nameEnValidation"
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="نام لاتین"
                autoComplete="off"
                size="small"
                onChange={(e) => {
                  field.onChange(e);
                  handleOnChange(e, item.id, "name_en", roomId);
                }}
                error={!!errors.nameEnValidation}
                dir="ltr"
              />
            )}
          />
          <Controller
            control={control}
            name="lastNameEnValidation"
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="نام خانوادگی لاتین"
                autoComplete="off"
                size="small"
                onChange={(e) => {
                  field.onChange(e);
                  handleOnChange(e, item.id, "lastname_en", roomId);
                }}
                InputLabelProps={{
                  sx: {
                    fontSize: 15,
                  },
                }}
                error={!!errors.lastNameEnValidation}
                dir="ltr"
              />
            )}
          />{" "}
          <FormControl>
            <InputLabel>جنسیت</InputLabel>
            <Controller
              control={control}
              name="sexValidation"
              render={({ field }) => (
                <Select
                  {...field}
                  size="small"
                  label="جنسیت"
                  // className="col-span-3"
                  onChange={(e: SelectChangeEvent) => {
                    field.onChange(e);
                    handleOnChange(e, item.id, "sex", roomId);
                  }}
                  error={!!errors.sexValidation}
                >
                  <MenuItem value="not-chosen">انتخاب نشده</MenuItem>
                  <MenuItem value="male">مرد</MenuItem>
                  <MenuItem value="female">زن</MenuItem>
                </Select>
              )}
            />
          </FormControl>
          {tabFormValue === "2" && (
            <>
              <Controller
                control={control}
                name="passportCodeValidation"
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="شماره گذرنامه"
                    autoComplete="off"
                    size="small"
                    onChange={(e) => {
                      field.onChange(e);
                      handleOnChange(e, item.id, "pass_code", roomId);
                    }}
                    dir="ltr"
                    error={!!errors.passportCodeValidation}
                  />
                )}
              />
              {item.pass_code && (
                <Controller
                  control={control}
                  name="passExValidation"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="انقضای گذرنامه"
                      autoComplete="off"
                      size="small"
                      onChange={(e) => {
                        field.onChange(e);
                        handleOnChange(
                          {
                            target: {
                              value: removeMask("date", e.target.value),
                            },
                          } as any,

                          item.id as number,
                          "pass_ex",
                          roomId
                        );
                      }}
                      placeholder="YYYY-MM-DD"
                      inputRef={passExRefOnMobile}
                      dir="ltr"
                      error={!!errors.passExValidation}
                    />
                  )}
                />
              )}
            </>
          )}
          {tabFormValue === "1" && (
            <Controller
              control={control}
              name="nationalCodeValidation"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  // disabled={item.citizenship.title.fa === "ایرانی" ? false : true}
                  {...field}
                  autoComplete="off"
                  label="شماره ملی"
                  size="small"
                  dir="ltr"
                  error={!!errors.nationalCodeValidation}
                  onChange={(e) => {
                    field.onChange(e);
                    handleOnChange(e, item.id, "national_code", roomId);
                  }}
                  InputLabelProps={{
                    sx: {
                      fontSize: 15,
                    },
                  }}
                />
              )}
            />
          )}
          <Controller
            control={control}
            name="birthdayValidation"
            render={({ field }) => (
              <TextField
                {...field}
                inputRef={dateRefOnMobile}
                label="تاریخ تولد"
                autoComplete="off"
                size="small"
                onChange={(e) => {
                  field.onChange(e);
                  handleOnChange(
                    {
                      target: {
                        value: removeMask("date", e.target.value),
                      },
                    } as any,
                    item.id as number,
                    "birthday",
                    roomId
                  );
                }}
                placeholder="YYYY-MM-DD"
                dir="ltr"
                InputLabelProps={{
                  sx: {
                    fontSize: 15,
                  },
                }}
                error={!!errors.birthdayValidation}
              />
            )}
          />{" "}
          <Controller
            control={control}
            name="mobileValidation"
            render={({ field }) => (
              <TextField
                {...field}
                label="تلفن همراه"
                autoComplete="off"
                size="small"
                onChange={(e) => {
                  field.onChange(e);
                  handleOnChange(e, item.id, "mobile", roomId);
                }}
                dir="ltr"
                error={!!errors.mobileValidation}
              />
            )}
          />
        </div>
      );
      return (
        <>
          <div className="p-2 md:hidden">
            <div className="overflow-hidden border border-divider rounded-xl grid grid-cols-1 gap-0">
              <div className="flex items-center justify-between py-1 px-3">
                <span className="text-sm text-text-main">
                  مسافر {index + 1}
                </span>
                <div className="flex items-center justify-center gap-1">
                  <span className="py-0.5 px-3 rounded-full border border-divider text-divider text-xs font-semibold">
                    {item.birthday
                      ? calculateAgeCategory(item.birthday as string) === "ADU"
                        ? "بزرگسال"
                        : calculateAgeCategory(item.birthday as string) ===
                          "CHI"
                        ? "کودک"
                        : "نوزاد"
                      : "رده سنی"}
                  </span>
                  <IconButton
                    onClick={() => {
                      togglePassengerForm();
                    }}
                    size="small"
                  >
                    {openPassengerForm ? (
                      <KeyboardArrowUpIcon
                        fontSize="small"
                        className="text-divider"
                      />
                    ) : (
                      <KeyboardArrowDownIcon
                        fontSize="small"
                        className="text-divider"
                      />
                    )}
                  </IconButton>
                </div>
              </div>
              {openPassengerForm && (
                <div className="border-t border-divider grid grid-cols-1 gap-4 p-3">
                  {renderHeaderPassengerOnMobile()}
                  {renderFormOnMobile}
                </div>
              )}
            </div>
          </div>
        </>
      );
    };

    return (
      <>
        {passengerInformationContainerOnDesktop()}
        {passengerInformationContainerOnMobile()}
        {openPreviousPassengersList && (
          <PreviousPassengersDialog
            passengers={item}
            onClose={handleClosePreviousPassengers}
            open={openPreviousPassengersList}
          />
        )}
      </>
    );
  }
);

export default PassengerInformation;

interface PreviousPassengersDialogProps {
  open: boolean;
  onClose: () => void;
  passengers: UserInformationDataType;
}
const PreviousPassengersDialog: FC<PreviousPassengersDialogProps> = ({
  open,
  onClose,
  passengers,
}) => {
  // initila state
  const [previousPassengersList, setPreviousPassengersList] = useState<
    PreviousPassengerDataType[] | []
  >([]);
  const [showLoading, setShowLoading] = useState<boolean>(true);
  const [selectPreviousPassenger, setSelectPreviousPassenger] =
    useState<PreviousPassengerDataType | null>(null);
  const { flightPassengers, setFlightPassengers } =
    useGlobalContext().flightContext.searchContext;

  // handle get previous passengers list
  const handleGetPreviousPassengersList = () => {
    getPreviousPassengers()
      .then((res: any) => {
        setShowLoading(false);
        setPreviousPassengersList(res.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleGetPreviousPassengersList();
  }, []);

  // handle chnage passenger info in flight passengers
  // const handleChangePassengerInfo = () => {
  //   setFlightPassengers(() => {
  //     const newPassengers = flightPassengers.map((element, i) =>
  //       element.id === passengers.id ? selectPreviousPassenger : element
  //     );
  //     return newPassengers;
  //   });
  // };

  const mapToFlightPassenger = (
    passenger: PreviousPassengerDataType
  ): UserInformationDataType => ({
    id: passenger.id,
    image: null,
    sex: passenger.gender,
    citizenship: passenger.identity.nationality,
    name_fa: passenger.fullname.first_name.fa,
    lastname_fa: passenger.fullname.last_name.fa,
    name_en: passenger.fullname.first_name.en,
    lastname_en: passenger.fullname.last_name.en,
    national_code: passenger.identity.id,
    pass_code: passenger.passport.id,
    pass_ex: passenger.passport.expire_at,
    passport_image: null,
    birthday: passenger.birth,
    email: passenger.email,
    mobile: passenger.mobile,
    province: null,
    city: null,
    postal_code: "",
    address: "",
    birthCity: "",
  });

  const handleChangePassengerInfo = () => {
    const mappedPassenger = selectPreviousPassenger
      ? mapToFlightPassenger(selectPreviousPassenger)
      : null;

    if (!mappedPassenger) return;

    setFlightPassengers(() => {
      const newPassengers = flightPassengers.map((element) =>
        element.id === passengers.id ? mappedPassenger : element
      );
      return newPassengers;
    });
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth={"sm"} fullWidth={true}>
      <DialogTitle className="flex items-center justify-between py-3 px-6">
        <span className="text-text-main text-base font-semibold">
          لیست مسافران قبلی
        </span>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className="pt-2 px-6">
        <div className="grid grid-cols-1 gap-4">
          <TextField size="medium" label="جستجو" />
          {showLoading ? (
            <div className="flex items-center justify-center text-text-main font-semibold">
              درحال دریافت اطلاعات مسافران...
            </div>
          ) : previousPassengersList.length > 0 ? (
            <div className="w-full flex flex-col items-start justify-center gap-2">
              {previousPassengersList.map((previousPassenger) => {
                return (
                  <div
                    key={previousPassenger.id}
                    className="w-full font-semibold text-text-main grid grid-cols-5 gap-2 bg-main py-1 px-2 rounded-2xl border border-divider"
                  >
                    <div className="flex items-center justify-center">
                      <Radio
                        size="small"
                        checked={
                          selectPreviousPassenger?.id === previousPassenger.id
                        }
                        onChange={() => {
                          setSelectPreviousPassenger(previousPassenger);
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-start">
                      <Tooltip
                        placement="top"
                        title={`${previousPassenger.fullname.first_name.fa} ${previousPassenger.fullname.last_name.fa}`}
                      >
                        <span className="truncate">
                          {previousPassenger.fullname.first_name.fa}{" "}
                          {previousPassenger.fullname.last_name.fa}
                        </span>
                      </Tooltip>
                    </div>
                    <div className="flex items-center justify-center">
                      <span>
                        {previousPassenger.gender === "male" ? "مرد" : "زن"}
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span>
                        {previousPassenger.identity.id
                          ? previousPassenger.identity.id
                          : previousPassenger.passport.id
                          ? previousPassenger.passport.id
                          : "-"}
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span>
                        {previousPassenger.birth
                          ? applyMask("date", previousPassenger.birth)
                          : "-"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center text-text-main font-semibold">
              مسافری جهت نمایش موجود نیست{" "}
            </div>
          )}
        </div>
      </DialogContent>
      <DialogActions className="p-6">
        <Button
          variant="contained"
          size="medium"
          onClick={() => {
            handleChangePassengerInfo();
            onClose();
          }}
          className="rounded-lg "
        >
          افزودن مسافر
        </Button>
      </DialogActions>
    </Dialog>
  );
};
