import { useChatbotStore } from "@/providers/chatbot-provider";
import { SpeechInput } from "../ai-elements/speech-input";

const ChatbotSpeech = () => {
  const { text, setText } = useChatbotStore((state) => ({
    text: state.text,
    setText: state.setText,
  }));

  const handleTranscriptionChange = (transcript: string) => {
    setText(text ? `${text} ${transcript}` : transcript);
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
