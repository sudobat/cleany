import { createContext, useContext, ReactNode, useState } from "react";
import { Housekeeper, ContactInfo, CardInfo, Order, defaultOrders } from "@/lib/types";

import { useCopilotReadable } from "@copilotkit/react-core";

export type Stage =
  | "chooseHousekeeper"
  | "getContactInfo"
  | "getPaymentInfo"
  | "confirmOrder";

interface GlobalState {
  stage: Stage;
  setStage: React.Dispatch<React.SetStateAction<Stage>>;
  selectedHousekeeper: Housekeeper | null;
  setSelectedHousekeeper: React.Dispatch<React.SetStateAction<Housekeeper | null>>;
  contactInfo: ContactInfo | null;
  setContactInfo: React.Dispatch<React.SetStateAction<ContactInfo | null>>;
  cardInfo: CardInfo | null;
  setCardInfo: React.Dispatch<React.SetStateAction<CardInfo | null>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export const GlobalStateContext = createContext<GlobalState | null>(null);

/**
  useGlobalState is a hook that will return the global state of the application. It must
  be used within a GlobalStateProvider. It keeps track of the:
  - Current stage of the application.
  - Selected housekeeper.
  - Contact information of the user.
  - Card information of the user.
  - Orders of the user.
*/
export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
}

export function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<Stage>("getContactInfo");
  const [selectedHousekeeper, setSelectedHousekeeper] = useState<Housekeeper | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [cardInfo, setCardInfo] = useState<CardInfo | null>(null);
  const [orders, setOrders] = useState<Order[]>(defaultOrders);

  useCopilotReadable({
    description: "Currently Specified Information",
    value: {
      contactInfo,
      selectedHousekeeper,
      cardInfo,
      orders,
      currentStage: stage,
    },
  });

  return (
    <GlobalStateContext.Provider
      value={{
        stage,
        setStage,
        selectedHousekeeper,
        setSelectedHousekeeper,
        contactInfo,
        setContactInfo,
        cardInfo,
        setCardInfo,
        orders,
        setOrders,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}
