import { ReasoningUIPart } from "ai";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "../ai-elements/reasoning";

interface ChatbotReasoningProps {
  reasoning: ReasoningUIPart;
}

const ChatbotReasoning = ({ reasoning }: ChatbotReasoningProps) => {
  return (
    <Reasoning isStreaming={reasoning.state === "streaming"}>
      <ReasoningTrigger />

      <ReasoningContent>{reasoning.text}</ReasoningContent>
    </Reasoning>
  );
};

export default ChatbotReasoning;
