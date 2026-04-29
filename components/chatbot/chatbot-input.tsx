import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputBody,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputMessage,
  PromptInputTextarea,
  PromptInputTools,
} from "../ai-elements/prompt-input";
import PromptInputAttachmentsDisplay from "./attachment-display";
import { useChatbotStore } from "@/providers/chatbot-provider";
import { toast } from "sonner";
import ChatbotSpeech from "./chatbot-speech";
import ChatbotInputSearch from "./chatbot-input-search";
import ChatbotModelSelector from "./chatbot-model-selector";
import ChatbotSubmitButton from "./chatbot-submit-button";
import { GroqChatModelId } from "@/types/groq";
import { useChat } from "@ai-sdk/react";

export interface ChatbotInputProps {
  models: GroqChatModelId[];
}

const ChatbotInput = ({ models }: ChatbotInputProps) => {
  const text = useChatbotStore((state) => state.text);
  const webSearch = useChatbotStore((state) => state.webSearch);
  const selectedModel = useChatbotStore((state) => state.selectedModel);
  const conversationId = useChatbotStore((state) => state.conversationId);
  const setText = useChatbotStore((state) => state.setText);
  const { sendMessage } = useChat();

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    if (message.files?.length) {
      toast.success("Files attached", {
        description: `${message.files.length} file(s) attached to message`,
      });
    }

    // send user message
    sendMessage?.(
      {
        text: message.text || "Sent with attachments",
        files: message.files,
      },
      {
        body: {
          model: selectedModel,
          webSearch: webSearch,
          conversationId: conversationId,
        },
      },
    );

    // reset text
    setText("");
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <PromptInput globalDrop multiple onSubmit={handleSubmit}>
      <PromptInputHeader>
        <PromptInputAttachmentsDisplay />
      </PromptInputHeader>

      <PromptInputBody>
        <PromptInputTextarea onChange={handleTextChange} value={text} />
      </PromptInputBody>

      <PromptInputFooter>
        <PromptInputTools>
          <PromptInputActionMenu>
            <PromptInputActionMenuTrigger />

            <PromptInputActionMenuContent>
              <PromptInputActionAddAttachments />
            </PromptInputActionMenuContent>
          </PromptInputActionMenu>

          <ChatbotSpeech />

          <ChatbotInputSearch />

          <ChatbotModelSelector models={models} />
        </PromptInputTools>

        <ChatbotSubmitButton />
      </PromptInputFooter>
    </PromptInput>
  );
};

export default ChatbotInput;
