"use client";
import {
  Autocomplete,
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
import { useMask } from "@react-input/mask";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 as uuidv4 } from "uuid";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
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
    const { setFlightPassengers, selectedWentFlight, selectedReturnFlight } =
      useGlobalContext().flightContext.searchContext;
    const localRef = useRef("1");
    const [tabFormValue, setTabFormValue] = React.useState("1");
    const [openPassengerForm, setOpenPassengerForm] =
      React.useState<boolean>(true);

    const theme = useTheme();
    const dateRef = useMask(vMask?.date_yyyy_mm_dd);
    const passExRef = useMask(vMask?.date_yyyy_mm_dd);

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
      passportCodeValidation:
        type === "flight"
          ? item.citizenship.title.fa === "ایرانی" &&
            ((selectedWentFlight &&
              selectedWentFlight.FlightRoute === "Internal") ||
              (selectedReturnFlight &&
                selectedReturnFlight.FlightRoute === "Internal"))
            ? yup.string().notRequired()
            : yup.string().required()
          : item.citizenship.title.fa === "ایرانی"
          ? yup.string().notRequired()
          : yup.string().required(),
      passExValidation: item.pass_code
        ? yup.string().matches(vReg?.date_yyyy_mm_dd, "").required()
        : yup.string().notRequired(),
    });

    const defaultValues = {
      nameFaValidation: item.name_fa,
      lastNameFaValidation: item.lastname_fa,
      nameEnValidation: item.name_en,
      lastNameEnValidation: item.lastname_en,
      nationalCodeValidation: item.national_code,
      birthdayValidation: applyMask("date", item.birthday as string),
      citizenshipValidation: item.citizenship,
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

    // handle change open passenger form
    const togglePassengerForm = () => {
      setOpenPassengerForm(!openPassengerForm);
    };

    // handle change tab form value
    const handleChangeTabFormValue = (newValue: string) => {
      localRef.current = newValue;
      setTabFormValue(newValue);
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
              {" "}
              <Tooltip title="انتخاب مسافران سابق">
                <IconButton>
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

    // render National code form
    const renderNationalCodeForm = () => {
      const renderOnDesktop = (
        <div className="hidden md:grid grid-cols-12 gap-2">
          <Controller
            control={control}
            name="nameFaValidation"
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="نام"
                value={item.name_fa}
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
                value={item.lastname_fa}
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
                  value={item.sex}
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
          {/* <TextField size="small" className="col-span-3" label="جنسیت" /> */}
          <Controller
            control={control}
            name="nationalCodeValidation"
            render={({ field, fieldState: { error } }) => (
              <TextField
                disabled={item.citizenship.title.fa === "ایرانی" ? false : true}
                {...field}
                value={item.national_code}
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
          />{" "}
          <Controller
            control={control}
            name="nameEnValidation"
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="نام لاتین"
                value={item.name_en}
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
                value={item.lastname_en}
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
                // value={applyMask("date", item.birthday as string)}
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
                inputRef={dateRef}
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
                className="col-span-3"
                value={item.mobile}
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
      const renderOnMobile = (
        <div className="md:hidden grid grid-cols-2 gap-2">
          <Controller
            control={control}
            name="nameFaValidation"
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="نام"
                value={item.name_fa}
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
                value={item.lastname_fa}
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
                value={item.name_en}
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
                value={item.lastname_en}
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
                  value={item.sex}
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
          {/* <TextField size="small" className="col-span-3" label="جنسیت" /> */}
          <Controller
            control={control}
            name="nationalCodeValidation"
            render={({ field, fieldState: { error } }) => (
              <TextField
                disabled={item.citizenship.title.fa === "ایرانی" ? false : true}
                {...field}
                value={item.national_code}
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
          />{" "}
          <Controller
            control={control}
            name="birthdayValidation"
            render={({ field }) => (
              <TextField
                {...field}
                label="تاریخ تولد"
                autoComplete="off"
                // value={applyMask("date", item.birthday as string)}
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
                inputRef={dateRef}
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
                value={item.mobile}
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
          {renderOnDesktop}
          {renderOnMobile}
        </>
      );
    };

    // render passport form
    const renderPassportForm = () => {
      const renderOnDesktop = (
        <div className="hidden md:grid grid-cols-12 gap-2">
          <Controller
            control={control}
            name="nameFaValidation"
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="نام"
                value={item.name_fa}
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
                value={item.lastname_fa}
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
          <FormControl className="col-span-2">
            <InputLabel>جنسیت</InputLabel>
            <Controller
              control={control}
              name="sexValidation"
              render={({ field }) => (
                <Select
                  {...field}
                  value={item.sex}
                  size="small"
                  label="جنسیت"
                  // className="col-span-2"
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
          {/* <TextField size="small" className="col-span-2" label="جنسیت" /> */}
          <Controller
            control={control}
            name="passportCodeValidation"
            render={({ field }) => (
              <TextField
                {...field}
                value={item.pass_code}
                className="col-span-2"
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
                  // value={item.pass_ex}
                  autoComplete="off"
                  className="col-span-2"
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
                  inputRef={passExRef}
                  dir="ltr"
                  error={!!errors.passExValidation}
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
                value={item.name_en}
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
                value={item.lastname_en}
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
                // value={applyMask("date", item.birthday as string)}
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
                inputRef={dateRef}
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
                value={item.mobile}
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
      const renderOnMobile = (
        <div className="md:hidden grid grid-cols-2 gap-2">
          {" "}
          <Controller
            control={control}
            name="nameFaValidation"
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="نام"
                value={item.name_fa}
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
                value={item.lastname_fa}
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
          />
          {/* <TextField size="small" className="col-span-2" label="جنسیت" /> */}
          <Controller
            control={control}
            name="nameEnValidation"
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="نام لاتین"
                value={item.name_en}
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
                value={item.lastname_en}
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
                  value={item.sex}
                  size="small"
                  label="جنسیت"
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
          <Controller
            control={control}
            name="birthdayValidation"
            render={({ field }) => (
              <TextField
                {...field}
                label="تاریخ تولد"
                autoComplete="off"
                // value={applyMask("date", item.birthday as string)}
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
                inputRef={dateRef}
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
                value={item.mobile}
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
          />{" "}
          <Controller
            control={control}
            name="passportCodeValidation"
            render={({ field }) => (
              <TextField
                {...field}
                value={item.pass_code}
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
                  // value={item.pass_ex}
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
                  inputRef={passExRef}
                  dir="ltr"
                  error={!!errors.passExValidation}
                />
              )}
            />
          )}
        </div>
      );
      return (
        <>
          {renderOnDesktop}
          {renderOnMobile}
        </>
      );
    };

    const renderForm = () => {
      switch (localRef.current) {
        case "1":
          return renderNationalCodeForm();
        case "2":
          return renderPassportForm();
      }
    };
    useEffect(() => {
      console.log("localRef.current", localRef.current);
    }, [localRef.current]);
    // for desktop
    const passengerInformationContainerOnDesktop = () => {
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
              {renderForm()}
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
              {" "}
              <Tooltip title="انتخاب مسافران سابق">
                <IconButton>
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
      return (
        <>
          <div className="p-2">
            <div className="overflow-hidden md:hidden border border-divider rounded-xl grid grid-cols-1 gap-0">
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
                  {renderForm()}
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
      </>
    );
  }
);

export default PassengerInformation;
