export interface CashDataResponse {
  status: string;
  data: CashData;
}

export interface CashData {
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: string;
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export interface CartItem {
  count: number;
  _id: string;
  product: string;
  price: number;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}
