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
  - Helping the user select a car.
  - Storing the selected car in the global state.
  - Moving to the next stage, sellFinancing.
*/
export function useStageChooseHousekeeper() {
  const { setSelectedHousekeeper, stage, setStage } = useGlobalState();

  // Conditionally add additional instructions for the agent's prompt.
  useCopilotAdditionalInstructions(
    {
      instructions:
        "CURRENT STATE: You are now helping the user select a housekeeper. TO START, say 'Thank you for that information! Do you have any preference for your housekeeper that we should take into account?'. If you have a housekeeper in mind, give a reason why you recommend it and then call the 'showHousekeeper' action with the housekeeper you have in mind or show multiple housekeepers with the 'showMultipleHousekeepers' action. Never list the housekeepers you have in mind, just show them. Do ",
      available: stage === "chooseHousekeeper" ? "enabled" : "disabled",
    },
    [stage],
  );

  // Conditionally add additional readable information for the agent's prompt.
  useCopilotReadable(
    {
      description: "Housekeeper Inventory",
      value: housekeepers,
      available: stage === "chooseHousekeeper" ? "enabled" : "disabled",
    },
    [stage],
  );

  // Conditionally add an action to show a single car.
  useCopilotAction(
    {
      name: "showHousekeeper",
      description:
        "Show a single housekeeper that you have in mind. Do not call this more than once, call `showMultipleHousekeepers` if you have multiple housekeepers to show.",
      available: stage === "chooseHousekeeper" ? "enabled" : "disabled",
      parameters: [
        {
          name: "housekeeper",
          type: "object",
          description: "The housekeeper to show",
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
              // Store the selected car in the global state.
              setSelectedHousekeeper((housekeeper as Housekeeper) || ({} as Housekeeper));

              // Let the agent know that the user has selected a car.
              respond?.(
                "User has selected a housekeeper, you can see it in your readables, the system will now move to the next state, do not call nextState.",
              );

              // Move to the next stage, sellFinancing.
              setStage("sellFinancing");
            }}
            onReject={() =>
              respond?.(
                "User wants to select a different housekeeper, please stay in this state and help them select a different housekeeper",
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
        "Show a list of housekeepers based on the user's query. Do not call this more than once. Call `showHousekeeper` if you only have a single housekeeper to show.",
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
                "User has selected a housekeeper you can see it in your readables, you are now moving to the next state",
              );

              // Move to the next stage, sellFinancing.
              setStage("sellFinancing");
            }}
          />
        );
      },
    },
    [stage],
  );
}
