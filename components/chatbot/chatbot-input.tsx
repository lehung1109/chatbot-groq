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
import { ChatbotActionType, useChatbot } from "@/providers/chatbot-provider";
import { toast } from "sonner";
import { MessageType } from "./chatbot-conversation";
import ChatbotSpeech from "./chatbot-speech";
import ChatbotInputSearch from "./chatbot-input-search";
import ChatbotModelSelector, { ModelProps } from "./chatbot-model-selector";
import ChatbotSubmitButton from "./chatbot-submit-button";

export interface ChatbotInputProps {
  chefs: string[];
  models: ModelProps[];
}

const ChatbotInput = ({ chefs, models }: ChatbotInputProps) => {
  const { dispatch, state } = useChatbot();
  const { messages, text } = state || {};

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    dispatch?.({
      type: ChatbotActionType.SET_STATUS,
      payload: "submitted",
    });

    if (message.files?.length) {
      toast.success("Files attached", {
        description: `${message.files.length} file(s) attached to message`,
      });
    }

    // add user message
    const timestamp = Date.now();

    const userMessage: MessageType = {
      from: "user",
      key: `user-${timestamp}`,
      versions: [
        {
          content: message.text || "Sent with attachments",
          id: `user-${timestamp}`,
        },
      ],
    };

    dispatch?.({
      type: ChatbotActionType.SET_MESSAGES,
      payload: new Map(messages).set(userMessage.key, userMessage),
    });

    // reset text
    dispatch?.({
      type: ChatbotActionType.SET_TEXT,
      payload: "",
    });
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch?.({
      type: ChatbotActionType.SET_TEXT,
      payload: event.target.value,
    });
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

          <ChatbotModelSelector chefs={chefs} models={models} />
        </PromptInputTools>

        <ChatbotSubmitButton />
      </PromptInputFooter>
    </PromptInput>
  );
};

export default ChatbotInput;
