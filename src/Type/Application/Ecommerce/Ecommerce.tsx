export interface InvoicePrintType {
  handlePrint?: () => void;
}
export interface CheckoutFormType {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  chech: boolean;
}
export interface ServiceType {
  icon: string;
  title: string;
  subtitle: string;
}

export interface ProductPropsType {
  activeTab: number;
}

export interface ProductListTableDataColumnType {
  image: string;
  name: string;
  date: string;
  price: string;
  status: string;
  detail:string
}

export interface ProductListTableProduct {
  images?: string;
  productName?:string
  productDetail ?:string
  status?:string
}
