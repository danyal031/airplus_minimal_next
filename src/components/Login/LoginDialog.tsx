"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import buttonLoadingLottie from "../../../public/assets/lottie/button-loading-lottie.json";
import InfoIcon from "@mui/icons-material/Info";
import { motion } from "framer-motion";
import PinInput from "react-pin-input";
import { getAuthOtp, getAuthSubmit } from "@/global-files/axioses";
import { useGlobalContext } from "@/context/store";
import ClearIcon from "@mui/icons-material/Clear";
import dynamic from "next/dynamic";
import { ReCaptcha } from "next-recaptcha-v3";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
export const LoginDialog = () => {
  const { setUserData, setUserId } = useGlobalContext().userContext;
  const { openLoginDialog, setOpenLoginDialog } =
    useGlobalContext().loginContext;
  const handleCloseDialog = () => {
    setOpenLoginDialog(false);
  };
  const [tab, setTab] = useState<number>(0);
  const [phone, setPhone] = useState<string | null>(null);
  const [otp, setOtp] = useState<string | null>(null);
  const [passengerId, setPassengerId] = useState<string | null>(null);
  const [showButtonLoading, setShowButtonLoading] = useState<boolean>(false);
  const theme = useTheme();
  const [token, setToken] = useState<string>(null);
  // const { executeRecaptcha } = useReCaptcha();
  // handle auth submit
  function handleAuthSubmit() {
    setShowButtonLoading(true);
    getAuthSubmit({ passenger_id: passengerId, otp })
      .then((res: any) => {
        if (res.status) {
          localStorage.setItem("access_token", res.access_token);
          localStorage.setItem("minimal_user", JSON.stringify(res.user));
          setUserData(res.user);
          setUserId(res.user.uuid);
          handleCloseDialog();
          setShowButtonLoading(false);
        } else {
          console.log("error", res.message);
        }
      })
      .catch((err) => {});
  }

  // handle otp onchange
  useEffect(() => {
    if (otp?.length === 6) {
      handleAuthSubmit();
    }
  }, [otp]);

  const renderFirstStep = () => (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex items-center justify-center">
        <span className="text-primary-main font-bold text-base">
          ورود | ثبت‌نام
        </span>
      </div>{" "}
      <div className="flex items-center justify-center">
        <span className="text-text-main font-semibold text-xs">
          لطفا شماره موبایل خود را وارد کنید.{" "}
        </span>
      </div>{" "}
      <TextField
        size="medium"
        value={phone}
        onChange={(e) => {
          if (e.target.value.length < 11) setPhone(e.target.value);
        }}
        autoComplete="off"
        className="w-full"
        label="شماره موبایل"
        dir="ltr"
        InputProps={{
          startAdornment: (
            <div className="flex justify-center items-center px-5 py-2 text-slate-400 border-r">
              <span>+98</span>
            </div>
          ),
        }}
      />
      <div className="flex gap-2 items-center">
        <InfoIcon className="text-slate-400" fontSize="small" />
        <span className="text-xs text-slate-400">
          ثبت نام و استفاده از این اپلیکیشن به معنی پذیرش
          <span className="text-xs font-bold text-primary-main cursor-pointer">
            {" "}
            قوانین و مقررات سرویس{" "}
          </span>
          است.
        </span>
      </div>{" "}
    </div>
  );

  const renderSecondStep = () => (
    <div className="grid grid-cols-1 gap-4">
      {" "}
      <div className="flex items-center justify-center">
        <span className="text-primary-main font-bold text-base">
          کد تایید را وارد کنید{" "}
        </span>
      </div>{" "}
      <div className="flex items-center justify-center">
        <span className="text-text-main font-semibold text-xs">
          کد تایید برای شماره {phone} پیامک شد.{" "}
        </span>
      </div>{" "}
      <div className="flex items-center justify-center">
        <span
          onClick={() => {
            setTab(0);
          }}
          className="text-xs font-semibold text-primary-main cursor-pointer  hover:scale-110"
        >
          ویرایش شماره موبایل
        </span>
      </div>{" "}
      <PinInput
        length={6}
        initialValue=""
        onChange={(value, index) => {
          setOtp(value);
          if (value.length === 6) {
            console.log("submit");
          }
        }}
        focus
        type="numeric"
        inputMode="number"
        style={{
          padding: "10px",
          display: "flex",
          gap: "6px",
          flexDirection: "row-reverse",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        inputStyle={{
          borderColor: theme.palette.primary.main,
          borderRadius: "15px",
          width: "50px",
          height: "50px",
        }}
        inputFocusStyle={{ borderColor: "blue" }}
        onComplete={(value, index) => {}}
        autoSelect={true}
        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
      />
    </div>
  );
  const renderContent = () => {
    switch (tab) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {renderFirstStep()}
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {renderSecondStep()}
          </motion.div>
        );
    }
  };

  return (
    <>
      <ReCaptcha onValidate={setToken} action="page_view" />
      <Dialog
        open={openLoginDialog}
        onClose={handleCloseDialog}
        maxWidth={"xs"}
        fullWidth={true}
        sx={{
          "& .MuiPaper-root": {
            border: `2px solid ${theme.palette.primary.main}`,
            borderRadius: "16px",
          },
        }}
      >
        <DialogTitle className="flex items-center justify-end p-4">
          <IconButton
            onClick={() => {
              handleCloseDialog();
            }}
            size="small"
            className="bg-primary-main"
          >
            <ClearIcon className="text-paper" fontSize="medium" />
          </IconButton>
        </DialogTitle>
        <DialogContent>{renderContent()} </DialogContent>
        <DialogActions className="p-4">
          <Button
            size="small"
            variant="contained"
            className={`min-w-full h-12 flex justify-center items-center font-semibold rounded-lg`}
            onClick={async () => {
              if (tab == 0) {
                setShowButtonLoading(true);

                getAuthOtp({ mobile: phone })
                  .then((res: any) => {
                    setShowButtonLoading(false);
                    setPassengerId(res.data.passenger_id);
                    setTab(1);
                  })
                  .catch((err) => {});
              } else {
                handleAuthSubmit();
              }
            }}
            disabled={
              tab == 0
                ? phone?.length !== 10
                  ? true
                  : false
                : otp?.length !== 6
                ? true
                : false
            }
          >
            {showButtonLoading ? (
              <div className="w-[40px]">
                <Lottie animationData={buttonLoadingLottie} loop={true} />
              </div>
            ) : (
              <span className="text-white font-semibold text-xs md:text-md">
                {tab == 0 ? "تایید و دریافت رمز" : "برسی و ورود"}
              </span>
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
