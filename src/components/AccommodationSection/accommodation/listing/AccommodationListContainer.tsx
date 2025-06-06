"use client";
import { useGlobalContext } from "@/context/store";
import { AccommodationsListDataType } from "@/DataTypes/accommodation/accommodationsListTypes";
import { getAccommodationsList, getMinPrice } from "@/global-files/axioses";
import {
  convertPersianToEnglishNumbers,
  convertToGregorian,
} from "@/global-files/function";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { FC, useEffect, useRef, useState } from "react";
import AccommodationFilterBox from "./AccommodationFilterBox";
import AccommodationsList from "./AccommodationsList";
import moment from "jalali-moment";
import axios from "axios";
import customAxios from "@/utils/customAxios";
import { Chip } from "@mui/material";

interface AccommodationListContainerProps {
  action: "accommodation" | "flight-accommodation";
}

const AccommodationListContainer: FC<AccommodationListContainerProps> = ({
  action,
}) => {
  // initial states
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false); // Prevent duplicate requests
  const [fetchMore, setFetchMore] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const controllerRef = useRef(null);
  const originalItems = useRef([]);
  const infiniteScrollRef = useRef(null);
  const scrollableDivRef = useRef(null);
  const [showProgressLoading, setShowProgressLoading] = useState(true);

  const {
    accommodationsList,
    setAccommodationsList,
    setAccommodationPassengersCapacity,
    setAccommodationFromDate,
    setAccommodationToDate,
    setFilteredSearchAccommodationsList,
    setAccommodationsLoading,
    setSelectedAccommodation,
    accommodationFromDate,
    accommodationToDate,
    setAccommodationDestination,
    accommodationDestination,
    accommodationPassengersCapacity,
    addedRooms,
  } = useGlobalContext().accommodationContext.accommodationSearch;
  const { setAccommodationOnlyCharters, setNumberStars } =
    useGlobalContext().flightAccommodationContext.flightAccommodationSearch;

  const { setSearchType } = useGlobalContext().global;

  const searchParams = useSearchParams();
  const router = useRouter();

  // handle initial search type
  useEffect(() => {
    setSearchType(action);
  }, []);

  //  handle clear selected rooms
  const handleClearSelectedAccommodation = () => {
    setSelectedAccommodation(null);
  };
  useEffect(() => {
    // handle clear selected rooms
    handleClearSelectedAccommodation();
  }, []);

  const searchParamsValidation = (searchParams: ReadonlyURLSearchParams) => {
    let dateRegex: RegExp = /[0-9]{4}-[0-9]{2}-[0-9]{2}/i;
    let departureCheck = dateRegex.test(
      convertPersianToEnglishNumbers(searchParams.get("departing") as string)
    );
    let returnCheck = dateRegex.test(
      convertPersianToEnglishNumbers(searchParams.get("returning") as string)
    );

    let destinationCheck =
      action === "accommodation"
        ? searchParams.get("destination") !== "null" &&
          searchParams.get("destination")
          ? true
          : false
        : searchParams.get("accommodation") &&
          searchParams.get("accommodation") !== "null"
        ? true
        : false;

    console.log({ departureCheck, returnCheck, destinationCheck });
    return departureCheck && returnCheck && destinationCheck;
  };

  const getHotelsMinPrice = (json: any, updatedData: any) => {
    console.log("getHotelsMinPrice json", json);
    customAxios
      .get(`/online/accommodation/get_min_prices`, {
        // signal: controller.signal,
        params: json,
      })
      .then((response) => {
        console.log("getHotelsMinPrice response", response.data);
        if (response.data.Status) {
          const tempUpdatedData = [...updatedData].map((item, index) => {
            const minPrice = response.data?.Data[item.id]?.min_price;
            if (minPrice || minPrice == 0)
              return {
                ...item,
                min_price: minPrice,
              };
            else
              return {
                ...item,
              };
          });
          console.log("Items Is Ready: ", tempUpdatedData);
          originalItems.current = tempUpdatedData;
          setAccommodationsList(tempUpdatedData);
          setFilteredSearchAccommodationsList(tempUpdatedData);
        }
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };

  const fetchAccommodations = async (pageValue = page, toEmpty = false) => {
    const destination =
      action === "accommodation"
        ? (searchParams.get("destination") as number | string)
        : (searchParams.get("accommodation") as number | string);
    const departing = searchParams.get("departing") as string;
    const returning = searchParams.get("returning") as string;
    const searchType = searchParams.get("action") as string;
    const type = action === "flight-accommodation" ? "iata" : searchType;
    const adult_capacity = Number(searchParams.get("adultCapacity"));
    const child_capacity = Number(searchParams.get("childCapacity"));
    const accommodationOnlyCharter =
      searchParams.get("accommodationOnlyCharters") === "true" ? true : false;
    const stars = Number(searchParams.get("stars"));
    const accommodationName = searchParams.get("name");
    console.log("###", stars, accommodationOnlyCharter);

    setIsFetching(true);
    handleClearSelectedAccommodation();
    // if (accommodationsList.length === 0) {
    //   setAccommodationsLoading(true);
    // }
    setAccommodationsLoading(true);
    console.log("page", pageValue);
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const controller = new AbortController();
    controllerRef.current = controller;
    const json = {
      value: destination,
      checkin_date: convertToGregorian(departing),
      checkout_date: convertToGregorian(returning),
      type,
      filters: {
        only_charters: accommodationOnlyCharter,
        ...(stars &&
          !isNaN(stars) && {
            stars: Array.from({ length: stars }, (_, i) => stars - i),
          }),
        ...(accommodationName && { name: accommodationName }),
      },
      paginate: {
        draw: pageValue,
        length: 20,
        start: 20 * (pageValue - 1),
      },
    };
    try {
      console.log("json", {
        ...json,
        paginate: {
          draw: pageValue,
          length: 20,
          start: 20 * (pageValue - 1),
        },
      });
      const response = await customAxios.get(`/online/accommodation/list`, {
        signal: controller.signal,
        params: {
          ...json,
          // filters: false,
          paginate: {
            draw: pageValue,
            length: 20,
            start: 20 * (pageValue - 1),
          },
        },
      });
      console.log("response***", response);
      if (response.data.Status) {
        setAccommodationFromDate(departing);
        setAccommodationToDate(returning);
        setAccommodationOnlyCharters(accommodationOnlyCharter);
        setNumberStars(stars);
        setHasMore(response.data.Table.next_page ? true : false);
        // setSelectedDestinationHotel(
        //   response.data.Search.city || response.data.Search.accommodation
        // );
        setAccommodationDestination(response.data.Search.city);
        setAccommodationPassengersCapacity({
          adultCapacity: adult_capacity,
          childCapacity: child_capacity,
        });

        if (response.data.Data.length > 0) {
          const updatedList = toEmpty
            ? [...response.data.Data]
            : [...originalItems.current, ...response.data.Data];
          setAccommodationsList(updatedList);
          setFilteredSearchAccommodationsList(updatedList);
          setAccommodationsLoading(false);
          originalItems.current = updatedList;
          setShowProgressLoading(false);
          getHotelsMinPrice(
            {
              ...json,
              accommodations: updatedList
                .filter((item) => isNaN(item.min_price))
                .map((elm) => elm.id),
            },
            updatedList
          );
          setPage((prev) => prev + 1);
        } else {
          console.log("آیتمی وجود ندارد");
          setAccommodationsLoading(false);
          setShowProgressLoading(false);
        }
      }
    } catch (error: any) {
      if (error.name !== "AbortError" || error.name !== "CanceledError") {
        console.log("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    if (searchParamsValidation(searchParams)) {
      originalItems.current = [];
      setPage(1);
      setHasMore(false);
      setShowProgressLoading(true);
      setFilteredSearchAccommodationsList([]);
      setAccommodationsList([]);
      fetchAccommodations(1, true);
    } else {
      router.push("/");
      console.log(
        "searchParamsValidation",
        searchParamsValidation(searchParams)
      );
    }
  }, [searchParams]);

  // handle render selected room
  const renderSelectedRooms = () => {
    return (
      <div className="flex flex-col items-start justify-center gap-2">
        <span className="text-text-main font-semibold text-base">
          اتاق های انتخابی:
        </span>
        <div className="flex flex-wrap items-center justify-start gap-2">
          {addedRooms.map((item: any, index: number) => {
            return (
              <Chip
                key={index}
                size="small"
                color="primary"
                label={`${item.room_type.title.fa} | ${item.title.fa}`}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <AccommodationFilterBox />
        </div>
        <div className="col-span-12 md:col-span-9">
          {addedRooms.length > 0 && renderSelectedRooms()}
          <AccommodationsList
            fetchMore={fetchMore}
            page={page}
            fetchAccommodations={fetchAccommodations}
            infiniteScrollRef={infiniteScrollRef}
            scrollableDivRef={scrollableDivRef}
            hasMore={hasMore}
            showProgressLoading={showProgressLoading}
          />
        </div>
      </div>
    </>
  );
};

export default AccommodationListContainer;
