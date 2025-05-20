import { PaymentCards } from "@/components/generative-ui/payment-cards";
import { CardInfo } from "@/lib/types";
import { useGlobalState } from "@/lib/stages";
import { useCopilotAction, useCopilotAdditionalInstructions } from "@copilotkit/react-core";

export interface UseGetPaymentInfoStateOptions {
  enabled: boolean;
  onNextState: () => void;
}

/**
  useStateGetPaymentInfo is a hook that will add this stage to the state machine. It is responsible for:
  - Getting the payment information of the user.
  - Storing the payment information in the global state.
  - Moving to the next stage, confirmOrder.
*/
export function useStageGetPaymentInfo() {
  const { setCardInfo, stage, setStage } = useGlobalState();

  // Conditionally add additional instructions for the agent's prompt.
  useCopilotAdditionalInstructions(
    {
      instructions:
        "ESTADO ACTUAL: Estás obteniendo la información de pago del usuario. Di, '¡Genial! Ahora necesito tu información de pago.' y LLAMA a la action 'getPaymentInformation'.",
      available: stage === "getPaymentInfo" ? "enabled" : "disabled",
    },
    [stage],
  );

  // Render the PaymentCards component and wait for the user's response.
  useCopilotAction(
    {
      name: "getPaymentInformation",
      description: "Obtiene la información de pago del usuario.",
      available: stage === "getPaymentInfo" ? "enabled" : "disabled",
      renderAndWaitForResponse: ({ respond }) => {
        return (
          <PaymentCards
            onSubmit={(cardInfo: CardInfo) => {
              // Store the payment information in the global state.
              setCardInfo(cardInfo);

              // Let the agent know that the user has submitted their payment information.
              respond?.(
                "El usuario ha enviado su información de pago, nos movemos al siguiente paso.",
              );

              // Move to the next stage, confirmOrder.
              setStage("confirmOrder");
            }}
          />
        );
      },
    },
    [stage],
  );
}
