import type { ElicitRequestFormParams } from "@modelcontextprotocol/client";
import { Button } from "@heroitvn/shacnui/ui/button";
import { useState } from "react";

export interface ChatbotElicitationProps {
  elicitationId: string;
  requestParams?: ElicitRequestFormParams;
}

const ChatbotElicitation = ({
  elicitationId,
  requestParams,
}: ChatbotElicitationProps) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (action: "accept" | "decline") => {
    setSubmitted(true);

    fetch(`/api/elicitation`, {
      method: "POST",
      body: JSON.stringify({
        elicitationId,
        action,
      }),
    });
  };

  if (submitted) {
    return <></>;
  }

  return (
    <div>
      {requestParams?.message && (
        <p className="text-sm text-gray-500 mb-2">{requestParams?.message}</p>
      )}

      <div className="flex gap-2">
        <Button
          onClick={() => {
            handleSubmit("accept");
          }}
        >
          Approve
        </Button>

        <Button
          variant="destructive"
          disabled={submitted}
          onClick={() => {
            handleSubmit("decline");
          }}
        >
          Reject
        </Button>
      </div>
    </div>
  );
};

export default ChatbotElicitation;
