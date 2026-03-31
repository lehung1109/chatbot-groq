import { TextUIPart } from "ai";
import { MessageContent, MessageResponse } from "../ai-elements/message";

interface ChatbotTextProps {
  text: TextUIPart;
}

const ChatbotText = ({ text }: ChatbotTextProps) => {
  return (
    <MessageContent>
      <MessageResponse>{text.text}</MessageResponse>
    </MessageContent>
  );
};

export default ChatbotText;
