import { cn } from "@/lib/utils/cn";
import { Housekeeper } from "@/lib/types";
import { AnimatedCard } from "@/components/animated-card";
import { motion } from "motion/react";
import { useState } from "react";
import Image from "next/image";

import { RenderFunctionStatus } from "@copilotkit/react-core";

interface ShowHousekeeperProps {
  housekeeper: Housekeeper;
  onSelect: () => void;
  onReject?: () => void;
  status: RenderFunctionStatus;
  className?: string;
}

const HousekeeperImage = ({ housekeeper }: { housekeeper: Housekeeper }) => {
  return (
    <div className="relative aspect-[3/3] w-full overflow-hidden h-[250px]">
      <Image
        width={300}
        height={250}
        src={housekeeper?.image?.src || ""}
        alt={housekeeper?.image?.alt || ""}
        className="object-cover w-full h-full hover:scale-105 transition-transform duration-300 transform-gpu"
        style={{
          imageRendering: "auto",
          WebkitFontSmoothing: "antialiased",
        }}
      />
    </div>
  );
};

export function ShowHousekeeper({ housekeeper, onSelect, onReject, status, className }: ShowHousekeeperProps) {
  const housekeeperDetails = [
    { label: "Name", value: housekeeper.name },
    { label: "Age", value: housekeeper.age },
    { label: "Gender", value: housekeeper.gender },
    { label: "Review", value: housekeeper.stars_over_five },
    { label: "Hourly price", value: `$${housekeeper.hourly_price?.toLocaleString()}`, bold: true },
  ];

  const cardStyles = cn(
    "min-w-[300px] max-w-sm bg-white rounded-xl overflow-hidden p-0 gap-0",
    className,
  );
  const informationWrapperStyles = cn("space-y-6 pt-4 pb-4");
  const acceptButtonStyles = cn(
    "flex-1 bg-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-700 transition-all duration-200 shadow-sm hover:shadow-md",
  );
  const rejectButtonStyles = cn(
    "flex-1 bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200",
  );

  return (
    <AnimatedCard status={status} className={cardStyles}>
      <HousekeeperImage housekeeper={housekeeper} />

      <div className={informationWrapperStyles}>
        <div className="space-y-2 px-6">
          <div className="text-2xl font-semibold text-gray-900">
            {housekeeper.name} ({housekeeper.gender}) {housekeeper.stars_over_five}/5
          </div>
          {housekeeperDetails.map(({ label, value, bold }) => (
            <div key={label} className="flex justify-between items-center py-1">
              <span className="text-gray-500 text-sm">{label}</span>
              <span className={cn("text-gray-900", bold ? "font-semibold text-lg" : "text-sm")}>
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className={cn("px-6 pt-2", status === "complete" ? "hidden" : "animate-fade-in")}>
          <hr className="mb-4 border-gray-100" />
          <div className="flex gap-3">
            {onReject && (
              <button className={rejectButtonStyles} onClick={onReject}>
                Otras opciones
              </button>
            )}
            <button className={acceptButtonStyles} onClick={onSelect}>
              Seleccionar
            </button>
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
}

interface ShowHousekeepersProps {
  housekeepers: Housekeeper[];
  onSelect: (housekeeper: Housekeeper) => void;
  status: RenderFunctionStatus;
}

export function ShowHousekeepers({ housekeepers, onSelect, status }: ShowHousekeepersProps) {
  const [selectedHousekeeper, setSelectedHousekeeper] = useState<Housekeeper | null>(null);

  const handleSelect = (housekeeper: Housekeeper) => {
    setSelectedHousekeeper(housekeeper);
    onSelect(housekeeper);
  };

  return (
    <div className="flex flex-row overflow-x-auto gap-4 py-4 space-x-6">
      {housekeepers.map((housekeeper: Housekeeper, index: number) => {
        // Don't render if there's a selected housekeeper and this isn't it
        if (selectedHousekeeper && housekeeper !== selectedHousekeeper) return null;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <ShowHousekeeper housekeeper={housekeeper} onSelect={() => handleSelect(housekeeper)} status={status} />
          </motion.div>
        );
      })}
    </div>
  );
}
