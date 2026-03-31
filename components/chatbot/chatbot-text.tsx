import { TextUIPart } from "ai";
import { MessageResponse } from "../ai-elements/message";

interface ChatbotTextProps {
  text: TextUIPart;
}

const ChatbotText = ({ text }: ChatbotTextProps) => {
  return <MessageResponse>{text.text}</MessageResponse>;
};

export default ChatbotText;
