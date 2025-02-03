export interface AccommodationDataType {
  id: number;
  title: Title;
  country: Country;
  state: State;
  category: Category;
  type?: string;
  rate?: number;
  city?: City;
  phone?: string;
  address?: string;
  location?: string;
  logo?: string;
  priority?: number;
  status?: number;
  order?: number;
  mobile?: string;
  email?: string;
  site?: string;
  media?: string[];
  details?: Details;
  board?: any;
  possibilities?: string[][];
  leader_name?: string;
  leader_mobile?: string;
  description?: string;
  confirm_status?: number;
}
interface Details {
  rooms?: number | string;
  floors?: number | string;
  login: string;
  logout: string;
}
interface City {
  id: number;
  title: Title;
}
interface Category {
  title: string;
  subtitle: boolean;
}
interface State {
  fa?: string;
  en?: string;
  id?: number;
  title?: Title;
}
interface Country {
  fa?: string;
  en?: string;
  id?: number;
  icon?: string;
  title?: Title;
  nationality?: Title;
}
interface Title {
  fa: string;
  en: string;
}

//
