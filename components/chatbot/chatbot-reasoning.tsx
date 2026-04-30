import { ReasoningUIPart } from "ai";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "../ai-elements/reasoning";
import { StreamingTypewriterRAF } from "@heroitvn/streaming-typewriter-raf";

interface ChatbotReasoningProps {
  reasoning: ReasoningUIPart;
}

const ChatbotReasoning = ({ reasoning }: ChatbotReasoningProps) => {
  return (
    <Reasoning isStreaming={reasoning.state === "streaming"}>
      <ReasoningTrigger />

      <ReasoningContent>
        <StreamingTypewriterRAF
          text={reasoning.text}
          status={reasoning.state ?? "streaming"}
        />
      </ReasoningContent>
    </Reasoning>
  );
};

export default ChatbotReasoning;
