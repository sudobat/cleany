import { Housekeeper, ContactInfo, CardInfo, housekeepers, availableCardInfo } from "@/lib/types";

export type Order = {
  housekeeper: Housekeeper;
  contactInfo: ContactInfo;
  cardInfo?: CardInfo;
  paymentType: "tarjeta";
};

export const defaultOrders: Order[] = [
  {
    housekeeper: housekeepers[0],
    contactInfo: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
    },
    cardInfo: availableCardInfo[0],
    paymentType: "tarjeta",
  },
];
