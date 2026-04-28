import type { ElicitRequestFormParams } from "@modelcontextprotocol/client";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export interface ChatbotElicitationProps {
  elicitationId: string;
  requestParams?: ElicitRequestFormParams;
}

const ChatbotElicitation = ({
  elicitationId,
  requestParams,
}: ChatbotElicitationProps) => {
  const [action, setAction] = useState<"accept" | "decline">("accept");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);

    fetch(`/api/elicitation`, {
      method: "POST",
      body: JSON.stringify({
        elicitationId,
        action,
      }),
    });
  };

  return (
    <div>
      {requestParams?.message && (
        <p className="text-sm text-gray-500 mb-2">{requestParams?.message}</p>
      )}

      <div className="flex gap-2">
        <Button
          onClick={() => {
            setAction("accept");
            handleSubmit();
          }}
        >
          Approve
        </Button>

        <Button
          variant="destructive"
          disabled={submitted}
          onClick={() => {
            setAction("decline");
            handleSubmit();
          }}
        >
          Reject
        </Button>
      </div>
    </div>
  );
};

export default ChatbotElicitation;
