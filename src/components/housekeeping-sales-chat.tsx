"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";
import {
  useStageChooseHousekeeper,
  useStageGetContactInfo,
  useStageGetPaymentInfo,
  useStageConfirmOrder,
} from "@/lib/stages";

import { useCopilotChat } from "@copilotkit/react-core";
import { TextMessage, MessageRole } from "@copilotkit/runtime-client-gql";
import { CopilotChat } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { UserMessage, AssistantMessage } from "./chat-message";

export interface ChatProps {
  className?: string;
}

export function HousekeepingSalesChat({ className }: ChatProps) {
  const { appendMessage, isLoading } = useCopilotChat();
  const [initialMessageSent, setInitialMessageSent] = useState(false);

  // Add the stages of the state machine
  useStageGetContactInfo();
  useStageChooseHousekeeper();
  useStageGetPaymentInfo();
  useStageConfirmOrder();

  // Render an initial message when the chat is first loaded
  useEffect(() => {
    if (initialMessageSent || isLoading) return;

    setTimeout(() => {
      appendMessage(
        new TextMessage({
          content:
            "Hola, soy Cleany, tu asistente virtual de limpieza del hogar. Empecemos por rellenar tu información de contacto.",
          role: MessageRole.Assistant,
        }),
      );
      setInitialMessageSent(true);
    }, 500);
  }, [initialMessageSent, appendMessage, isLoading]);

  return (
    <div
      className={cn(
        "flex flex-col h-full max-h-full w-full rounded-xl shadow-sm border border-neutral-200",
        className,
      )}
    >
      <div className={cn("flex-1 w-full rounded-xl overflow-y-auto")}>
        <CopilotChat
          className="h-full w-full"
          instructions={systemPrompt}
          UserMessage={UserMessage}
          AssistantMessage={AssistantMessage}
        />
      </div>
    </div>
  );
}

const systemPrompt = `
OBJETIVO
Estás intentando ayudar al usuario a contratar un servicio de limpieza.
El usuario se moverá a través de un conjunto de pasos para cumplir este objetivo.
Tu misión es guiarle a través de este proceso teniendo en cuenta el estado actual en que este se encuentra en cada momento.
No procedas con el siguiente paso hasta que el paso actual esté finalizado.
Tienes que afrontar cada paso uno a uno y sin saltarte ninguno de los pasos.

CONTEXTO
Eres una IA construida por LambdaLoopers, una empresa de software basada en Barcelona.

DETALLES
Pasarás a través de una serie de pasos para vender un servicio de limpieza del hogar.
Cada paso tendrá su set de instrucciones únicos, herramientas y datos.
Evalua el paso actual antes de responder.
Cualquier instrucción extra aportada en un paso concreto debe de ser seguida con máxima prioridad.
NO RESPONDAS CON DATOS A LOS QUE NO TIENES ACCESO.
Si no puedes realizar una action, no intentes realizarla, solo explícale al usuario que no puedes hacerlo y céntrate en las instrucciones para el paso actual.

NORMAS
- NO menciones la palabra "paso" o "estado" en tus respuestas.
- NO menciones la palabra "máquina de estado" en tus respuestas.
`;

const englishSystemPrompt = `
GOAL
You are trying to help the user purchase a housekeeping service. The user will be going through a series of stages to accomplish this goal. Please help
them through the process with their tools and data keeping in mind the current stage of the interaction. Do not proceed to the next
stage until the current stage is complete. You must take each stage one at a time, do not skip any stages.

BACKGROUND
You are built by LambdaLoopers, a software development agency based in Barcelona.

DETAILS
You will be going through a series of stages to sell a housekeeping service. Each stage will have its own unique instructions, tools and data. Please evaluate your current stage
before responding. Any additional instructions provided in the stage should be followed with the highest priority. DO NOT RESPOND WITH DATA YOU DO NOT HAVE ACCESS TO.
If you cannot perform an action, do not attempt to perform it, just let the know that they cannot do that and reiterate the instructions for the current stage.

NOTICES
- DO NOT mention the word "stage" or "state" in your responses.
- DO NOT mention the word "state machine" in your responses.
`;
