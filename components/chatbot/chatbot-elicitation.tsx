import type { ElicitRequestFormParams } from "@modelcontextprotocol/client";
import { Button } from "../ui/button";
import { useState } from "react";

export interface ChatbotElicitationProps {
  data: ElicitRequestFormParams & { id: string };
}

const ChatbotElicitation = ({ data }: ChatbotElicitationProps) => {
  const { message, id } = data;
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    fetch(`/api/elicitation`, {
      method: "POST",
      body: JSON.stringify({
        requestId: id,
        value,
      }),
    });
  };

  return (
    <div>
      <p className="text-sm text-gray-500 mb-2">{message}</p>

      <form>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2 mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={submitted}
        />
        {!submitted && (
          <Button
            className="cursor-pointer"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        )}
      </form>
    </div>
  );
};

export default ChatbotElicitation;
