"use client";

import type { ElicitRequestFormParams } from "@modelcontextprotocol/client";
import type { ToolUIPart } from "ai";
import { CheckIcon, XIcon } from "lucide-react";
import { useState } from "react";
import {
  Confirmation,
  ConfirmationAccepted,
  ConfirmationAction,
  ConfirmationActions,
  ConfirmationRejected,
  ConfirmationRequest,
  ConfirmationTitle,
} from "../ai-elements/confirmation";

export interface ChatbotElicitationProps {
  elicitationId: string;
  requestParams?: ElicitRequestFormParams;
}

type ElicitationApproval =
  | { id: string; approved?: never }
  | { id: string; approved: boolean };

const ChatbotElicitation = ({
  elicitationId,
  requestParams,
}: ChatbotElicitationProps) => {
  const [approval, setApproval] = useState<ElicitationApproval>({
    id: elicitationId,
  });
  const [state, setState] = useState<
    Extract<ToolUIPart["state"], "approval-requested" | "approval-responded">
  >("approval-requested");

  const handleSubmit = (action: "accept" | "decline") => {
    setApproval({
      id: elicitationId,
      approved: action === "accept",
    });
    setState("approval-responded");

    fetch(`/api/elicitation`, {
      method: "POST",
      body: JSON.stringify({
        elicitationId,
        action,
      }),
    });
  };

  return (
    <Confirmation approval={approval} state={state}>
      <ConfirmationTitle>
        <ConfirmationRequest>
          {requestParams?.message?.trim()
            ? requestParams.message
            : "Do you approve this request?"}
        </ConfirmationRequest>
        <ConfirmationAccepted>
          <CheckIcon className="size-4 shrink-0" />
          <span>You approved this request</span>
        </ConfirmationAccepted>
        <ConfirmationRejected>
          <XIcon className="size-4 shrink-0" />
          <span>You rejected this request</span>
        </ConfirmationRejected>
      </ConfirmationTitle>
      <ConfirmationActions>
        <ConfirmationAction
          variant="outline"
          onClick={() => handleSubmit("decline")}
        >
          Reject
        </ConfirmationAction>
        <ConfirmationAction
          variant="default"
          onClick={() => handleSubmit("accept")}
        >
          Approve
        </ConfirmationAction>
      </ConfirmationActions>
    </Confirmation>
  );
};

export default ChatbotElicitation;
