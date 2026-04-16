import type { ElicitRequestFormParams } from "@modelcontextprotocol/client";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export interface ChatbotElicitationProps {
  data?: ElicitRequestFormParams & { id: string };
  error?: string;
}

const ChatbotElicitation = ({ data, error }: ChatbotElicitationProps) => {
  const { message, id, requestedSchema } = data ?? {};
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ignoreHtmlData = !requestedSchema?.properties.htmlPage;

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

  useEffect(() => {
    if (ignoreHtmlData) {
      return;
    }

    fetch(`/api/elicitation`, {
      method: "POST",
      body: JSON.stringify({
        requestId: id,
        value: document.documentElement.outerHTML,
      }),
    });
  }, [id, ignoreHtmlData]);

  return ignoreHtmlData && requestedSchema ? (
    <div>
      <p className="text-sm text-gray-500 mb-2">{message}</p>

      <form>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2 mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={submitted || !!error}
        />
        {!submitted && !error && (
          <Button
            className="cursor-pointer"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        )}

        {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
      </form>
    </div>
  ) : (
    ""
  );
};

export default ChatbotElicitation;
