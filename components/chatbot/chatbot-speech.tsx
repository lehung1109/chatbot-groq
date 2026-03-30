import { ChatbotActionType, useChatbot } from "@/providers/chatbot-provider";
import { SpeechInput } from "../ai-elements/speech-input";

const ChatbotSpeech = () => {
  const { dispatch, state } = useChatbot();
  const { text } = state || {};

  const handleTranscriptionChange = (transcript: string) => {
    dispatch?.({
      type: ChatbotActionType.SET_TEXT,
      payload: text ? `${text} ${transcript}` : transcript,
    });
  };

  return (
    <SpeechInput
      className="shrink-0"
      onTranscriptionChange={handleTranscriptionChange}
      size="icon-sm"
      variant="ghost"
    />
  );
};

export default ChatbotSpeech;
