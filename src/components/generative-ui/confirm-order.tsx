import React from "react";
import { AnimatedCard } from "@/components/animated-card";
import { useGlobalState } from "@/lib/stages";
import { Housekeeper, CardInfo, ContactInfo, Order } from "@/lib/types";

import { RenderFunctionStatus } from "@copilotkit/react-core";

interface ConfirmOrderProps {
  onConfirm: (order: Order) => void;
  onCancel: () => void;
  status: RenderFunctionStatus;
}

export const ConfirmOrder = ({ onConfirm, onCancel, status }: ConfirmOrderProps) => {
  const { selectedHousekeeper, contactInfo, cardInfo } = useGlobalState();

  return (
    <AnimatedCard className="w-[500px]" status={status}>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Resumen del Pedido</h2>

      <div className="space-y-3">
        <div className="flex justify-between items-center border-b border-blue-100 pb-2">
          <span className="font-medium">Limpiador/a</span>
          <span className="text-gray-600">
            {selectedHousekeeper?.name} ({selectedHousekeeper?.gender}) {selectedHousekeeper?.stars_over_five}/5
          </span>
        </div>

        <div className="flex justify-between items-center border-b border-blue-100 pb-2">
          <span className="font-medium">Precio</span>
          <span className="text-gray-600">${selectedHousekeeper?.hourly_price?.toLocaleString()}/h</span>
        </div>

        <div className="flex justify-between items-center border-b border-blue-100 pb-2">
          <span className="font-medium">Cliente</span>
          <span className="text-gray-600">{contactInfo?.name}</span>
        </div>

        <div className="flex justify-between items-center border-b border-blue-100 pb-2">
          <span className="font-medium">Tarjeta</span>
          <span className="text-gray-600">
            {cardInfo?.type} ****{cardInfo?.cardNumber?.slice(-4)}
          </span>
        </div>
      </div>

      {status !== "complete" && (
        <ActionButtons
          onConfirm={() =>
            onConfirm({
              housekeeper: selectedHousekeeper || ({} as Housekeeper),
              contactInfo: contactInfo || ({} as ContactInfo),
              cardInfo: cardInfo || ({} as CardInfo),
              paymentType: "tarjeta",
            })
          }
          onCancel={onCancel}
        />
      )}
    </AnimatedCard>
  );
};

const ActionButtons = ({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) => (
  <div className="flex justify-end gap-4 mt-6">
    <button
      onClick={onCancel}
      className="px-6 py-2.5 w-full text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
    >
      Cancelar
    </button>
    <button
      onClick={onConfirm}
      className="px-6 py-2.5 w-full text-white bg-pink-600 rounded-lg hover:bg-pink-800 transition-colors duration-200 font-medium"
    >
      Confirmar Pedido
    </button>
  </div>
);
