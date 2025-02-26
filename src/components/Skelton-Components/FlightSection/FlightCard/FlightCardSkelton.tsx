import { Divider, Skeleton } from "@mui/material";

export const FlightCardSkelton = () => {
  const renderSkeltonOnDesktop = () => {
    return (
      <>
        <div className="bg-paper border border-divider rounded-2xl w-full hidden md:grid grid-cols-12 gap-5 p-4">
          <div className="col-span-2 flex flex-col items-center justify-center gap-2">
            <Skeleton
              variant="circular"
              width={"40px"}
              height={"40px"}
              animation="wave"
            />
            <Skeleton
              variant="text"
              width={"80%"}
              height={"20px"}
              animation="wave"
            />
          </div>
          <div className="col-span-7 flex flex-col items-start justify-between">
            <Skeleton
              variant="text"
              width={"100%"}
              height={"30px"}
              animation="wave"
            />
            <div className="flex items-center justify-start gap-3">
              <Skeleton
                variant="rounded"
                width={"80px"}
                height={"22px"}
                className="rounded-xl"
                animation="wave"
              />{" "}
              <Skeleton
                variant="rounded"
                width={"80px"}
                height={"22px"}
                className="rounded-xl"
                animation="wave"
              />
            </div>
          </div>
          <div className="col-span-3 flex flex-col items-center justify-center gap-3">
            <Skeleton
              variant="rounded"
              width={"130px"}
              height={"25px"}
              className="rounded-xl"
              animation="wave"
            />
            <Skeleton
              variant="rounded"
              width={"80px"}
              height={"18px"}
              animation="wave"
            />
          </div>
        </div>
      </>
    );
  };

  const renderSkeltonOnMobile = () => {
    return (
      <>
        <div className="w-full min-h-14 md:hidden grid grid-cols-12 gap-2 bg-white border border-neutral-300 rounded-2xl px-4 py-3">
          <div className="col-span-12 grid grid-cols-3 gap-20">
            <div className="col-span-1 flex justify-center items-center">
              <Skeleton
                variant="rounded"
                width={"100%"}
                height={"17px"}
                animation="wave"
              />
            </div>
            <div className="col-span-1 flex justify-center items-center">
              <Skeleton
                variant="circular"
                width={"25px"}
                height={"25px"}
                animation="wave"
              />
            </div>
            <div className="col-span-1 flex justify-center items-center">
              <Skeleton
                variant="rounded"
                width={"100%"}
                height={"17px"}
                animation="wave"
              />
            </div>
          </div>
          <Divider className="col-span-12" variant="fullWidth" />
          <div className="col-span-12 flex items-center justify-between">
            <Skeleton
              variant="circular"
              width={"19px"}
              height={"19px"}
              animation="wave"
            />
            <Skeleton
              variant="rounded"
              width={"75px"}
              height={"16px"}
              animation="wave"
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {renderSkeltonOnDesktop()}
      {renderSkeltonOnMobile()}
    </>
  );
};
