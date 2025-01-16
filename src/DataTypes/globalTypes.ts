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
