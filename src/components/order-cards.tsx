import {motion} from "motion/react";
import {Order} from "@/lib/types";
import Image from "next/image";

interface OrderCardsProps {
  orders: Order[];
}

export function OrderCard({order, index}: { order: Order; index: number }) {
  return (
    <div
      className="group bg-white shadow-sm hover:shadow transition-all duration-200 rounded-lg border border-neutral-200">
      <div className="flex items-start gap-4 p-4">
        {/* Housekeeper Image */}
        <div className="relative w-[140px] shrink-0">
          <div className="aspect-[4/3] rounded-md overflow-hidden bg-neutral-100">
            <Image
              width={280}
              height={210}
              src={order.housekeeper.image?.src || ""}
              alt={order.housekeeper.image?.alt || ""}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="absolute top-2 left-2">
            <div className="text-xs font-medium bg-white shadow-sm text-neutral-900 px-2 py-1 rounded">
              #{String(index + 1).padStart(3, "0")}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-medium text-neutral-900 mb-1">
                {order.housekeeper.name} ({order.housekeeper.gender}) {order.housekeeper.stars_over_five}/5
              </h3>
              <div className="text-sm text-neutral-500 flex items-center">
                <svg
                  className="w-4 h-4 mr-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {order.contactInfo.name}
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-lg font-medium text-neutral-900 mb-1">
                ${order.housekeeper.hourly_price?.toLocaleString()}/h
              </div>

              <div className="text-sm text-neutral-500 flex items-center justify-end">
                <svg
                  className="w-4 h-4 mr-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                •••• {order.cardInfo?.cardNumber?.slice(-4)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function OrderCards({orders}: OrderCardsProps) {
  if (!orders.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <div className="w-16 h-16 mb-4 relative">
          <svg
            className="w-full h-full text-neutral-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
            />
          </svg>
          <div
            className="absolute -bottom-2 -right-2 w-8 h-8 bg-neutral-900 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
            Cleany
          </div>
        </div>
        <h3 className="text-neutral-900 font-medium mb-1">No hay pedidos</h3>
        <p className="text-neutral-500 text-sm text-center max-w-[240px] mb-4">
          ¿Listo para encontrar a la persona ideal para limpiar tu casa?
          Empieza una conversación con Cleany, tu asistente virtual de limpieza del hogar.
        </p>
        <button
          onClick={() => {
            /* This could trigger the chat focus */
          }}
          className="inline-flex items-center px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-md hover:bg-neutral-800 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          Conversar con Cleany
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order, index) => (
        <motion.div
          key={index}
          initial={{opacity: 0, y: 10}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.2, delay: index * 0.05}}
        >
          <OrderCard order={order} index={index}/>
        </motion.div>
      ))}
    </div>
  );
}
