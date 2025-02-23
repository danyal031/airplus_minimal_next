// accommodationsIds list data type
export interface AccommodationsListDataType {
  id: number;
  type: string;
  title: Title;
  communicational: Communicational;
  logo: string;
  media: Media;
  rules: Rules;
  facility_categories: FacilityCategory[];
  rate: number;
  details: Details;
  board: any;
  description: any;
  priority: number;
  status: number;
}

interface Title {
  en: string;
  fa: string;
}

interface Communicational {
  country: Country;
  state: State;
  city: City;
  phone: string;
  address: string;
  location: string;
  nearby_places: any;
}

interface Country {
  id: number;
  fips: string;
  iso: string;
  alpha3: string;
  numeric_code: string;
  domain: string;
  en_nationality: string;
  fa_nationality: string;
  en_name: string;
  fa_name: string;
  status: number;
}

interface State {
  id: number;
  en_name: string;
  fa_name: string;
  country: number;
  status: number;
}

interface City {
  id: number;
  en_name: string;
  fa_name: string;
  national_prefix: string;
  state: number;
  status: number;
}

interface Media {
  images: Image[];
  videos: any;
}

interface Image {
  type: string;
  name: string;
  path: string;
  size: number;
  extension: string;
}

interface Rules {
  cancellation: any;
  public: any;
  policies: Policies;
}

interface Policies {
  id: number;
  accommodation: number;
  half_charge_from: any;
  half_charge_to: any;
  concubine: number;
  single_woman: number;
  welcome_transfer: number;
  return_transfer: number;
  status: number;
}

interface FacilityCategory {
  id: number;
  title_en: any;
  title_fa: string;
  icon: any;
  description: any;
  status: number;
  branch: number;
  facilities: Facility[];
}

interface Facility {
  id: number;
  category_id: number;
  title_en: any;
  title_fa: string;
  icon: any;
  description: any;
  branch: number;
  status: number;
}

interface Details {
  rooms: any;
  floors: any;
  login: string;
  logout: string;
}

// start handle rooms data type

export interface RoomsDetailsDataType {
  id: string;
  title: Title;
  beds: number;
  capacity: Capacity;
  image: RoomImage[];
  status: number;
  board_type: BoardType;
  room_type_id: number;
}

interface Capacity {
  adult: number;
  child: number;
  room: number;
}

interface RoomImage {
  name: string;
  path: string;
  size: number;
  extension: string;
}

interface BoardType {
  id: number;
  description: string;
  code: string;
  status: number;
  service: string;
  title: Title;
  financial: Financial[];
}

interface Financial {
  board_type_id: number;
  rate_date: string;
  board_price: number;
  net_price: number;
  final_price: number;
}

// end rooms data type

// handle selected rooms data type
export interface SelectedRoomsDataType {
  id: number;
  name: string;
  beds: number;
  adult_capacity: number;
  child_capacity: number;
  status: number;
  financial: SelectedRoomsFinancial;
  numberOfRoom: number;
}

export interface SelectedRoomsFinancial {
  id: number;
  food_service_type_id: any;
  rate_date: string;
  board_price: number;
  net_price: number;
  final_price: number;
}
// end selected rooms data type

// start handle shopping card data type

interface ShoppingCardDetail {
  rooms: number;
  floors: number;
  login: string;
  logout: string;
  fromDate: string;
  toDate: string;
}

export interface AccommodationShoppingCartDataType {
  id: number;
  type: string;
  title: Title;
  communicational: Communicational;
  logo: string;
  media: any;
  rules: any;
  facility_categories: any[];
  rate: number;
  details: ShoppingCardDetail;
  board?: any;
  description?: any;
  priority: number;
  status: number;
  room_types: SelectedRoomsDataType[];
}
// end handle shopping card data type

export const additionalInformationAccommodationsDefaultValue: AccommodationsListDataType =
  {
    id: 1431,
    type: "apartment",
    title: { en: "Arash", fa: "آرش" },
    communicational: {
      country: {
        id: 118,
        fips: "IR",
        iso: "IR",
        domain: ".ir",
        en_nationality: "Iranian",
        fa_nationality: "ایرانی",
        en_name: "Iran",
        fa_name: "ایران",
        status: 1,
      },
      state: {
        id: 4,
        en_name: "Isfahan",
        fa_name: "اصفهان",
        country: 118,
        status: 1,
      },
      city: {
        id: 37,
        en_name: "Esfahan",
        fa_name: "اصفهان",
        national_prefix: "127,128,129",
        state: 4,
        status: 1,
      },
      phone: false,
      address: "خیابان جی غربی کوچه 82/1 مجتمع پردیس پلاک هشت واحد4",
      location: "32.65621370651701,51.72659397125244",
      nearby_places: [
        {
          title: { fa: "عمارت چهلستون", en: "Chehel Soton" },
          distance: 2.5,
          duration: { car: 5, walk: 15, public: 12 },
          location: "32.65621370651701,51.72659397125244",
        },
      ],
    },
    logo: "media/branches/mehromah.png",
    media: {
      images: [
        // {
        //   id: 1002,
        //   type: "png",
        //   size: 1036,
        //   name: "image.png",
        //   path: hotel1.src,
        //   status: 1,
        // },
        // {
        //   id: 1003,
        //   type: "png",
        //   size: 1036,
        //   name: "image.png",
        //   path: hotel2.src,
        //   status: 1,
        // },
      ],
      videos: [
        {
          id: 1003,
          type: "mp4",
          size: 1036,
          name: "details",
          path: "media/branches/mehromah.png",
          status: 1,
        },
      ],
    },
    rules: {
      cancellation: [
        {
          id: 156,
          title: "کنسلی 3 روز زودتر از موعد",
          remaining: 72,
          type_fine: "percentage",
          value: 30,
        },
      ],
      public: [{ id: 326, title: "همراه داشتن حیوان خانگی بلامانع است" }],
    },
    facility_categories: [
      {
        id: 1,
        title_en: "public",
        title_fa: "عمومی",
        description: false,
        icon: false,
        facilities: [
          {
            id: 556,
            category_id: 1,
            title_en: "telephone",
            title_fa: "تلفن جهت تماس",
            description: "با هزینه",
            icon: false,
          },
        ],
      },
      {
        id: 2,
        title_en: "room",
        title_fa: "اتاق",
        description: false,
        icon: false,
        facilities: [
          {
            id: 456,
            category_id: 2,
            title_en: "refrigerator",
            title_fa: "یخچال",
            description: false,
            icon: false,
          },
          {
            id: 457,
            category_id: 2,
            title_en: "TV",
            title_fa: "تلویزیون",
            description: false,
            icon: false,
          },
          {
            id: 458,
            category_id: 2,
            title_en: "TV",
            title_fa: "تلویزیون",
            description: false,
            icon: false,
          },
          {
            id: 459,
            category_id: 2,
            title_en: "TV",
            title_fa: "تلویزیون",
            description: false,
            icon: false,
          },
          {
            id: 466,
            category_id: 2,
            title_en: "TV",
            title_fa: "تلویزیون",
            description: false,
            icon: false,
          },
          {
            id: 466,
            category_id: 2,
            title_en: "TV",
            title_fa: "تلویزیون",
            description: false,
            icon: false,
          },
          {
            id: 466,
            category_id: 2,
            title_en: "TV",
            title_fa: "تلویزیون",
            description: false,
            icon: false,
          },
        ],
      },
    ],
    rate: 5,
    details: { rooms: 0, floors: 0, login: "14:00", logout: "12:00" },
    board: 123003,
    description: null,
    priority: 0,
    status: 1,
    room_types: [
      {
        id: 28,
        name: "یک تخت",
        beds: 1,
        adult_capacity: 10,
        child_capacity: 1,
        status: 1,
        financial: [
          {
            food_service_type_id: 2,
            rate_date: "2024-12-04T00:00:00",
            board_price: 11000000,
            net_price: 9785000,
            final_price: 12875,
          },
        ],
      },
      {
        id: 29,
        name: "سه تخت",
        beds: 3,
        adult_capacity: 3,
        child_capacity: 1,
        status: 1,
        financial: [
          {
            food_service_type_id: 2,
            rate_date: "2024-12-04T00:00:00",
            board_price: 19000000,
            net_price: 17510000,
            final_price: 12875,
          },
        ],
      },
      {
        id: 30,
        name: "دو  تخت دبل",
        beds: 2,
        adult_capacity: 4,
        child_capacity: 1,
        status: 1,
        financial: [
          {
            food_service_type_id: 2,
            rate_date: "2024-12-04T00:00:00",
            board_price: 14000000,
            net_price: 12875000,
            final_price: 12875,
          },
        ],
      },
      {
        id: 31,
        name: "دو تخت",
        beds: 2,
        adult_capacity: 2,
        child_capacity: 0,
        status: 1,
        financial: [],
      },
    ],
  };

export const roomsDetailsDefaultValue: RoomsDetailsDataType[] = [
  {
    id: 29,
    name: "سه تخت",
    beds: 3,
    adult_capacity: 3,
    child_capacity: 1,
    image: false,
    status: 1,
    financial: [
      {
        board_type: {
          id: 3,
          title_en: "Bed And Breakfast",
          title_fa: "با صبحانه",
          description: " اقامت با صبحانه",
          code: "BB",
          status: 1,
        },
        rate_date: "2024-12-16T00:00:00",
        board_price: 19000000,
        net_price: 17510000,
        final_price: 11410,
      },
    ],
  },
  {
    id: 30,
    name: "دو  تخت دبل",
    beds: 2,
    adult_capacity: 4,
    child_capacity: 1,
    image: false,
    status: 1,
    financial: [
      {
        board_type: {
          id: 3,
          title_en: "Bed And Breakfast",
          title_fa: "با صبحانه",
          description: " اقامت با صبحانه",
          code: "BB",
          status: 1,
        },
        rate_date: "2024-12-16T00:00:00",
        board_price: 14000000,
        net_price: 12875000,
        final_price: 5620,
      },
    ],
  },
  {
    id: 28,
    name: "یک تخت",
    beds: 1,
    adult_capacity: 10,
    child_capacity: 1,
    image: false,
    status: 1,
    financial: [
      {
        board_type: {
          id: 3,
          title_en: "Bed And Breakfast",
          title_fa: "با صبحانه",
          description: " اقامت با صبحانه",
          code: "BB",
          status: 1,
        },
        rate_date: "2024-12-16T00:00:00",
        board_price: 11000000,
        net_price: 9785000,
        final_price: 120,
      },
    ],
  },
  {
    id: 31,
    name: "دو تخت",
    beds: 2,
    adult_capacity: 2,
    child_capacity: 0,
    image: false,
    status: 1,
    financial: false,
  },
];
