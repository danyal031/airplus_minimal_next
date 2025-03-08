import axios from "axios";
import { convertJalaliToMiladiDate, convertToGregorian } from "./function";
import {
  authInputType,
  authSubmitInputType,
  baseDataDataType,
} from "@/DataTypes/globalTypes";
import { onlineFlightSearchInputType } from "@/DataTypes/flight/flightTicket";

// axios.defaults.headers.common["Authorization"] =
//   "Bearer " + localStorage.getItem("access_token");

export const getAuthOtp = ({ mobile }: authInputType) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        ((process.env.NEXT_PUBLIC_BASE_URL_2 as string) +
          process.env.NEXT_PUBLIC_AUTH_OTP_ENDPOINT) as string,
        { mobile }
      )
      .then((response) => {
        // Handle successful response here
        console.log("response", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        // Handle error here
        console.log("error", error);
        reject(error);
      });
  });
};
export const getAuthSubmit = ({ passenger_id, otp }: authSubmitInputType) => {
  console.log(passenger_id, otp);
  return new Promise((resolve, reject) => {
    axios
      .post(
        ((process.env.NEXT_PUBLIC_BASE_URL_2 as string) +
          process.env.NEXT_PUBLIC_AUTH_SUBMIT_ENDPOINT) as string,
        {
          passenger_id,
          otp,
        }
      )
      .then((response) => {
        // Handle successful response here
        console.log("response", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        // Handle error here
        console.log("error", error);
        reject(error);
      });
  });
};

export const getCountryList = (props: baseDataDataType) => {
  console.log("sent data", props);
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.NEXT_PUBLIC_BASE_URL_2 + "/base/data", {
        params: {
          action: props.action, // citizenship, countries, states, cities
          route: props.route, // country, state
          country: props.country,
          state: props.state,
        },
      })
      .then((response) => {
        console.log("response", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  });
};

export const handleFileUpload = async (e: any, type = "tmp", file = false) => {
  const selectedFile = file ? file : e.target.files[0];
  if (selectedFile) {
    const formData = new FormData();
    formData.append("file", selectedFile); // 'file' should match the field name expected by your API
    formData.append("type", type);
    try {
      const response = await axios.post("/upload/s3", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important: Set the content type
        },
      });
      // Handle the response from the API here, e.g., update state or show a success message.
      return response.data.file;
    } catch (error) {
      // Handle any errors that occur during the upload.
      console.error("Error upload file:", error);
      return "error";
    }
  }
};

export const handleStoreLotteryJson = async (data: any) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");
  return new Promise((resolve, reject) => {
    axios
      .post(process.env.NEXT_PUBLIC_BASE_URL_2 + "/trade/store" + "", data)
      .then((response) => {
        // Handle successful response here
        console.log("response", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        // Handle error here
        console.log("error", error);
        reject(error);
      });
  });
};

export const getPaymentStatus = async (refId: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.NEXT_PUBLIC_BASE_URL_2 + "/gateway/details", {
        params: { serial_id: refId },
      })
      .then((response) => {
        // Handle successful response here
        console.log("response", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        // Handle error here
        console.log("error", error);
        reject(error);
      });
  });
};

export const submitDiscountCode = async (data: any) => {
  console.log("discount: ", data);

  return new Promise((resolve, reject) => {
    axios
      .get(
        ((process.env.NEXT_PUBLIC_BASE_URL_2 as string) +
          process.env.NEXT_PUBLIC_SUBMIT_DISCOUNT_ENDPOINT) as string,
        {
          params: data,
        }
      )
      .then((response) => {
        // Handle successful response here
        console.log("response", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        // Handle error here
        console.log("error", error);
        reject(error);
      });
  });
};
export const unSubmitDiscountCode = async (data: any) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        ((process.env.NEXT_PUBLIC_BASE_URL_2 as string) +
          process.env.NEXT_PUBLIC_UNSUBMIT_DISCOUNT_ENDPOINT) as string,
        {
          params: data,
        }
      )
      .then((response) => {
        // Handle successful response here
        console.log("response", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        // Handle error here
        console.log("error", error);
        reject(error);
      });
  });
};

export const getOrderList = async () => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");
  // axios.defaults.headers.common["Authorization"] =
  //   "Bearer " +
  //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYjJjIiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMS4xMDAiLCJhdWQiOiJodHRwOi8vMTkyLjE2OC4xLjEwMCIsImlhdCI6MTcyODExMjM2NiwibmJmIjoxNzI4MTEyMzY2LCJleHAiOjE3Mjg3MTcxNjYsInV1aWQiOjkzLCJ1aXAiOiIxOTIuMTY4LjEuMTgiLCJicnciOnsidHlwZSI6ImxpYnJhcnkiLCJuYW1lIjoiUG9zdG1hbiBEZXNrdG9wIiwidmVyc2lvbiI6IjcuMzkuMSJ9fQ.5QKkhRTG2PvNCAuZf_eGzF6a5cm973aII51N4aITHjg";
  return new Promise((resolve, reject) => {
    axios
      .get(
        ((process.env.NEXT_PUBLIC_BASE_URL_2 as string) +
          process.env.NEXT_PUBLIC_SHOPPING_LIST_ENDPOINT) as string
      )
      .then((response) => {
        // Handle successful response here
        console.log("response", response);
        resolve(response.data);
      })
      .catch((error) => {
        // Handle error here
        console.log("error", error);
        reject(error);
      });
  });
};

// for Financial List request
export const getFinancialList = async () => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");
  // axios.defaults.headers.common["Authorization"] =
  //   "Bearer " +
  //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYjJjIiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMS4xMDAiLCJhdWQiOiJodHRwOi8vMTkyLjE2OC4xLjEwMCIsImlhdCI6MTcyODExMjM2NiwibmJmIjoxNzI4MTEyMzY2LCJleHAiOjE3Mjg3MTcxNjYsInV1aWQiOjkzLCJ1aXAiOiIxOTIuMTY4LjEuMTgiLCJicnciOnsidHlwZSI6ImxpYnJhcnkiLCJuYW1lIjoiUG9zdG1hbiBEZXNrdG9wIiwidmVyc2lvbiI6IjcuMzkuMSJ9fQ.5QKkhRTG2PvNCAuZf_eGzF6a5cm973aII51N4aITHjg";
  return new Promise((resolve, reject) => {
    axios
      .get(
        ((process.env.NEXT_PUBLIC_BASE_URL_2 as string) +
          process.env.NEXT_PUBLIC_FINANCIAL_LIST_ENDPOINT) as string
      )
      .then((response) => {
        // Handle successful response here
        console.log("response", response);
        resolve(response.data);
      })
      .catch((error) => {
        // Handle error here
        console.log("error", error);
        reject(error);
      });
  });
};

// flight list
export const getOnlineFlightSearch = (props: onlineFlightSearchInputType) => {
  console.log("props", props);
  axios.defaults.headers.common["Domain"] = window.location.hostname;

  return new Promise((resolve, reject) => {
    axios
      .post(process.env.NEXT_PUBLIC_BASE_URL_2 + "/online/flight/search", props)
      .then((response) => {
        // Handle successful response here
        console.log("response", response);
        resolve(response.data);
      })
      .catch((error) => {
        // Handle error here
        console.log("error", error);
        reject(error);
      });
  });
};

// get airports list with axios without cache
export const getAirports = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.NEXT_PUBLIC_BASE_URL_2 + "/base/data", {
        params: {
          action: "airports",
          route: 1,
        },
      })
      .then((response) => {
        // Handle successful response here
        console.log("response", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        // Handle error here
        console.log("error", error);
        reject(error);
      });
  });
};

// handle lock flight request
export const lockFlight = (props: any) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");
  return new Promise((resolve, reject) => {
    axios
      .post(
        (process.env.NEXT_PUBLIC_BASE_URL_2 as string) +
          process.env.NEXT_PUBLIC_LOCK_FLIGHT_ENDPOINT,
        props
      )
      .then((response) => {
        // Handle successful response here
        console.log("lock response : ", response);
        resolve(response.data);
      })
      .catch((error) => {
        // Handle error here
        console.log("lock error: ", error);
        reject(error);
      });
  });
};

export const handleStoreFlightJson = (data: any) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");
  return new Promise((resolve, reject) => {
    axios
      .post(process.env.NEXT_PUBLIC_BASE_URL_2 + "/trade/store", data)
      .then((response) => {
        // Handle successful response here
        console.log("response", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        // Handle error here
        console.log("error", error);
        reject(error);
      });
  });
};

// handle accommodation requests

export const recommendedAccommodations = (data: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        (process.env.NEXT_PUBLIC_BASE_URL_2 as string) +
          process.env.NEXT_PUBLIC_ACCOMMODATIONS_ENDPOINT,
        {
          params: {
            search: data,
          },
        }
      )
      .then((response) => {
        // Handle successful response here
        console.log("response", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        // Handle error here
        console.log("error", error);
        reject(error);
      });
  });
};

export const getAccommodationsList = (
  value: number | string,
  checkin_date: string,
  checkout_date: string,
  type: string,
  adult_capacity: number,
  child_capacity: number,
  page: number
) => {
  axios.defaults.headers.common["Domain"] = window.location.hostname;

  return new Promise((resolve, reject) => {
    axios
      .get(
        ((process.env.NEXT_PUBLIC_BASE_URL_2 as string) +
          process.env.NEXT_PUBLIC_ACCOMMODATIONS_LIST_ENDPOINT) as string,
        {
          params: {
            value: value,
            checkin_date: convertToGregorian(checkin_date),
            checkout_date: convertToGregorian(checkout_date),
            type: type,
            adult_capacity: adult_capacity,
            child_capacity: child_capacity,
            page: page,
          },
        }
      )
      .then((response) => {
        // Handle successful response here
        console.log("accommodation_list response: ", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        // Handle error here
        console.log("error catch: ", error);
        reject(error);
      });
  });
};

export const getMinPrice = (
  checkin_date: string,
  checkout_date: string,
  accommodationId: number[]
) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        ((process.env.NEXT_PUBLIC_BASE_URL_2 as string) +
          process.env
            .NEXT_PUBLIC_GET_MIN_PRICE_ACCOMMODATION_ENDPOINT) as string,
        {
          params: {
            checkin_date: convertToGregorian(checkin_date),
            checkout_date: convertToGregorian(checkout_date),
            accommodations: accommodationId,
          },
        }
      )
      .then((response) => {
        // Handle successful response here
        console.log("get_min_price response: ", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        // Handle error here
        console.log("error catch: ", error);
        reject(error);
      });
  });
};

export const getRoomTypesAccommodation = (
  accommodationId: number,
  checkin_date: string,
  checkout_date: string
) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        ((process.env.NEXT_PUBLIC_BASE_URL_2 as string) +
          process.env
            .NEXT_PUBLIC_GET_ROOM_TYPES_ACCOMMODATION_ENDPOINT) as string,
        {
          params: {
            accommodation_id: accommodationId,
            checkin_date: convertToGregorian(checkin_date),
            checkout_date: convertToGregorian(checkout_date),
          },
        }
      )
      .then((response) => {
        // Handle successful response here
        console.log("get_room_types response: ", response);
        resolve(response.data);
      })
      .catch((error) => {
        // Handle error here
        console.log("error catch: ", error);
        reject(error);
      });
  });
};

export const getAccommodationDetails = (
  accommodationId: number,
  checkin_date: string,
  checkout_date: string
) => {
  axios.defaults.headers.common["Domain"] = window.location.hostname;

  return new Promise((resolve, reject) => {
    axios
      .get(
        ((process.env.NEXT_PUBLIC_BASE_URL_2 as string) +
          process.env.NEXT_PUBLIC_GET_ACCOMMODATION_DETAILS) as string,
        {
          params: {
            accommodation_id: accommodationId,
            checkin_date: convertToGregorian(checkin_date),
            checkout_date: convertToGregorian(checkout_date),
          },
        }
      )
      .then((response) => {
        // Handle successful response here
        console.log("get_residence_details response: ", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        // Handle error here
        console.log("error catch: ", error);
        reject(error);
      });
  });
};

// handle lock residence
export const lockResidence = (props: any) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");

  return new Promise((resolve, reject) => {
    axios
      .post(
        (process.env.NEXT_PUBLIC_BASE_URL_2 as string) +
          process.env.NEXT_PUBLIC_LOCK_RESIDENCE_ENDPOINT,
        props
      )
      .then((response) => {
        // Handle successful response here
        console.log("lock response : ", response);
        resolve(response.data);
      })
      .catch((error) => {
        // Handle error here
        console.log("lock error: ", error);
        reject(error);
      });
  });
};

// handle mag axios
export const getCategoryList = (categoryId?: number) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        (process.env.NEXT_PUBLIC_BASE_URL_2 as string) +
          process.env.NEXT_PUBLIC_CATEGORY_LIST
      )
      .then((response) => {
        // Handle successful response here
        console.log("getCategoryList response: ", response);
        resolve(response.data);
      })
      .catch((error) => {
        // Handle error here
        console.log("getCategoryList error: ", error);
        reject(error);
      });
  });
};

export const getArticleList = (
  sortByScore: boolean = false,
  sortByViews: boolean = false,
  categoryId?: number
) => {
  return new Promise((resolve, reject) => {
    const params: Record<string, any> = {
      sortByScore,
      sortByViews,
    };

    if (categoryId !== undefined) {
      params.categoryId = categoryId;
    }

    axios
      .get(
        (process.env.NEXT_PUBLIC_BASE_URL_2 as string) +
          process.env.NEXT_PUBLIC_ARTICLE_LIST,
        { params }
      )
      .then((response) => {
        // Handle successful response here
        console.log("getArticleList response: ", response);
        resolve(response.data);
      })
      .catch((error) => {
        // Handle error here
        console.log("getArticleList error: ", error);
        reject(error);
      });
  });
};

export const getArticle = (articleId: number) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        (process.env.NEXT_PUBLIC_BASE_URL_2 as string) +
          process.env.NEXT_PUBLIC_ARTICLE +
          "/" +
          articleId
      )
      .then((response) => {
        // Handle successful response here
        console.log("getArticle response: ", response);
        resolve(response.data);
      })
      .catch((error) => {
        // Handle error here
        console.log("getArticle error: ", error);
        reject(error);
      });
  });
};

// handle get config
export const getConfig = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.NEXT_PUBLIC_BASE_URL_2 + "/config")
      .then((response) => {
        // Handle successful response here
        console.log("response then: ", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        // Handle error here
        console.log("error catch: ", error);
        reject(error);
      });
  });
};
