"use client";
import { useGlobalContext } from "@/context/store";
import {
  convertJalaliToMiladiDate,
  convertPersianToEnglishNumbers,
} from "@/global-files/function";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SearchParamsTypes } from "@/app/(shared-layout)/listing/accommodations/page";
import AccommodationFilterBox from "./AccommodationFilterBox";
import InfiniteScroll from "react-infinite-scroll-component";
import AccommodationCard from "./AccommodationCard";
import { getAccommodationsList, getMinPrice } from "@/global-files/axioses";

interface AccommodationListContainerProps {
  searchParams: SearchParamsTypes;
}

const AccommodationListContainer = ({
  searchParams,
}: AccommodationListContainerProps) => {
  // initial states
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const controllerRef = useRef(null);
  const scrollableDivRef = useRef(null);
  const infiniteScrollRef = useRef(null);
  const originalItems = useRef([]);
  const [showProgressLoading, setShowProgressLoading] = useState(false);
  const [displayedList, setDisplayedList] = useState([]);

  const {
    accommodationsList,
    setAccommodationsList,
    setAccommodationPassengersCapacity,
    setAccommodationFromDate,
    setAccommodationToDate,
    setFilteredSearchAccommodationsList,
    filteredSearchAccommodationsList,
    setAccommodationsLoading,
    setSelectedAccommodation,
    setAccommodationDestination,
    accommodationDestination,
  } = useGlobalContext().accommodationContext.accommodationSearch;

  const router = useRouter();

  //  handle clear selected rooms
  const handleClearSelectedAccommodation = () => {
    setSelectedAccommodation(null);
  };
  useEffect(() => {
    // handle clear selected rooms
    handleClearSelectedAccommodation();
  }, []);

  function setURL(data: {
    value: string;
    checkin_date: string;
    checkout_date: string;
    type: string;
  }) {
    const { value, checkin_date, checkout_date, type } = data;
    const url = new URL(window.location.href);
    url.searchParams.set("destination", value);
    url.searchParams.set("departing", checkin_date);
    url.searchParams.set("returning", checkout_date);
    url.searchParams.set("type", type);
    window.history.replaceState({}, "", url);
  }

  const getAccommodationMinPrice = (json: any, updatedData: any) => {
    console.log("getHotelsMinPrice json", json);

    getMinPrice(json)
      .then((response: any) => {
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
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const fetchData = async (
    json = {
      value: searchParams.destination,
      checkin_date: searchParams.departing,
      checkout_date: searchParams.returning,
      type: "city",
      adult_capacity: searchParams.adultCapacity,
      child_capacity: searchParams.childCapacity,
    },
    pageValue = page,
    toEmpty = false
  ) => {
    console.log("page", pageValue);
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const controller = new AbortController();
    controllerRef.current = controller;
    try {
      setURL(json);
      console.log("json", {
        ...json,
        filters: false,
        paginate: {
          draw: pageValue,
          length: 20,
          start: 20 * (pageValue - 1),
        },
      });
      const response: any = await getAccommodationsList({
        ...json,
        filters: false,
        paginate: {
          draw: pageValue,
          length: 20,
          start: 20 * (pageValue - 1),
        },
        signal: controller.signal,
      });

      console.log("response***", response);
      if (response.data.Status) {
        setHasMore(response.data.Table.next_page ? true : false);
        if (!accommodationDestination) {
          setAccommodationDestination(
            response.data.Search.city || response.data.Search.accommodation
          );
        }
        if (response.data.Data.length > 0) {
          const updatedList = toEmpty
            ? [...response.data.Data]
            : [...originalItems.current, ...response.data.Data];
          setAccommodationsList(updatedList);
          setShowProgressLoading(false);
          originalItems.current = updatedList;
          getAccommodationMinPrice(
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
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    const div = scrollableDivRef.current;
    const infinite = infiniteScrollRef.current;
    if (
      div &&
      infinite &&
      infinite._infScroll.clientHeight < div.clientHeight &&
      hasMore
    ) {
      fetchData();
    }
  }, [accommodationsList]);

  useEffect(() => {
    if (
      // new URLSearchParams(window.location.search).get("value") &&
      // new URLSearchParams(window.location.search).get("checkin_date") &&
      // new URLSearchParams(window.location.search).get("checkout_date") &&
      // new URLSearchParams(window.location.search).get("type")
      searchParams.destination &&
      searchParams.departing &&
      searchParams.returning
    ) {
      setShowProgressLoading(true);
      fetchData({
        value: searchParams.destination,
        checkin_date: searchParams.departing,
        checkout_date: searchParams.returning,
        type: "city",
        adult_capacity: searchParams.adultCapacity,
        child_capacity: searchParams.childCapacity,
      });
      setAccommodationFromDate(
        convertJalaliToMiladiDate(searchParams.departing)
      );
      setAccommodationToDate(convertJalaliToMiladiDate(searchParams.returning));
      console.log(displayedList);
      setAccommodationDestination(
        displayedList.find(
          (item) => item.id === parseInt(searchParams.destination)
        )
      );
    }
  }, []);

  // const searchParamsValidation = (searchParams: SearchParamsTypes) => {
  //   let dateRegex: RegExp = /[0-9]{4}-[0-9]{2}-[0-9]{2}/i;
  //   let departureCheck = dateRegex.test(
  //     convertPersianToEnglishNumbers(searchParams.departing)
  //   );
  //   let returnCheck = dateRegex.test(
  //     convertPersianToEnglishNumbers(searchParams.returning)
  //   );

  //   let destinationCheck =
  //     searchParams.destination !== "null" && searchParams.destination
  //       ? true
  //       : false;

  //   console.log({ departureCheck, returnCheck, destinationCheck });
  //   return departureCheck && returnCheck && destinationCheck;
  // };
  // const fetchAccommodations = (currentPage: number) => {
  //   const destination = searchParams.destination;
  //   const departing = searchParams.departing;
  //   const returning = searchParams.returning;
  //   const type = "city";
  //   const adult_capacity = Number(searchParams.adultCapacity);
  //   const child_capacity = Number(searchParams.childCapacity);

  //   setIsFetching(true);
  //   handleClearSelectedAccommodation();
  //   if (accommodationsList.length === 0) {
  //     setAccommodationsLoading(true);
  //   }

  //   getAccommodationsList(
  //     destination,
  //     departing,
  //     returning,
  //     type,
  //     adult_capacity,
  //     child_capacity,
  //     currentPage
  //   )
  //     .then((res: any) => {
  //       if (res.Status) {
  //         console.log("Accommodations: ", res.Data);
  //         if (res.links.next === null) {
  //           console.log("res.links.next", res.links.next);
  //           setFetchMore(false);
  //         }

  //         setPage((prev) => prev + 1);
  //         setAccommodationsLoading(false);
  //         const updatedList = [...accommodationsList, ...res.Data];

  //         setAccommodationsList(updatedList);
  //         setFilteredSearchAccommodationsList(updatedList);

  //         const accommodationsIds = res.Data.map(
  //           (item: AccommodationsListDataType) => item.id
  //         );
  //         console.log("accommodationsIds", accommodationsIds);

  //         getMinPrice(departing, returning, accommodationsIds)
  //           .then((response: any) => {
  //             console.log("response33333", response);

  //             if (response.Status) {
  //               const mergedList = updatedList.map(
  //                 (element: AccommodationsListDataType) => {
  //                   const priceItem = response.Data[element.id];
  //                   return {
  //                     ...element,
  //                     min_price: priceItem ? priceItem.min_price : 0,
  //                   };
  //                 }
  //               );

  //               console.log("Merged accommodations with prices:", mergedList);

  //               setAccommodationsList(mergedList);
  //               setFilteredSearchAccommodationsList(mergedList);
  //             }
  //           })
  //           .catch((err) => {});
  //       }
  //     })
  //     .catch((err) => {})
  //     .finally(() => {
  //       setIsFetching(false);
  //     });
  //   setAccommodationFromDate(searchParams.departing);
  //   setAccommodationToDate(searchParams.returning);

  //   setAccommodationPassengersCapacity({
  //     adultCapacity: adult_capacity,
  //     childCapacity: child_capacity,
  //   });
  // };

  // useEffect(() => {
  //   if (searchParamsValidation(searchParams)) {
  //     fetchAccommodations(1);
  //     setFetchMore(true);
  //     setPage(1);
  //   } else {
  //     router.push("/");
  //   }
  // }, [searchParams]);

  return (
    <>
      {/* <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <AccommodationFilterBox />
        </div>
        <div className="col-span-12 md:col-span-9">
          <AccommodationsList
            fetchMore={fetchMore}
            page={page}
            fetchAccommodations={fetchAccommodations}
          />
        </div>
      </div> */}
      {/*  */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <AccommodationFilterBox />
        </div>{" "}
        <div className="col-span-9">
          <InfiniteScroll
            dataLength={accommodationsList.length}
            next={fetchData}
            hasMore={hasMore}
            scrollThreshold={1}
            loader={
              <div className="flex items-center justify-center">
                <span>loading...</span>
              </div>
            }
            className="overflow-y-hidden"
          >
            {accommodationsList
              .filter((elm) => elm.min_price !== 0)
              .map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 100, opacity: 0 }} // Initial position (below the viewport) and opacity
                  animate={{ y: 0, opacity: 1 }} // Animation to move from bottom to top and fade in
                  transition={{ duration: 0.3, delay: index * 0.1 }} // Animation duration and delay for each item
                >
                  {" "}
                  <AccommodationCard
                    data={item}
                    key={index}
                    // setOpenRoomsDrawer={setOpenRoomsDrawer}
                  />
                </motion.div>
              ))}
          </InfiniteScroll>
          {!hasMore && accommodationsList.length > 0 && (
            <div>
              {accommodationsList
                .filter((elm) => elm.min_price == 0)
                .map((item, index) => (
                  <AccommodationCard
                    data={item}
                    key={index}
                    // setOpenRoomsDrawer={setOpenRoomsDrawer}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AccommodationListContainer;
