// shopping list data type
interface ShoppingListOperator {
  sex: any;
  title: any;
  id: any;
}

interface ShoppingListLeader {
  id: number;
  title_fa: any;
  title_en: any;
  mobile: any;
}

interface ShoppingListFinancial {
  sum_sale: number;
  sum_return_sale: number;
  sum_penalty_sale: number;
  sum_receive: number;
  balance_received: number;
}

interface ShoppingListDetails {
  operator: ShoppingListOperator;
  leader: ShoppingListLeader;
  status: number;
  route: string;
  serial_id: number;
  created_at: string;
  slug: string;
  financial?: ShoppingListFinancial;
}

export interface OrderDataType {
  title: any;
  details?: ShoppingListDetails;
}
