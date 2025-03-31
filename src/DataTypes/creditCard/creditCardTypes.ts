export interface CreditCardDataTypes {
  id: number;
  status: number;
  card: Card;
  passenger: Passenger;
}

interface Card {
  number: string;
  withdrawal_limit: boolean;
  blocked_amount: boolean;
  cvv2: number;
  expire_date: string;
}

interface Passenger {
  id: number;
  first_name: string;
  last_name: string;
}
