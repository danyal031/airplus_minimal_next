"use client";
import { useGlobalContext } from "@/context/store";
import { AccommodationsListDataType } from "@/DataTypes/accommodation/accommodationsListTypes";
import { getAccommodationsList, getMinPrice } from "@/global-files/axioses";
import { convertPersianToEnglishNumbers } from "@/global-files/function";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import AccommodationFilterBox from "./AccommodationFilterBox";
import AccommodationsList from "./AccommodationsList";
import moment from "jalali-moment";
import axios from "axios";
import customAxios from "@/utils/customAxios";

const AccommodationListContainer = () => {
  // initial states
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false); // Prevent duplicate requests
  const [fetchMore, setFetchMore] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const controllerRef = useRef(null);
  const originalItems = useRef([]);

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
  } = useGlobalContext().accommodationContext.accommodationSearch;

  const searchParams = useSearchParams();
  const router = useRouter();

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
      searchParams.get("destination") !== "null" &&
      searchParams.get("destination")
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
    const destination = searchParams.get("destination") as number | string;
    const departing = searchParams.get("departing") as string;
    const returning = searchParams.get("returning") as string;
    const type = "city";
    const adult_capacity = Number(searchParams.get("adultCapacity"));
    const child_capacity = Number(searchParams.get("childCapacity"));

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
      checkin_date: departing,
      checkout_date: returning,
      type,
      filters: false,
      paginate: {
        draw: pageValue,
        length: 20,
        start: 20 * (pageValue - 1),
      },
    };
    try {
      console.log("json", {
        ...json,
        filters: false,
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
          filters: false,
          paginate: {
            draw: pageValue,
            length: 20,
            start: 20 * (pageValue - 1),
          },
        },
      });
      console.log("response***", response);
      if (response.data.Status) {
        setHasMore(response.data.Table.next_page ? true : false);
        if (!accommodationDestination) {
          // setSelectedDestinationHotel(
          //   response.data.Search.city || response.data.Search.accommodation
          // );
          setAccommodationDestination(response.data.Search.city);
        }
        if (response.data.Data.length > 0) {
          const updatedList = toEmpty
            ? [...response.data.Data]
            : [...originalItems.current, ...response.data.Data];
          setAccommodationsList(updatedList);
          setFilteredSearchAccommodationsList(updatedList);
          setAccommodationsLoading(false);
          originalItems.current = updatedList;
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
        }
      }
    } catch (error: any) {
      if (error.name !== "AbortError" || error.name !== "CanceledError") {
        console.log("Error fetching data:", error);
      }
    }

    // getAccommodationsList(
    //   destination,
    //   departing,
    //   returning,
    //   type,
    //   adult_capacity,
    //   child_capacity,
    //   currentPage
    // )
    //   .then((res: any) => {
    //     if (res.Status) {
    //       console.log("Accommodations: ", res.Data);
    //       if (res.links.next === null) {
    //         console.log("res.links.next", res.links.next);
    //         setFetchMore(false);
    //       }

    //       setPage((prev) => prev + 1);
    //       setAccommodationsLoading(false);
    //       const updatedList = [...accommodationsList, ...res.Data];

    //       setAccommodationsList(updatedList);
    //       setFilteredSearchAccommodationsList(updatedList);

    //       const accommodationsIds = res.Data.map(
    //         (item: AccommodationsListDataType) => item.id
    //       );
    //       console.log("accommodationsIds", accommodationsIds);

    //       getMinPrice(departing, returning, accommodationsIds)
    //         .then((response: any) => {
    //           console.log("response33333", response);

    //           if (response.Status) {
    //             const mergedList = updatedList.map(
    //               (element: AccommodationsListDataType) => {
    //                 const priceItem = response.Data[element.id];
    //                 return {
    //                   ...element,
    //                   min_price: priceItem ? priceItem.min_price : 0,
    //                 };
    //               }
    //             );

    //             console.log("Merged accommodations with prices:", mergedList);

    //             setAccommodationsList(mergedList);
    //             setFilteredSearchAccommodationsList(mergedList);
    //           }
    //         })
    //         .catch((err) => {});
    //     }
    //   })
    //   .catch((err) => {})
    //   .finally(() => {
    //     setIsFetching(false);
    //   });
    // setAccommodationFromDate(searchParams.get("departing"));
    // setAccommodationToDate(searchParams.get("returning"));

    // setAccommodationPassengersCapacity({
    //   adultCapacity: adult_capacity,
    //   childCapacity: child_capacity,
    // });
  };

  useEffect(() => {
    if (searchParamsValidation(searchParams)) {
      originalItems.current = [];
      setPage(1);
      setHasMore(false);
      fetchAccommodations(1, true);
    } else {
      router.push("/");
    }
  }, [searchParams]);

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <AccommodationFilterBox />
        </div>
        <div className="col-span-12 md:col-span-9">
          <AccommodationsList
            fetchMore={fetchMore}
            page={page}
            fetchAccommodations={fetchAccommodations}
            infiniteScrollRef={infiniteScrollRef}
            hasMore={hasMore}
          />
        </div>
      </div>
    </>
  );
};

export default AccommodationListContainer;
