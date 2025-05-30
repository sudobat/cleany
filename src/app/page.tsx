"use client";

import { OrderCards } from "@/components/order-cards";
import { StateVisualizer } from "@/components/state-visualizer";
import { Tabs } from "@/components/tabs";
import { useGlobalState } from "@/lib/stages";
import { useState } from "react";

export default function Home() {
  const { orders } = useGlobalState();
  const [activeTab, setActiveTab] = useState<string>("orders");

  const tabs = [
    {
      id: "orders",
      label: "Pedidos",
      content: <OrderCards orders={orders} />,
    },
    {
      id: "visualizer",
      label: "Ver Estado",
      content: <StateVisualizer />,
    },
  ];

  return <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />;
}
