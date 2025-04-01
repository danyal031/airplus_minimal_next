//? user data type

interface Data {
  sex?: string;
  first_name?: string;
  last_name?: string;
  first_name_fa?: string;
  last_name_fa?: string;
  mobile: string;
  national_code: string;
}

export interface UserDataType {
  uuid: number;
  from: string;
  role: string;
  data: Data;
}
