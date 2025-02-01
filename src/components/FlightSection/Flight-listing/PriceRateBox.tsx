"use client";
import { Drawer, IconButton, useTheme } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useShowAlert } from "@/hooks/useShowAlert";
import ReactApexChart from "react-apexcharts";
import ClearIcon from "@mui/icons-material/Clear";
const PriceRateBox = () => {
  // initial states
  const [isOpenPriceRangeChart, setIsOpenPriceRangeChart] = useState(false);
  const [isOpenPriceFluctuationsChart, setIsOpenPriceFluctuationsChart] =
    useState(false);
  const [openChartDrawer, setOpenChartDrawer] = useState<boolean>(false);
  const [chartTabValue, setChartTabValue] = useState<string>("1");
  const theme = useTheme();

  // for handle change open chart drawer
  const handleOpenChartDrawer = (type: string) => {
    setOpenChartDrawer(true);
    switch (type) {
      case "range":
        setChartTabValue("range");
        break;
      case "fluctuations":
        setChartTabValue("fluctuations");
        break;
      default:
        break;
    }
  };

  // for handle change chart tab value
  const handleChangeChartTabValue = (newValue: string) => {
    setChartTabValue(newValue);
  };
  // handle change isOpenPriceRangeChart
  const handleChangeIsOpenPriceRangeChart = () => {
    setIsOpenPriceRangeChart(!isOpenPriceRangeChart);
    setIsOpenPriceFluctuationsChart(false);
  };
  // handle change isOpenPriceFluctuationsChart
  const handleChangeIsOpenPriceFluctuationsChart = () => {
    setIsOpenPriceFluctuationsChart(!isOpenPriceFluctuationsChart);
    setIsOpenPriceRangeChart(false);
  };
  // render charts
  const renderPriceRangeChart = () => {
    if (!isOpenPriceRangeChart) return null;
    // areaChartOptions
    const areaChart: any = {
      series: [
        {
          name: "Income",
          data: [
            16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000,
            17000, 14000, 17000,
          ],
        },
      ],
      options: {
        chart: {
          type: "area",
          height: 200,
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        colors: [theme.palette.primary.main],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 2,
          curve: "smooth",
        },
        xaxis: {
          axisBorder: {
            color: "#e0e6ed",
          },
        },
        yaxis: {
          opposite: true,
        },
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        legend: {
          horizontalAlign: "left",
        },
        grid: {
          borderColor: "rgba(151, 151, 151, 0.20)",
        },
        tooltip: {
          theme: "light",
        },
      },
    };
    return (
      <>
        <div className="border-t-2 border-main p-3 grid grid-cols-1 gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-2">
              <span className="text-primary-main text-base">helpix logo</span>
              <span className="text-text-main text-sm font-semibold">
                قیمت‌ها در حال حاضر برای جستجوی شما ارزان هستند.{" "}
              </span>
            </div>
            {/* <h4 className="text-primary-main font-bold">chart1</h4> */}
          </div>
          <div className="relative">
            <span className="text-text-main absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold text-base z-10">
              به زودی...{" "}
            </span>
            <div className="blur-sm">
              <ReactApexChart
                series={areaChart.series}
                options={areaChart.options}
                className="rounded-lg bg-paper overflow-hidden"
                type="area"
                height={200}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderPriceFluctuationsChart = () => {
    if (!isOpenPriceFluctuationsChart) return null;
    const ColumnChart: any = {
      series: [
        {
          name: "PRODUCT A",
          data: [44, 55, 41, 67, 22, 43],
        },
      ],
      options: {
        chart: {
          height: 200,
          type: "bar",
          stacked: true,
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        colors: ["#D9D9D9"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 5,
              },
            },
          },
        ],
        plotOptions: {
          // bar: {
          //   horizontal: false,
          //   columnWidth: "70px",
          //   barHeight: "50px",
          // },
          bar: {
            horizontal: false,
            borderRadius: 12,
            borderRadiusApplication: "around",
            borderRadiusWhenStacked: "last",
            columnWidth: "40%",
            barHeight: "70%",
            distributed: false,
            rangeBarOverlap: true,
            rangeBarGroupRows: false,
            hideZeroBarsWhenGrouped: false,
            isDumbbell: false,
            dumbbellColors: undefined,
            isFunnel: false,
            isFunnel3d: true,
            colors: {
              ranges: [
                {
                  from: 0,
                  to: 0,
                  color: undefined,
                },
              ],
              backgroundBarColors: [],
              backgroundBarOpacity: 1,
              backgroundBarRadius: 0,
            },
            dataLabels: {
              position: "top",
              maxItems: 100,
              hideOverflowingLabels: true,
              // total: {
              //   enabled: true,
              //   formatter: undefined,
              //   offsetX: 0,
              //   offsetY: 0,
              //   style: {
              //     color: "#373d3f",
              //     fontSize: "12px",
              //     fontFamily: undefined,
              //     fontWeight: 600,
              //   },
              // },
            },
          },
        },
        xaxis: {
          type: "datetime",
          categories: [
            "01/01/2011 GMT",
            "01/02/2011 GMT",
            "01/03/2011 GMT",
            "01/04/2011 GMT",
            "01/05/2011 GMT",
            "01/06/2011 GMT",
          ],
          axisBorder: {
            color: "#e0e6ed",
          },
        },
        yaxis: {
          opposite: true,
        },
        grid: {
          borderColor: "#e0e6ed",
        },
        legend: {
          position: "right",
          offsetY: 40,
        },
        tooltip: {
          theme: "light",
        },
        fill: {
          opacity: 0.8,
        },
      },
    };
    return (
      <>
        <div className="border-t-2 border-main p-3 grid grid-cols-1 gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-2">
              <span className="text-primary-main text-base">helpix logo</span>
              <span className="text-text-main text-sm font-semibold">
                روند تغییرات قیمت بلیت سفر به بوشهر
              </span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-text-main text-sm font-semibold">
                مدت سفر
              </span>
              <span className="text-text-main text-sm font-semibold">
                8 روز
              </span>
            </div>
          </div>
          <div className="relative">
            <span className="text-text-main absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold text-base z-10">
              به زودی...{" "}
            </span>
            <div className="blur-sm">
              <ReactApexChart
                series={ColumnChart.series}
                options={ColumnChart.options}
                className="rounded-lg bg-paper overflow-hidden"
                type="bar"
                height={200}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderDailyPrice = () => {
    const dates = [
      { id: 1, label: "یکشنبه", price: 1000 },
      { id: 2, label: "دوشنبه", price: 1200 },
      { id: 3, label: "سه‌شنبه", price: 1100 },
      { id: 4, label: "چهارشنبه", price: 1300 },
      { id: 5, label: "پنجشنبه", price: 1400 },
      { id: 6, label: "جمعه", price: 1500 },
      { id: 7, label: "شنبه", price: 1600 },
      { id: 8, label: "پنجشنبه", price: 1600 },
      { id: 9, label: "پنجشنبه", price: 1600 },
      { id: 10, label: "شنبه", price: 1600 },
      { id: 11, label: "شنبه", price: 1600 },
      { id: 12, label: "پنجشنبه", price: 1600 },
      { id: 13, label: "شنبه", price: 1600 },
      { id: 14, label: "پنجشنبه", price: 1600 },
      { id: 15, label: "شنبه", price: 1600 },
    ];
    return (
      <>
        <div className="border-b-2 border-main p-2 overflow-x-auto flex items-center justify-start gap-2">
          {dates.map((date) => (
            <div
              key={date.id}
              className="min-w-24 text-text-main hover:text-primary-main cursor-pointer rounded-lg border hover:border-primary-main border-divider p-1 flex flex-col items-center justify-center gap-2"
            >
              <span className="font-semibold text-sm">{date.label}</span>
              <span className="text-gray-400 text-xs">{date.price}</span>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderPriceRange = () => {
    return (
      <>
        <div
          className={`${
            isOpenPriceRangeChart ? "text-primary-main" : "text-text-main"
          } text-sm grid grid-cols-1 gap-3 p-2 border-l-2 border-main`}
        >
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={handleChangeIsOpenPriceRangeChart}
          >
            <span className={`font-semibold cursor-pointer`}>بازه قیمت </span>
            <IconButton size="small">
              {isOpenPriceRangeChart ? (
                <CloseIcon className="text-sm" />
              ) : (
                <KeyboardArrowDownIcon className="text-sm" />
              )}
            </IconButton>{" "}
          </div>
        </div>
      </>
    );
  };

  const renderPriceFluctuations = () => {
    return (
      <>
        <div className="text-sm grid grid-cols-1 gap-3 p-2">
          {" "}
          <div
            className={`${
              isOpenPriceFluctuationsChart
                ? "text-primary-main"
                : "text-text-main"
            } flex items-center justify-between cursor-pointer`}
            onClick={handleChangeIsOpenPriceFluctuationsChart}
          >
            <span className="font-semibold cursor-pointer">نوسانات قیمت </span>
            <IconButton size="small">
              {isOpenPriceFluctuationsChart ? (
                <CloseIcon className="text-sm" />
              ) : (
                <KeyboardArrowDownIcon className="text-sm" />
              )}
            </IconButton>{" "}
          </div>
        </div>
      </>
    );
  };
  // for desktop
  const renderOnDesktop = () => {
    return (
      <>
        <div className="bg-paper rounded-xl hidden md:grid grid-cols-2 gap-0">
          <div className="col-span-2">{renderDailyPrice()}</div>{" "}
          <div className="col-span-1">{renderPriceRange()}</div>
          <div className="col-span-1">{renderPriceFluctuations()}</div>
          <div className="col-span-2">{renderPriceRangeChart()}</div>
          <div className="col-span-2">{renderPriceFluctuationsChart()}</div>
        </div>
      </>
    );
  };

  // for mobile
  const renderPriceFluctuationsOnMobile = () => {
    return (
      <>
        <div className="text-sm grid grid-cols-1 gap-3 p-2">
          <div
            className={`${
              isOpenPriceFluctuationsChart
                ? "text-primary-main"
                : "text-text-main"
            } flex items-center justify-between cursor-pointer`}
            onClick={() => handleOpenChartDrawer("fluctuations")}
          >
            <span className="font-semibold cursor-pointer">نوسانات قیمت</span>
            <IconButton size="small">
              <KeyboardArrowDownIcon className="text-sm" />
            </IconButton>{" "}
          </div>
        </div>
      </>
    );
  };

  const renderPriceRangeOnMobile = () => {
    return (
      <>
        <div
          className={`${
            isOpenPriceRangeChart ? "text-primary-main" : "text-text-main"
          } text-sm grid grid-cols-1 gap-3 p-2 border-l-2 border-main`}
        >
          {" "}
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => {
              handleOpenChartDrawer("range");
            }}
          >
            <span className={`font-semibold cursor-pointer`}>بازه قیمت </span>
            <IconButton size="small">
              <KeyboardArrowDownIcon className="text-sm" />
            </IconButton>{" "}
          </div>
        </div>
      </>
    );
  };

  // for render range chart on mobile
  const renderPriceRangeChartOnMobile = () => {
    // areaChartOptions
    const areaChart: any = {
      series: [
        {
          name: "Income",
          data: [
            16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000,
            17000, 14000, 17000,
          ],
        },
      ],
      options: {
        chart: {
          type: "area",
          height: 200,
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        colors: [theme.palette.primary.main],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 2,
          curve: "smooth",
        },
        xaxis: {
          min: 4,
          max: 8,
          axisBorder: {
            color: "#e0e6ed",
          },
        },
        yaxis: {
          min: 10000,
          max: 25000,
          tickAmount: 6,
          opposite: true,
        },
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        legend: {
          horizontalAlign: "left",
        },
        grid: {
          borderColor: "rgba(151, 151, 151, 0.20)",
        },
        tooltip: {
          theme: "light",
        },
      },
    };
    return (
      <>
        {" "}
        <div className="border-t-2 border-main p-3 grid grid-cols-1 gap-3 relative">
          <span className="text-text-main absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold text-base z-10">
            به زودی...{" "}
          </span>
          <div className="blur-sm grid grid-cols-1 gap-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center gap-2">
                <span className="text-primary-main text-base">helpix logo</span>
                <span className="text-text-main text-sm font-semibold textju">
                  قیمت‌ها در حال حاضر برای جستجوی شما ارزان هستند.{" "}
                </span>
              </div>
              {/* <h4 className="text-primary-main font-bold">chart1</h4> */}
            </div>
            <span className="text-sm text-text-main font-semibold">
              نمودار تاریخچه قیمت
            </span>
            <ReactApexChart
              series={areaChart.series}
              options={areaChart.options}
              className="rounded-lg bg-paper overflow-hidden"
              type="area"
              height={300}
            />
          </div>
        </div>
      </>
    );
  };

  // fot render fluctuations chart on mobile
  const renderPriceFluctuationsChartOnMobile = () => {
    const ColumnChart: any = {
      series: [
        {
          name: "PRODUCT A",
          data: [44, 55, 41, 67, 22, 43],
        },
      ],
      options: {
        chart: {
          height: 200,
          type: "bar",
          stacked: true,
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        colors: ["#D9D9D9"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 5,
              },
            },
          },
        ],
        plotOptions: {
          // bar: {
          //   horizontal: false,
          //   columnWidth: "70px",
          //   barHeight: "50px",
          // },
          bar: {
            horizontal: false,
            borderRadius: 12,
            borderRadiusApplication: "around",
            borderRadiusWhenStacked: "last",
            columnWidth: "40%",
            barHeight: "70%",
            distributed: false,
            rangeBarOverlap: true,
            rangeBarGroupRows: false,
            hideZeroBarsWhenGrouped: false,
            isDumbbell: false,
            dumbbellColors: undefined,
            isFunnel: false,
            isFunnel3d: true,
            colors: {
              ranges: [
                {
                  from: 0,
                  to: 0,
                  color: undefined,
                },
              ],
              backgroundBarColors: [],
              backgroundBarOpacity: 1,
              backgroundBarRadius: 0,
            },
            dataLabels: {
              position: "top",
              maxItems: 100,
              hideOverflowingLabels: true,
              // total: {
              //   enabled: true,
              //   formatter: undefined,
              //   offsetX: 0,
              //   offsetY: 0,
              //   style: {
              //     color: "#373d3f",
              //     fontSize: "12px",
              //     fontFamily: undefined,
              //     fontWeight: 600,
              //   },
              // },
            },
          },
        },
        xaxis: {
          type: "datetime",
          categories: [
            "01/01/2011 GMT",
            "01/02/2011 GMT",
            "01/03/2011 GMT",
            "01/04/2011 GMT",
            "01/05/2011 GMT",
            "01/06/2011 GMT",
          ],
          axisBorder: {
            color: "#e0e6ed",
          },
        },
        yaxis: {
          opposite: true,
        },
        grid: {
          borderColor: "#e0e6ed",
        },
        legend: {
          position: "right",
          offsetY: 40,
        },
        tooltip: {
          theme: "light",
        },
        fill: {
          opacity: 0.8,
        },
      },
    };
    return (
      <>
        <div className="border-t-2 border-main p-3 grid grid-cols-1 gap-3 relative">
          <span className="text-text-main absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold text-base z-10">
            به زودی...{" "}
          </span>
          <div className="blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center gap-2">
                <span className="text-primary-main text-base">helpix logo</span>
                <span className="text-text-main text-sm font-semibold">
                  روند تغییرات قیمت بلیت سفر به بوشهر
                </span>
              </div>
            </div>
            <ReactApexChart
              series={ColumnChart.series}
              options={ColumnChart.options}
              className="rounded-lg bg-paper overflow-hidden"
              type="bar"
              height={300}
            />
          </div>
        </div>
      </>
    );
  };

  // render Chart on mobile
  const renderChartOnMobile = () => {
    switch (chartTabValue) {
      case "fluctuations":
        return renderPriceFluctuationsChartOnMobile();
      case "range":
        return renderPriceRangeChartOnMobile();
    }
  };

  const renderOnMobile = () => {
    const drawerContent = (
      <>
        <div className="flex flex-col items-stretch justify-start gap-0">
          <div className="bg-primary-main flex items-center justify-between min-h-16">
            <div className="flex items-end justify-center gap-0 h-full">
              <span
                onClick={() => {
                  handleChangeChartTabValue("range");
                }}
                className={`rounded-tab-down font-semibold text-sm ${
                  chartTabValue === "range"
                    ? "bg-paper text-primary-main"
                    : "bg-transparent text-paper"
                } h-10 flex items-center justify-center px-3`}
              >
                بازه قیمت
              </span>
              <span
                onClick={() => {
                  handleChangeChartTabValue("fluctuations");
                }}
                className={`${
                  chartTabValue === "fluctuations"
                    ? "bg-paper text-primary-main"
                    : "bg-transparent text-paper"
                } rounded-tab-down font-semibold text-sm h-10 flex items-center justify-center px-3`}
              >
                نوسانات قیمت
              </span>
            </div>
            <IconButton size="small" onClick={() => setOpenChartDrawer(false)}>
              <ClearIcon fontSize="small" className="text-paper" />
            </IconButton>
          </div>
          <div className="">{renderChartOnMobile()}</div>
        </div>
      </>
    );
    return (
      <>
        <div className="bg-paper rounded-xl md:hidden grid grid-cols-2 gap-0">
          <div className="col-span-2">{renderDailyPrice()}</div>{" "}
          <div className="col-span-1">{renderPriceRangeOnMobile()}</div>
          <div className="col-span-1">{renderPriceFluctuationsOnMobile()}</div>
        </div>
        <Drawer
          anchor={"right"}
          PaperProps={{
            sx: {
              width: "100%",
              backgroundColor: theme.palette.background.paper,
              position: "relative",
            },
          }}
          open={openChartDrawer}
          onClose={() => {
            setOpenChartDrawer(false);
          }}
        >
          {drawerContent}
        </Drawer>{" "}
      </>
    );
  };

  return (
    <>
      {renderOnDesktop()}
      {renderOnMobile()}
    </>
  );
};

export default PriceRateBox;
