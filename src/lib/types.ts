export interface Store {
  id: string;
  name: string;
  address: string;
  contact: string;
  invoiceCode: string; // e.g., "LFREA" -> invoices will be #LFREA001, #LFREA002, etc.
}

export interface InvoiceData {
  store: Store;
  invoiceNumber: number;
  date: Date;
  terms: number; // always 60 days
}
