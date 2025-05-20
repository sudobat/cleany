import ReactFlow, { Node, Edge, Position, MarkerType } from "reactflow";
import "reactflow/dist/style.css";
import { useGlobalState } from "@/lib/stages";
import { useMemo } from "react";

export function StateVisualizer() {
  const { stage } = useGlobalState();

  const activeNodeStyles = "ring-4 ring-pink-400 animate-pulse";
  const inactiveNodeStyles = "border border-gray-200";

  const nodes: Node[] = useMemo(
    () => [
      {
        id: "getContactInfo",
        data: { label: "Información de Contacto" },
        position: { x: 200, y: 50 },
        className: stage === "getContactInfo" ? activeNodeStyles : inactiveNodeStyles,
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      },
      {
        id: "chooseHousekeeper",
        data: { label: "Elegir limpiador" },
        position: { x: 200, y: 150 },
        className: stage === "chooseHousekeeper" ? activeNodeStyles : inactiveNodeStyles,
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      },
      {
        id: "getPaymentInfo",
        data: { label: "Información de Pago" },
        position: { x: 200, y: 250 },
        className: stage === "getPaymentInfo" ? activeNodeStyles : inactiveNodeStyles,
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      },
      {
        id: "confirmOrder",
        data: { label: "Confirmar Pedido" },
        position: { x: 200, y: 350 },
        className: stage === "confirmOrder" ? activeNodeStyles : inactiveNodeStyles,
        targetPosition: Position.Top,
      },
    ],
    [stage],
  );

  const activeEdgeStyles = "stroke-pink-400 stroke-2";
  const inactiveEdgeStyles = "stroke-gray-200 stroke-1";

  const edges: Edge[] = [
    {
      id: "getContactInfo-chooseHousekeeper",
      source: "getContactInfo",
      target: "chooseHousekeeper",
      markerEnd: { type: MarkerType.Arrow },
      className: stage === "getContactInfo" ? activeEdgeStyles : inactiveEdgeStyles,
    },
    {
      id: "chooseHousekeeper-sellFinancing",
      source: "chooseHousekeeper",
      target: "getPaymentInfo",
      markerEnd: { type: MarkerType.Arrow },
      className: stage === "chooseHousekeeper" ? activeEdgeStyles : inactiveEdgeStyles,
    },
    {
      id: "getPaymentInfo-confirmOrder",
      source: "getPaymentInfo",
      target: "confirmOrder",
      markerEnd: { type: MarkerType.Arrow },
      className: stage === "getPaymentInfo" ? activeEdgeStyles : inactiveEdgeStyles,
      type: "smoothstep",
    },
  ];

  return (
    <div className="h-full w-full border rounded-lg">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        draggable={false}
        nodesDraggable={false}
        nodesConnectable={false}
        preventScrolling={true}
        panOnDrag={false}
      />
    </div>
  );
}
