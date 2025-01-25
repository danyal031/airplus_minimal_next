"use client";
import { IconButton, useTheme } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useShowAlert } from "@/hooks/useShowAlert";
import ReactApexChart from "react-apexcharts";

const PriceRateBox = () => {
  // initial states
  const [isOpenPriceRangeChart, setIsOpenPriceRangeChart] = useState(false);
  const [isOpenPriceFluctuationsChart, setIsOpenPriceFluctuationsChart] =
    useState(false);
  const theme = useTheme();

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
        {" "}
        <div
          className={`${
            isOpenPriceRangeChart ? "text-primary-main" : "text-text-main"
          } text-sm grid grid-cols-1 gap-3 p-2 border-l-2 border-main`}
        >
          {" "}
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
        {" "}
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
  return (
    <div className="bg-paper rounded-xl grid grid-cols-2 gap-0">
      <div className="col-span-2">{renderDailyPrice()}</div>{" "}
      <div className="col-span-1">{renderPriceRange()}</div>
      <div className="col-span-1">{renderPriceFluctuations()}</div>
      <div className="col-span-2">{renderPriceRangeChart()}</div>
      <div className="col-span-2">{renderPriceFluctuationsChart()}</div>
    </div>
  );
};

export default PriceRateBox;
