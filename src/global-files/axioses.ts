import {
  authInputType,
  authSubmitInputType,
  baseDataDataType,
} from "@/DataTypes/globalTypes";
import axios from "axios";
import {
  AirportDataType,
  FlightTicketDataType,
  onlineFlightSearchInputType,
} from "@/DataTypes/flightTicket";
import { convertJalaliToMiladiDate, convertToGregorian } from "./function";

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

export const getShoppingList = async () => {
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

// handle residences requests

export const recommendedResidences = (data: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        (process.env.NEXT_PUBLIC_BASE_URL_2 as string) +
          process.env.NEXT_PUBLIC_RESIDENCES_ENDPOINT,
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

export const getResidencesList = (
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
          process.env.NEXT_PUBLIC_RESIDENCES_LIST_ENDPOINT) as string,
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
        console.log("residence_list response: ", response.data);
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
  residencesId: number[]
) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        ((process.env.NEXT_PUBLIC_BASE_URL_2 as string) +
          process.env.NEXT_PUBLIC_GET_MIN_PRICE_RESIDENCE_ENDPOINT) as string,
        {
          params: {
            checkin_date: convertToGregorian(checkin_date),
            checkout_date: convertToGregorian(checkout_date),
            residences: residencesId,
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

export const getRoomTypesResidence = (
  hotelId: number,
  checkin_date: string,
  checkout_date: string
) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        ((process.env.NEXT_PUBLIC_BASE_URL_2 as string) +
          process.env.NEXT_PUBLIC_GET_ROOM_TYPES_RESIDENCE_ENDPOINT) as string,
        {
          params: {
            hotel_id: hotelId,
            checkin_date: convertToGregorian(checkin_date),
            checkout_date: convertToGregorian(checkout_date),
          },
        }
      )
      .then((response) => {
        // Handle successful response here
        console.log("get_room_types response: ", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        // Handle error here
        console.log("error catch: ", error);
        reject(error);
      });
  });
};

export const getResidenceDetails = (
  hotelId: number,
  checkin_date: string,
  checkout_date: string
) => {
  axios.defaults.headers.common["Domain"] = window.location.hostname;

  return new Promise((resolve, reject) => {
    axios
      .get(
        ((process.env.NEXT_PUBLIC_BASE_URL_2 as string) +
          process.env.NEXT_PUBLIC_GET_RESIDENCE_DETAILS) as string,
        {
          params: {
            hotel_id: hotelId,
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