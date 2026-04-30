import { TextUIPart } from "ai";
import { MessageResponse } from "../ai-elements/message";

interface ChatbotTextProps {
  text: TextUIPart;
  status: "streaming" | "done";
}

const ChatbotText = ({ text, status }: ChatbotTextProps) => {
  return (
    <MessageResponse
      isAnimating={status === "streaming"}
      animated={{ animation: "blurIn" }}
    >
      {text.text}
    </MessageResponse>
  );
};

export default ChatbotText;
