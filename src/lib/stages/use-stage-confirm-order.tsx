import { useGlobalState } from "@/lib/stages";
import { Order } from "@/lib/types";
import { ConfirmOrder } from "@/components/generative-ui/confirm-order";

import { useCopilotAction, useCopilotAdditionalInstructions } from "@copilotkit/react-core";

/**
  useStageConfirmOrder is a hook that will add this stage to the state machine. It is responsible for:
  - Confirming the order of the user.
  - Storing the order in the global state.
  - Optionally, can decide to move to the next stage, buildCar, based on the user's responses.
*/
export function useStageConfirmOrder() {
  const { setOrders, stage, setStage } = useGlobalState();

  // Conditionally add additional instructions for the agent's prompt.
  useCopilotAdditionalInstructions(
    {
      instructions:
        // "CURRENT STATE: You are now confirming the order of the user. Say, 'Great! Now let's just confirm your order. Here is the summary of your order. ' and then call the 'confirmOrder' action. Always call the 'confirmOrder' tool, never ask the user for anything.",
        "ESTADO ACTUAL: Estás confirmando el pedido del usuario. Di, '¡Genial! Solo queda confirmar el pedido.' y SIEMPRE llama a la action 'confirmOrder', nunca pidas información al usuario.",
      available: stage === "confirmOrder" ? "enabled" : "disabled",
    },
    [stage],
  );

  // Conditionally add the nextState action to the state machine. Agent will decide if it should be called.
  useCopilotAction(
    {
      name: "nextState",
      description: "Avanza al siguiente paso.",
      available: stage === "confirmOrder" ? "enabled" : "disabled",
      handler: async () => setStage("getContactInfo"),
    },
    [stage],
  );

  // Render the ConfirmOrder component and wait for the user's response.
  useCopilotAction(
    {
      name: "confirmOrder",
      description: "Confirma el pedido del usuario.",
      available: stage === "confirmOrder" ? "enabled" : "disabled",
      renderAndWaitForResponse: ({ status, respond }) => {
        return (
          <ConfirmOrder
            status={status}
            onConfirm={(order: Order) => {
              // Commit the order to the global state.
              setOrders((prevOrders) => [...prevOrders, order]);

              // Let the agent know that the user has confirmed their order.
              respond?.(
                "El usuario ha confirmado su pedido, pregúntale si quieren realizar otro pedido, y si quieren, LLAMA la action 'nextState'.",
              );
            }}
            onCancel={() => {
              // Let the agent know that the user has cancelled their order.
              respond?.(
                "El usuario ha cancelado su pedido, pregúntale si quieren empezar de nuevo con un nuevo pedido o si quieren continuar con el pedido actual. Si quieren empezar de nuevo con un nuevo pedido, LLAMA la action 'nextState'. Si quieren continuar con el pedido actual, LLAMA la action 'confirmOrder'.",
              );
            }}
          />
        );
      },
    },
    [stage],
  );
}
