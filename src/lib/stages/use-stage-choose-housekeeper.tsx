import { ShowHousekeeper, ShowHousekeepers } from "@/components/generative-ui/show-housekeeper";
import { Housekeeper, housekeepers } from "@/lib/types";
import { useGlobalState } from "@/lib/stages";
import {
  useCopilotAction,
  useCopilotReadable,
  useCopilotAdditionalInstructions,
} from "@copilotkit/react-core";

/**
  useStageBuildCar is a hook that will add this stage to the state machine. It is responsible for:
  - Helping the user select a housekeeper.
  - Storing the selected housekeeper in the global state.
  - Moving to the next stage, sellFinancing.
*/
export function useStageChooseHousekeeper() {
  const { setSelectedHousekeeper, stage, setStage } = useGlobalState();

  // Conditionally add additional instructions for the agent's prompt.
  useCopilotAdditionalInstructions(
    {
      instructions:
        // "CURRENT STATE: You are now helping the user select a housekeeper. TO START, say 'Thank you for that information! Do you have any preference for your housekeeper that we should take into account?'. If you have a housekeeper in mind, give a reason why you recommend it and then call the 'showHousekeeper' action with the housekeeper you have in mind or show multiple housekeepers with the 'showMultipleHousekeepers' action. Never list the housekeepers you have in mind, just show them. Do ",
        "ESTADO ACTUAL: Ahora estás ayudando al usuario a seleccionar a una persona para limpiar su hogar. PARA EMPEZAR, di '¡Gracias por tu información! ¿Tienes alguna preferencia para la persona que vendrá a limpiar tu hogar?'. Si tienes a una persona limpiadora en mente, da una razón por la que la recomiendas y luego llama a la action 'showHousekeeper' con la persona limpiadora que tienes en mente, o muestra múltiples personas limpiadoras con la action 'showMultipleHousekeepers'. Nunca listes los limpiadores que tienes en mente, solo muéstralos.",
      available: stage === "chooseHousekeeper" ? "enabled" : "disabled",
    },
    [stage],
  );

  // Conditionally add additional readable information for the agent's prompt.
  useCopilotReadable(
    {
      description: "Lista de personas limpiadoras.",
      value: housekeepers,
      available: stage === "chooseHousekeeper" ? "enabled" : "disabled",
    },
    [stage],
  );

  // Conditionally add an action to show a single housekeeper.
  useCopilotAction(
    {
      name: "showHousekeeper",
      description:
        "Muestra una sola persona limpiadora que tienes en mente. No llames esta action más de una vez, llama la action `showMultipleHousekeepers` si tienes más de una persona limpiadora que mostrar.",
      available: stage === "chooseHousekeeper" ? "enabled" : "disabled",
      parameters: [
        {
          name: "housekeeper",
          type: "object",
          description: "La persona limpiadora a mostrar.",
          required: true,
          attributes: [
            { name: "id", type: "number" },
            { name: "name", type: "string" },
            { name: "age", type: "number" },
            { name: "gender", type: "string" },
            { name: "stars_over_five", type: "number" },
            { name: "hourly_price", type: "number" },
            {
              name: "image",
              type: "object",
              attributes: [
                { name: "src", type: "string" },
                { name: "alt", type: "string" },
                { name: "author", type: "string" },
              ],
            },
          ],
        },
      ],
      renderAndWaitForResponse: ({ args, status, respond }) => {
        const { housekeeper } = args;
        return (
          <ShowHousekeeper
            housekeeper={(housekeeper as Housekeeper) || ({} as Housekeeper)}
            status={status}
            onSelect={() => {
              // Store the selected housekeeper in the global state.
              setSelectedHousekeeper((housekeeper as Housekeeper) || ({} as Housekeeper));

              // Let the agent know that the user has selected a housekeeper.
              respond?.(
                // "User has selected a housekeeper, you can see it in your readables, the system will now move to the next state, do not call nextState.",
                "El usuario ha seleccionado a una persona limpiadora, la puedes ver en tus readables, el sistema se va a mover al siguiente paso, no llames nextState.",
              );

              // Move to the next stage, sellFinancing.
              setStage("getPaymentInfo");
            }}
            onReject={() =>
              respond?.(
                "El usuario quiere seleccionar una persona limpiadora distinta, sigue en este paso y ayúda al usuario a seleccionar a una persona limpiadora distinta.",
              )
            }
          />
        );
      },
    },
    [stage],
  );

  // Conditionally add an action to show multiple housekeepers.
  useCopilotAction(
    {
      name: "showMultipleHousekeepers",
      description:
      // "Show a list of housekeepers based on the user's query. Do not call this more than once. Call `showHousekeeper` if you only have a single housekeeper to show.",
        "Muestra una lista de personas limpiadoras basada en la petición del usuario. No llames a este método más de una vez. Llama a la action `showHousekeeper` si solo tienes una persona limpiadora a mostrar.",
      parameters: [
        {
          name: "housekeepers",
          type: "object[]",
          required: true,
          attributes: [
            { name: "id", type: "number" },
            { name: "name", type: "string" },
            { name: "age", type: "number" },
            { name: "gender", type: "string" },
            { name: "stars_over_five", type: "number" },
            { name: "hourly_price", type: "number" },
            {
              name: "image",
              type: "object",
              attributes: [
                { name: "src", type: "string" },
                { name: "alt", type: "string" },
                { name: "author", type: "string" },
              ],
            },
          ],
        },
      ],
      renderAndWaitForResponse: ({ args, status, respond }) => {
        return (
          <ShowHousekeepers
            housekeepers={(args.housekeepers as Housekeeper[]) || ([] as Housekeeper)}
            status={status}
            onSelect={(housekeeper) => {
              // Store the selected housekeeper in the global state.
              setSelectedHousekeeper(housekeeper);

              // Let the agent know that the user has selected a housekeeper.
              respond?.(
                "El usuario ha seleccionado a una persona limpiadora, puedes verlo en tus readables, ahora nos movemos al siguiente paso.",
              );

              // Move to the next stage, sellFinancing.
              setStage("getPaymentInfo");
            }}
          />
        );
      },
    },
    [stage],
  );
}
