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
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import AccommodationFilterBox from "./AccommodationFilterBox";
import AccommodationsList from "./AccommodationsList";

const AccommodationListContainer = () => {
  // initial states
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false); // Prevent duplicate requests
  const [fetchMore, setFetchMore] = useState(true);

  const {
    accommodationsList,
    setAccommodationsList,
    setAccommodationPassengersCapacity,
    setAccommodationFromDate,
    setAccommodationToDate,
    setFilteredSearchAccommodationsList,
    setAccommodationsLoading,
    setSelectedAccommodation,
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
  const fetchAccommodations = (currentPage: number) => {
    const destination = searchParams.get("destination") as number | string;
    const departing = searchParams.get("departing") as string;
    const returning = searchParams.get("returning") as string;
    const type = "city";
    const adult_capacity = Number(searchParams.get("adultCapacity"));
    const child_capacity = Number(searchParams.get("childCapacity"));

    setIsFetching(true);
    handleClearSelectedAccommodation();
    if (accommodationsList.length === 0) {
      setAccommodationsLoading(true);
    }

    getAccommodationsList(
      destination,
      departing,
      returning,
      type,
      adult_capacity,
      child_capacity,
      currentPage
    )
      .then((res: any) => {
        if (res.Status) {
          console.log("Accommodations: ", res.Data);
          if (res.links.next === null) {
            console.log("res.links.next", res.links.next);
            setFetchMore(false);
          }

          setPage((prev) => prev + 1);
          setAccommodationsLoading(false);
          const updatedList = [...accommodationsList, ...res.Data];

          setAccommodationsList(updatedList);
          setFilteredSearchAccommodationsList(updatedList);

          const accommodationsIds = res.Data.map(
            (item: AccommodationsListDataType) => item.id
          );
          console.log("accommodationsIds", accommodationsIds);

          getMinPrice(departing, returning, accommodationsIds)
            .then((response: any) => {
              console.log("response33333", response);

              if (response.Status) {
                const mergedList = updatedList.map(
                  (element: AccommodationsListDataType) => {
                    const priceItem = response.Data[element.id];
                    return {
                      ...element,
                      min_price: priceItem ? priceItem.min_price : 0,
                    };
                  }
                );

                console.log("Merged accommodations with prices:", mergedList);

                setAccommodationsList(mergedList);
                setFilteredSearchAccommodationsList(mergedList);
              }
            })
            .catch((err) => {});
        }
      })
      .catch((err) => {})
      .finally(() => {
        setIsFetching(false);
      });
    setAccommodationFromDate(searchParams.get("departing"));
    setAccommodationToDate(searchParams.get("returning"));

    setAccommodationPassengersCapacity({
      adultCapacity: adult_capacity,
      childCapacity: child_capacity,
    });
  };

  useEffect(() => {
    if (searchParamsValidation(searchParams)) {
      fetchAccommodations(1);
      setFetchMore(true);
      setPage(1);
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
          />
        </div>
      </div>
    </>
  );
};

export default AccommodationListContainer;
