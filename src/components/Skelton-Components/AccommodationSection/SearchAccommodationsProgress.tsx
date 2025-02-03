import { Divider, Skeleton } from "@mui/material";
import React from "react";

const SearchAccommodationsProgress = () => {
  const progressLength = Array.from(Array(5));

  return (
    <>
      <div className="grid grid-cols-1 gap-2">
        {progressLength.map((item, index) => (
          <React.Fragment key={index}>
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center justify-center gap-2">
                <Skeleton
                  animation="wave"
                  width={25}
                  height={25}
                  className=""
                  variant="circular"
                />
                <div className="flex flex-col items-stretch justify-center gap-px">
                  <Skeleton
                    animation="wave"
                    width={60}
                    height={23}
                    className="rounded-md"
                    variant="text"
                  />
                  <Skeleton
                    animation="wave"
                    width={85}
                    height={13}
                    className="rounded-sm"
                    variant="text"
                  />
                </div>
              </div>

              <Skeleton
                animation="wave"
                width={50}
                height={20}
                className="rounded-md"
                variant="text"
              />
            </div>
            {index < progressLength.length - 1 && (
              <Divider variant="fullWidth" />
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default SearchAccommodationsProgress;
