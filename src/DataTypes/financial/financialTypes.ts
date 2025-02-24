export interface FinancialListDataType {
  serial: number;
  type: string;
  type_pay: string;
  deadline?: string;
  currency?: string;
  fee?: number;
  amount: number;
  tracking_code: string;
}
