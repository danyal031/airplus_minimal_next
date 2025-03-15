import { Skeleton } from "@mui/material";
import React, { FC } from "react";

const MostViewedArticlesProgress = () => {
  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      {Array.from(Array(4)).map((item, index) => (
        <ArticleCard
          key={index}
          typeRendering={
            index === 0 || index === 3 ? "full-width" : "half-width"
          }
        />
      ))}
    </div>
  );
};

export default MostViewedArticlesProgress;

interface ArticleCardProps {
  typeRendering: "full-width" | "half-width";
}
const ArticleCard: FC<ArticleCardProps> = ({ typeRendering }) => {
  // render full width
  const renderFullWidthCard = () => {
    return (
      <>
        <div className="col-span-2 rounded-2xl bg-paper h-36 grid grid-cols-3 gap-3 overflow-hidden">
          <div className="col-span-1 p-2">
            <Skeleton
              variant="rounded"
              width={"100%"}
              height={"100%"}
              animation="wave"
              className="col-span-1 rounded-xl"
            />
          </div>
          <div className="grid grid-cols-1 gap-0 col-span-2 p-2">
            <Skeleton
              variant="text"
              width={"350px"}
              height={"20px"}
              animation="wave"
            />{" "}
            <Skeleton
              variant="text"
              width={"200px"}
              height={"20px"}
              animation="wave"
            />{" "}
            <Skeleton
              variant="text"
              width={"180px"}
              height={"20px"}
              animation="wave"
            />{" "}
            <Skeleton
              variant="text"
              width={"160px"}
              height={"20px"}
              animation="wave"
            />{" "}
            <Skeleton
              variant="text"
              width={"180px"}
              height={"20px"}
              animation="wave"
            />{" "}
            <Skeleton
              variant="text"
              width={"240px"}
              height={"20px"}
              animation="wave"
            />
          </div>
        </div>
      </>
    );
  };

  // render half width
  const renderHalfWidthCard = () => {
    return (
      <>
        <div className="col-span-1 h-56 rounded-2xl bg-paper p-2 flex flex-col items-center justify-start gap-2">
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={"120px"}
            animation="wave"
            className="col-span-1 rounded-xl"
          />
          <div className="w-full grid grid-cols-1 gap-0">
            {" "}
            <Skeleton
              variant="text"
              width={"320px"}
              height={"20px"}
              animation="wave"
            />{" "}
            <Skeleton
              variant="text"
              width={"200px"}
              height={"20px"}
              animation="wave"
            />{" "}
            <Skeleton
              variant="text"
              width={"160px"}
              height={"20px"}
              animation="wave"
            />
            <Skeleton
              variant="text"
              width={"180px"}
              height={"20px"}
              animation="wave"
            />
          </div>
        </div>
      </>
    );
  };

  // for render most viewed card
  const renderCard = (typeRendering: string) => {
    switch (typeRendering) {
      case "full-width":
        return renderFullWidthCard();
      case "half-width":
        return renderHalfWidthCard();
    }
  };
  return <>{renderCard(typeRendering)}</>;
};
