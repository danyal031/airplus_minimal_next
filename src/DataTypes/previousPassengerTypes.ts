interface First_name {
  fa?: string;
  en?: string;
}

interface Last_name {
  fa?: string;
  en?: string;
}

interface Fullname {
  first_name: First_name;
  last_name: Last_name;
}

interface Identity {
  id?: string;
  nationality?: number;
}

interface Passport {
  id?: any;
  expire_at?: string;
}

export interface PreviousPassengerDataType {
  id: number;
  gender: "male" | "female" | "not-chosen";
  fullname: Fullname;
  email?: string;
  mobile?: any;
  birth?: string;
  identity: Identity;
  passport: Passport;
}
