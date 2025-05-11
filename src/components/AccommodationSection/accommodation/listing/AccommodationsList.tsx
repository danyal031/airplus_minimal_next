"use client";
import { useGlobalContext } from "@/context/store";
import React, { FC, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AppsIcon from "@mui/icons-material/Apps";
import { motion } from "framer-motion";
import ListingAccommodationsProgress from "@/components/Skelton-Components/AccommodationSection/listing/ListingAccommodationsProgress";
import AccommodationCard from "./AccommodationCard";
import InfiniteScroll from "react-infinite-scroll-component";

// import { FixedSizeList as List, ListChildComponentProps } from "react-window";
// import { AccommodationsListDataType } from "@/DataTypes/accommodation/accommodationsListTypes";

// import InfiniteLoader from "react-window-infinite-loader";
// import { FixedSizeGrid as Grid } from "react-window";

interface AccommodationsListProps {
  fetchMore: boolean;
  page: number;
  fetchAccommodations: (currentPage: number) => void;
}
const AccommodationsList: FC<AccommodationsListProps> = ({
  fetchMore,
  page,
  fetchAccommodations,
}) => {
  // initial states
  const [filterTabValue, setFilterTabValue] = useState<string>("1");
  const {
    accommodationsLoading,
    filteredSearchAccommodationsList,
    typeOfAccommodation,
    setTypeOfAccommodation,
  } = useGlobalContext().accommodationContext.accommodationSearch;

  // handle change of filter tab
  const handleFilterTabChange = (newValue: string) => {
    setFilterTabValue(newValue);
  };

  // for handle change type of Show list
  const handleTypesOfShowList = (action: string) => {
    switch (action) {
      case "list":
        setTypeOfAccommodation(action);
      case "grid":
        setTypeOfAccommodation(action);
      default:
        console.warn("Invalid action type:", action);
    }
  };

  // for filter tabs
  const renderFilterTab = () => {
    const filtersOptions = [
      { id: "1", label: "پیش فرض" },
      { id: "2", label: "ارزانترین" },
      { id: "3", label: "گرانترین" },
      { id: "4", label: "بالاترین امتیاز" },
    ];
    return (
      <>
        <div className="col-span-7 grid grid-cols-8 gap-0">
          {filtersOptions.map((tab) => {
            const isActive = filterTabValue === tab.id;
            return (
              <span
                key={tab.id}
                onClick={() => handleFilterTabChange(tab.id)}
                className={`truncate col-span-2 text-sm hover:cursor-pointer flex items-center justify-center font-semibold h-9 rounded-tab-up-sm ${
                  isActive
                    ? "bg-main text-primary-main"
                    : "bg-paper text-text-subText"
                }`}
              >
                {tab.label}
              </span>
            );
          })}
        </div>
      </>
    );
  };

  // const Row: FC<ListChildComponentProps<AccommodationsListDataType[]>> = ({
  //   index,
  //   style,
  //   data,
  // }) => {
  //   const item = data[index]; // دریافت آیتم بر اساس ایندکس
  //   console.log("item", item);

  //   return (
  //     <div style={style}>
  //       {item ? (
  //         <motion.div
  //           initial={{ y: 100, opacity: 0 }}
  //           animate={{ y: 0, opacity: 1 }}
  //           transition={{ duration: 0.3 }}
  //         >
  //           <AccommodationCard data={item} />
  //         </motion.div>
  //       ) : (
  //         <div>Loading...</div>
  //       )}
  //     </div>
  //   );
  // };
  // render accommodations
  const renderAccommodations = () => {
    return (
      <>
        <InfiniteScroll
          dataLength={filteredSearchAccommodationsList.length}
          next={() => fetchAccommodations(page)}
          hasMore={fetchMore}
          loader={
            <div
              className={`${
                typeOfAccommodation === "grid" ? "col-span-3" : "col-span-1"
              }`}
            >
              <ListingAccommodationsProgress />
            </div>
          }
          scrollableTarget="scrollableDiv"
          className={`overflow-y-hidden grid ${
            typeOfAccommodation === "grid" ? "grid-cols-3" : "grid-cols-1"
          } gap-4`}
        >
          {filteredSearchAccommodationsList.map((item: any, index: number) => {
            return (
              <motion.div
                key={index}
                initial={{ y: 100, opacity: 0 }} // Initial position (below the viewport) and opacity
                animate={{ y: 0, opacity: 1 }} // Animation to move from bottom to top and fade in
                transition={{ duration: 0.3, delay: index * 0.1 }} // Animation duration and delay for each item
              >
                <AccommodationCard data={item} />
              </motion.div>
            );
          })}
        </InfiniteScroll>
        {/* <InfiniteScroll
          dataLength={filteredSearchAccommodationsList.length}
          next={() => fetchAccommodations(page)}
          hasMore={fetchMore}
          loader={
            <div className="col-span-3">
              <ListingAccommodationsProgress />
            </div>
          }
          scrollableTarget="scrollableDiv"
          // className={`overflow-y-hidden grid ${
          //   typeOfAccommodation === "grid" ? "grid-cols-3" : "grid-cols-1"
          // } gap-4`}
        >
         
          <List
            height={600}
            itemCount={filteredSearchAccommodationsList.length}
            itemSize={200}
            width="100%"
            itemData={filteredSearchAccommodationsList} // ارسال کل لیست به عنوان داده
          >
            {Row}
          </List>
        </InfiniteScroll> */}
      </>
    );
  };

  // for Desktop
  const renderOnDesktop = () => {
    return (
      <>
        <div className="hidden md:grid grid-cols-1 gap-2">
          <div className="flex items-center justify-start">
            <span className="text-text-subText text-base flex items-center justify-center gap-0">
              <span>رزرو</span>
              <KeyboardArrowLeftIcon fontSize="small" />
              <span>هتل</span>
            </span>
          </div>
          <div className="bg-paper rounded-xl px-5 pb-3 grid grid-cols-1 gap-3">
            <div className="grid grid-cols-10 gap-5">
              <div className="col-span-1 flex items-center justify-center gap-1">
                <span className="text-text-main text-sm truncate font-semibold">
                  مرتب سازی
                </span>
              </div>
              {renderFilterTab()}
              <div className="col-span-2 flex items-end">
                <div className="w-full flex items-center justify-center gap-0 py-0 px-2 rounded-lg bg-main mt-2 h-8">
                  <span className="text-text-main text-xs font-semibold">
                    نوع نمایش
                  </span>
                  <IconButton
                    size="small"
                    onClick={() => {
                      handleTypesOfShowList("list");
                    }}
                  >
                    {typeOfAccommodation === "list" ? (
                      <MenuIcon fontSize="small" color="primary" />
                    ) : (
                      <MenuIcon fontSize="small" />
                    )}
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => {
                      handleTypesOfShowList("grid");
                    }}
                  >
                    {typeOfAccommodation === "grid" ? (
                      <AppsIcon fontSize="small" color="primary" />
                    ) : (
                      <AppsIcon fontSize="small" />
                    )}
                  </IconButton>
                </div>
              </div>
              <div className="col-span-10">
                {!accommodationsLoading ? (
                  filteredSearchAccommodationsList.length > 0 ? (
                    renderAccommodations()
                  ) : (
                    <div className="flex items-center justify-center min-h-52 w-full">
                      <span className="text-base font-semibold">
                        هتلی جهت نمایش وجود ندارد
                      </span>
                    </div>
                  )
                ) : (
                  <ListingAccommodationsProgress />
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // for Mobile
  const renderOnMobile = () => {
    return <></>;
  };

  return (
    <>
      {renderOnDesktop()}
      {renderOnMobile()}
    </>
  );
};

export default AccommodationsList;
