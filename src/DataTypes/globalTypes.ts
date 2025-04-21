import { v4 as uuidv4 } from "uuid";
export const vReg: any = {
  date_yyyy_mm_dd: /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/,
  mobile: /^(\+98|0)?9\d{9}$/,
  phone: /^0\d{2}-\d{8}$/,
  postal_code: /^\d{10}$/,
};

export const vMask = {
  date_yyyy_mm_dd: {
    mask: "yyyy-mm-dd",
    replacement: { y: /\d/, m: /\d/, d: /\d/ },
  },
  phone: {
    mask: "znn-nnnnnnnn",
    replacement: { z: /0/, n: /\d/ },
  },
};
// defaultCitizenship data type
export const defaultCitizenship: any = {
  id: 118,
  iso: "IR",
  title: {
    fa: "ایرانی",
    en: "Iranian",
  },
};
export interface AlertDetailsDataType {
  alertMessage: string;
  alertType?: "success" | "info" | "error" | "warning";
  alertDuration?: number;
  showAlert: boolean;
}
export const defaultAlertDetails: AlertDetailsDataType = {
  alertMessage: "",
  alertType: "info",
  alertDuration: 6000,
  showAlert: false,
};

export type baseDataDataType = {
  action: string; // citizenship, countries, states, cities
  route?: string; // country, state
  country?: string;
  state?: string;
};

//? api inputs types
export type authInputType = {
  mobile: string | null;
};
export type authSubmitInputType = {
  passenger_id: string | null;
  otp: string | null;
};

// ? handle start config data types
interface Title {
  fa: string;
  en: string;
}

interface Brand {
  fa: string;
  en: string;
}

interface Address {
  fa: string;
  en: string;
  ar: string;
}

interface Social_media {
  instagram: string;
  telegram: string;
}

interface Certificate {
  id: number;
  title: string;
  content: string;
  status: number;
}

interface Communicational {
  phone: string;
  mobile?: any;
  support?: any;
  email: string;
  site: string;
  location: string;
  address: Address;
  postal_code: string;
  social_media: Social_media;
  certificates: Certificate[];
}

interface Advertisement {
  id: number;
  location: string;
  link: string;
  src: string;
  title: string;
  status: number;
}

interface Design {
  footer_text: string;
  logo: string;
  paper_logo: string;
  favicon: string;
  base_color: string;
  theme: string;
  style: string;
  advertisement: Advertisement[];
}

interface Support_online {
  service: string;
  code: string;
}

interface Cache {
  update: string;
}

interface Service {
  all: boolean;
}

export interface ConfigDataType {
  office_id: number;
  title: Title;
  brand: Brand;
  short_domain: string;
  erp_domain: string;
  communicational: Communicational;
  design: Design;
  support_online: Support_online;
  cache: Cache;
  services: Service;
}

// ? end config data types

// start user information data type
export type UserInformationDataType = {
  id: string | number | null;
  passenger_id?: string | number;
  image: string | null;
  sex: "male" | "female" | "not-chosen";
  citizenship: any;
  name_fa?: string;
  lastname_fa?: string;
  name_en?: string;
  lastname_en?: string;
  national_code?: string;
  pass_code?: string;
  pass_ex?: string;
  passport_image?: string | null;
  birthday?: string;
  email?: string;
  education?: string;
  marital_status?: string;
  mobile?: string;
  phone?: string;
  country?: any;
  province?: any;
  city?: any;
  postal_code?: string;
  address?: string;
  birthCity?: string;
};
// end user information data type

export const defaultPassengerInformation: UserInformationDataType = {
  id: uuidv4(),
  image: null,
  sex: "not-chosen",
  citizenship: defaultCitizenship,
  name_fa: "",
  lastname_fa: "",
  name_en: "",
  lastname_en: "",
  national_code: "",
  pass_code: "",
  pass_ex: "",
  passport_image: null,
  birthday: "",
  email: "",
  education: "0",
  marital_status: "0",
  mobile: "",
  phone: "",
  // country: {
  //   id: 118,
  //   title: {
  //     fa: "ایران",
  //     en: "Iran",
  //   },
  //   details: {
  //     iso: "IR",
  //   },
  // },
  province: null,
  city: null,
  postal_code: "",
  address: "",
  birthCity: "",
};

export const defaultChildrenInformation: UserInformationDataType = {
  id: "",
  image: null,
  sex: "not-chosen",
  citizenship: defaultCitizenship,
  name_fa: "",
  lastname_fa: "",
  name_en: "",
  lastname_en: "",
  national_code: "",
  birthday: "",
  birthCity: "",
};
