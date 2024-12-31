import { Toman } from "@/components/Toman";

const moment = require("jalali-moment");

export const formatInputWithCommas = (
  input: number | string,
  fix: number = 3
): string => {
  if (!input && input !== 0) {
    return input as string;
  }

  const options: Intl.NumberFormatOptions = {
    style: "currency",
    currency: "IRR",
    minimumFractionDigits: 0,
    maximumFractionDigits: fix,
    currencyDisplay: "symbol",
  };
  const formatter = new Intl.NumberFormat("ir", options);
  return formatter
    .format(Number(input).toString().replace(/,/g, ""))
    .replace("IRR", "")
    .trim();
};

export const formatInputWithOutCommas = (input: number | string): string => {
  if (!input) {
    return input as string;
  }
  const cleanValue = input.toString().replace(/[^\d.]/g, "");
  return cleanValue;
};
export function convertPersianToEnglishNumbers(input: string): string {
  if (!input) {
    return input;
  }
  const persianDigits: string[] = [
    "۰",
    "۱",
    "۲",
    "۳",
    "۴",
    "۵",
    "۶",
    "۷",
    "۸",
    "۹",
  ];
  const englishDigits: string[] = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  for (let i: number = 0; i < persianDigits.length; i++) {
    const regex: RegExp = new RegExp(persianDigits[i], "g");
    input = input.replace(regex, englishDigits[i]);
  }

  return input;
}

// for convert created_at like this 2023-10-07T11:19:10.000000Z to like this سه‌شنبه, 04 مهر 1402 ساعت 10:28
export function convertToPersianDate(input: string): string {
  if (!input) {
    return input;
  }
  // Parse the input date
  const date: Date = new Date(convertPersianToEnglishNumbers(input));
  // Convert to Persian (Jalali) date
  const persianDate: string = new Intl.DateTimeFormat("fa-IR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);

  const tempDate = persianDate.split(",")[0].split(" ");
  const tempDayHour = persianDate.split(",")[1].split(" ");
  const finalPersianDate =
    tempDayHour[1] +
    " " +
    tempDate[2] +
    " " +
    tempDate[1] +
    " " +
    tempDate[0] +
    ", " +
    tempDayHour[2] +
    " " +
    tempDayHour[3];

  return finalPersianDate;
}

// takes two date-time strings in the format "2023-10-07T11:19:10.000000Z" and returns an object representing the distance between them in hours and minutes
export function calculateTimeDistance(
  startDateTime: string,
  endDateTime: string
): { hours: number; minutes: number } {
  const startDate: Date = new Date(startDateTime);
  const endDate: Date = new Date(endDateTime);

  // Calculate the time difference in milliseconds
  const timeDifference: number = endDate.getTime() - startDate.getTime();

  // Convert milliseconds to hours and minutes
  const hours: number = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes: number = Math.floor(
    (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
  );

  return { hours, minutes };
}

// Function to format date from "1402-09-21" to "1402/09/21"
export function formatDateWithSlash(dateString: string) {
  const [year, month, day] = dateString.split("-");
  return `${year}/${month}/${day}`;
}

// Function to format date from "1402/09/21" to "1402-09-21"
export function formatDateWithDash(dateString: string) {
  const [year, month, day] = dateString.split("/");
  return `${year}-${month}-${day}`;
}

// handel convert format date from "14030717" to "1403/07/17"
export function formatSimpleDateWithSlash(dateString: string) {
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);

  return `${year}/${month}/${day}`;
}

export function convertJalaliToMiladiDate(
  input: string,
  format = "jYYYY/jMM/jDD"
) {
  if (!input) {
    return input;
  }
  const timeMoment = moment(convertPersianToEnglishNumbers(input), format);
  const gregorianTime = timeMoment.toDate();
  return gregorianTime;
}

export function getLotteryPackagePrice(
  childrenNumber: string,
  singlePackageBase: number,
  childrenBase: number
) {
  return singlePackageBase + parseInt(childrenNumber) * childrenBase;
}

export function getDiscountedPrice(type: string, value: number, price: number) {
  if (type === "percentage") {
    return price - (price * value) / 100;
  } else {
    return price - value / 10;
  }
}

// convert "1403-10-04" to  2024-12-24
export const convertToGregorian = (shamsiDate: string) => {
  const gregorianDate = moment(shamsiDate, "jYYYY-jMM-jDD").format(
    "YYYY-MM-DD"
  );
  return gregorianDate;
};

export const options = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};

export function convertMiladiToJalaliDate(input: string) {
  if (!input) {
    return input;
  }
  const gregorianDate = moment(convertPersianToEnglishNumbers(input));
  const shamsiDate = gregorianDate.format("jYYYY/jMM/jDD");
  return shamsiDate;
}

export const removeMask = (action: string, input: string) => {
  switch (action) {
    case "phone":
      const phoneResult = input.replace(/-/g, "");
      return phoneResult;
    case "date":
      const dateResult = input.replace(/[-/]/g, "");
      return dateResult;
  }
};

export const applyMask = (action: string, input: string) => {
  switch (action) {
    case "phone":
      if (input.length > 3) {
        return `${input.slice(0, 3)}-${input.slice(3)}`;
      }
      return input;

    case "date":
      if (input?.length === 8) {
        return `${input.slice(0, 4)}-${input.slice(4, 6)}-${input.slice(6)}`;
      }
      return input;

    default:
      return input;
  }
};
// test
const convertNumbThousand = (x?: number): string => {
  if (!x) {
    return "0";
  }
  return x.toLocaleString("en-US");
};
export default convertNumbThousand;

export function calculateAgeCategory(jalaliBirthday: string) {
  if (jalaliBirthday !== null) {
    // Parse the Jalali date
    const birthdayMoment = moment(
      convertPersianToEnglishNumbers(jalaliBirthday),
      "jYYYY/jMM/jDD"
    );

    // Convert the Jalali date to Gregorian
    const gregorianBirthday = birthdayMoment.toDate();

    // Calculate the age in days
    const today = new Date();
    const ageInMilliseconds = today - gregorianBirthday;
    const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));

    // Determine the age category
    let category;

    if (ageInDays > 4380) {
      category = "ADU";
    } else if (ageInDays > 730 && ageInDays <= 4380) {
      category = "CHI";
    } else {
      category = "INF";
    }
    return category;
  } else {
    return "ADU";
  }
}

export function validateMelliCode(melliCode: string): boolean {
  const identicalDigits = [
    "0000000000",
    "1111111111",
    "2222222222",
    "3333333333",
    "4444444444",
    "5555555555",
    "6666666666",
    "7777777777",
    "8888888888",
    "9999999999",
  ];

  if (melliCode.trim() === "") {
    // alert("National Code is empty");
    return false;
  } else if (melliCode.length !== 10) {
    // alert("National Code must be exactly 10 digits");
    return false;
  } else if (identicalDigits.includes(melliCode)) {
    // alert("MelliCode is not valid (Fake MelliCode)");
    return false;
  } else {
    let sum = 0;

    for (let i = 0; i < 9; i++) {
      sum += parseInt(melliCode.charAt(i)) * (10 - i);
    }

    const divideRemaining = sum % 11;
    const lastDigit =
      divideRemaining < 2 ? divideRemaining : 11 - divideRemaining;

    if (parseInt(melliCode.charAt(9)) === lastDigit) {
      // alert("MelliCode is valid");
      return true;
    } else {
      // alert("MelliCode is not valid");
      return false;
    }
  }
}
