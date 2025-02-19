"use client";
import { AnimatePresence, motion } from "framer-motion";
import Box from "@mui/material/Box";
import { Button, CircularProgress, Paper, useTheme } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import lottieErrorBoundary from "../../../../public/assets/lottie/lottie-error-boundary.json";
import { FallbackProps } from "react-error-boundary";
import dynamic from "next/dynamic";
const Lottie = dynamic( () => import( "lottie-react" ), { ssr: false } );
function ErrorBoundaryComponent ( { error, resetErrorBoundary }: FallbackProps )
{
  const router = useRouter();
  const [ showDetails, setShowDetails ] = useState( false );
  return (
    // <div className="flex flex-col flex-auto justify-center items-center sm:justify-center min-w-0 md:p-[51px] bg-paper">
    <div className="bg-paper w-full h-screen fixed z-[99999] flex items-center justify-center">
      <Paper className="flex w-full sm:w-auto sm:min-h-auto md:w-full md:max-w-6xl rounded-0 sm:rounded-2xl sm:shadow overflow-hidden bg-main">
        <div className="w-full sm:w-auto py-[51px] px-[25px] sm:p-[76px] md:p-5 border-l-1 flex items-center justify-center">
          <div className="w-full max-w-[512px] sm:w-80 mx-auto sm:mx-0">
            <div className="w-full flex flex-col items-center justify-start p-[25px] gap-4">
              <div>
                <Lottie
                  animationData={ lottieErrorBoundary }
                  loop={ false }
                  style={ { width: "200px" } }
                />
              </div>
              <motion.div
                initial={ { opacity: 0, y: 40 } }
                animate={ { opacity: 1, y: 0, transition: { delay: 0.2 } } }
                className="flex flex-col gap-2 text-gray-800"
              >
                <span className="text-base font-bold">خطایی رخ داده است</span>
                <span className="text-base font-semibold mt-[25px]">
                  گزارش شما ثبت و همکاران ما در واحد فنی به این مورد رسیدگی
                  خواهند کرد
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        <Box className="bg-primary-main relative hidden md:flex flex-auto items-center justify-center h-full p-16 overflow-hidden">
          <svg
            className="absolute inset-0 pointer-events-none"
            viewBox="0 0 960 540"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMax slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Box
              component="g"
              sx={ { color: "primary.light" } }
              className="opacity-20"
              fill="none"
              stroke="currentColor"
              strokeWidth="100"
            >
              <circle r="234" cx="196" cy="23" />
              <circle r="234" cx="790" cy="491" />
            </Box>
          </svg>
          <Box
            component="svg"
            className="absolute -top-[102px] -right-[102px] opacity-20"
            sx={ { color: "primary.light" } }
            viewBox="0 0 220 192"
            width="220px"
            height="192px"
            fill="none"
          >
            <defs>
              <pattern
                id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect x="0" y="0" width="4" height="4" fill="currentColor" />
              </pattern>
            </defs>
            <rect
              width="220"
              height="192"
              fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
            />
          </Box>
          <div className="z-10 relative w-full max-w-[1049px]">
            <div className="w-full flex flex-col gap-[25px] justify-center items-center">
              <div className="w-full bg-white/90 backdrop-blur-md text-gray-700 rounded-md p-4 shadow-1 flex flex-col gap-4">
                <p className="text-lg text-center leading-10">
                  لطفاً مشکل خود را فقط از طریق تیکت پشتیبانی ارسال کنید و حتماً
                  کد پیگیری را ذکر نمایید. تماس تلفنی فقط در موارد ضروری پاسخ
                  داده می‌شود.
                </p>
                <div className="flex items-center justify-center gap-4">
                  <Button
                    size="small"
                    onClick={ resetErrorBoundary }
                    variant="contained"
                    className="rounded-xl bg-primary-main"
                  >
                    <span className="text-xl font-bold">بازگشت</span>
                  </Button>
                  <Button
                    size="small"
                    onClick={ () =>
                    {
                      resetErrorBoundary();
                      router.push( "/" );
                    } }
                    variant="contained"
                    className="rounded-xl bg-primary-main"
                  >
                    <span className="text-xl font-bold">خانه</span>
                  </Button>
                </div>
              </div>
              <div className="w-full bg-white/90 backdrop-blur-md text-gray-700 rounded-md p-4 shadow-1">
                <p className="text-lg text-center leading-10">
                  فقط در صورت عدم دسترسی به بخش پشتیبانی از طریق شماره تلفن{ " " }
                  <a
                    href="tel:02191016838"
                    className="font-bold whitespace-nowrap"
                    dir="ltr"
                  >
                    021-9101-6838
                  </a>{ " " }
                  داخلی <span className="font-bold whitespace-nowrap">102</span>{ " " }
                  گزارش خطای خود را همراه با کد پیگیری اعلام نمائید
                </p>
              </div>
              <Box
                display={ "flex" }
                flexDirection={ "column" }
                gap={ 2 }
                justifyContent={ "center" }
                alignItems={ "center" }
              >
                <Button
                  color="error"
                  onClick={ () => setShowDetails( !showDetails ) }
                >
                  <span className="text-xl text-main font-semibold">
                    { showDetails ? "بستن جزئیات" : "مشاهده جزئیات" }
                  </span>
                </Button>
                <AnimatePresence>
                  { showDetails && (
                    <motion.div
                      initial={ { opacity: 0, y: 40 } }
                      animate={ { opacity: 1, y: 0, transition: { delay: 0.2 } } }
                    >
                      <div
                        role="alert"
                        dir="ltr"
                        className="bg-white rounded-xl p-2 max-h-[121px] overflow-y-auto"
                      >
                        <p>Something went wrong:</p>
                        <pre style={ { color: "red" } }>{ error.message }</pre>
                      </div>
                    </motion.div>
                  ) }
                </AnimatePresence>
              </Box>
            </div>
          </div>
        </Box>
      </Paper>
    </div>
  );
}

export default ErrorBoundaryComponent;
