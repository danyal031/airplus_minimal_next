import React from "react";

const page = () => {
  const renderAboutAndTargetContent = () => {
    const content = [
      {
        id: 1,
        label: "درباره ایرپلاس",
        description:
          "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
      },
      {
        id: 2,
        label: "اهداف ایرپلاس",
        description:
          "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
      },
    ];
    return (
      <>
        <div className="grid grid-cols-2 gap-14">
          {content.map((item) => {
            return (
              <>
                <div
                  key={item.id}
                  className="flex flex-col items-start justify-start gap-3"
                >
                  <span className="text-text-main font-bold text-base">
                    {item.label}
                  </span>
                  <span className="text-text-main font-semibold text-sm text-justify leading-7">
                    {item.description}
                  </span>
                </div>
              </>
            );
          })}{" "}
        </div>
      </>
    );
  };
  const renderFeatures = () => {
    const features = [
      { id: 1, title: "تست" },
      { id: 2, title: "تست" },
      { id: 3, title: "تست" },
      { id: 4, title: "تست" },
      { id: 5, title: "تست" },
    ];
    return (
      <>
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-5 flex items-center justify-center">
            <span className="text-text-main font-bold text-base">
              ویژگی های ایرپلاس
            </span>
          </div>
          {features.map((item) => {
            return (
              <>
                <div
                  key={item.id}
                  className="bg-main rounded-lg p-4 flex items-center justify-center border-2 hover:border-primary-main cursor-pointer"
                >
                  <span className="text-text-main font-bold">{item.title}</span>
                </div>
              </>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <div className="grid grid-cols-1 gap-12">
      {renderAboutAndTargetContent()}
      {renderFeatures()}
    </div>
  );
};

export default page;
