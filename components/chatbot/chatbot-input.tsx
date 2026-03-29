import { GlobeIcon } from "lucide-react";
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "../ai-elements/prompt-input";
import { SpeechInput } from "../ai-elements/speech-input";
import { Suggestions } from "../ai-elements/suggestion";
import PromptInputAttachmentsDisplay from "./attachment-display";
import SuggestionItem from "./suggestion-item";
import {
  ModelSelector,
  ModelSelectorContent,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorInput,
  ModelSelectorList,
  ModelSelectorLogo,
  ModelSelectorName,
  ModelSelectorTrigger,
} from "../ai-elements/model-selector";
import ModelItem from "./model-item";
import { useCallback, useState } from "react";
import { ChatStatus } from "ai";
import { MessageType } from "./chatbot-conversation";
import { delay } from "../delay";
import { toast } from "sonner";
import { ChatbotActionType, useChatbot } from "@/providers/chatbot-provider";

export interface ChatbotInputProps {
  suggestions: string[];
  chatbotMockResponses: string[];
  chefs: string[];
  models: {
    chef: string;
    chefSlug: string;
    id: string;
    name: string;
    providers: string[];
  }[];
}

const ChatbotInput = ({
  suggestions,
  chatbotMockResponses,
  chefs,
  models,
}: ChatbotInputProps) => {
  const { state, dispatch } = useChatbot();
  const { messages, status } = state || {};

  // local state
  const [text, setText] = useState<string>("");
  const [useWebSearch, setUseWebSearch] = useState<boolean>(false);
  const [model, setModel] = useState<string>(models[0].id);
  const [modelSelectorOpen, setModelSelectorOpen] = useState(false);

  const selectedModelData = models.find((m) => m.id === model);

  const isSubmitDisabled = !(text.trim() || status) || status === "streaming";

  const updateMessageContent = (messageId: string, newContent: string) => {
    dispatch?.({
      type: ChatbotActionType.SET_MESSAGES,
      payload: messages
        ? new Map(messages).set(messageId, {
            ...messages.get(messageId)!,
            versions: messages
              .get(messageId)!
              .versions.map((v) =>
                v.id === messageId ? { ...v, content: newContent } : v,
              ),
          })
        : new Map(),
    });
  };

  const streamResponse = async (messageId: string, content: string) => {
    dispatch?.({
      type: ChatbotActionType.SET_STATUS,
      payload: "streaming",
    });

    const words = content.split(" ");
    let currentContent = "";

    for (const [i, word] of words.entries()) {
      currentContent += (i > 0 ? " " : "") + word;

      updateMessageContent(messageId, currentContent);

      await delay(Math.random() * 100 + 50);
    }

    dispatch?.({
      type: ChatbotActionType.SET_STATUS,
      payload: "ready",
    });
  };

  const handleSuggestionClick = (suggestion: string) => {
    dispatch?.({
      type: ChatbotActionType.SET_STATUS,
      payload: "submitted",
    });
    addUserMessage(suggestion);
  };

  const addUserMessage = (content: string) => {
    const timestamp = Date.now();

    const userMessage: MessageType = {
      from: "user",
      key: `user-${timestamp}`,
      versions: [
        {
          content,
          id: `user-${timestamp}`,
        },
      ],
    };

    dispatch?.({
      type: ChatbotActionType.SET_MESSAGES,
      payload: new Map(messages).set(userMessage.key, userMessage),
    });

    setTimeout(() => {
      const assistantMessageId = `assistant-${timestamp}`;
      const randomResponse =
        chatbotMockResponses[
          Math.floor(Math.random() * chatbotMockResponses.length)
        ];

      const assistantMessage: MessageType = {
        from: "assistant",
        key: `assistant-${timestamp}`,
        versions: [
          {
            content: "",
            id: assistantMessageId,
          },
        ],
      };

      dispatch?.({
        type: ChatbotActionType.SET_MESSAGES,
        payload: new Map(messages).set(assistantMessage.key, assistantMessage),
      });
      streamResponse(assistantMessageId, randomResponse);
    }, 500);
  };

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

    addUserMessage(message.text || "Sent with attachments");
    setText("");
  };

  const handleTextChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(event.target.value);
    },
    [],
  );

  const handleTranscriptionChange = useCallback((transcript: string) => {
    setText((prev) => (prev ? `${prev} ${transcript}` : transcript));
  }, []);

  const toggleWebSearch = useCallback(() => {
    setUseWebSearch((prev) => !prev);
  }, []);

  const handleModelSelect = (modelId: string) => {
    setModel(modelId);
    setModelSelectorOpen(false);
  };

  return (
    <div className="grid shrink-0 gap-4 pt-4">
      <Suggestions className="px-4">
        {suggestions.map((suggestion) => (
          <SuggestionItem
            key={suggestion}
            onClick={handleSuggestionClick}
            suggestion={suggestion}
          />
        ))}
      </Suggestions>

      <div className="w-full px-4 pb-4">
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

              <SpeechInput
                className="shrink-0"
                onTranscriptionChange={handleTranscriptionChange}
                size="icon-sm"
                variant="ghost"
              />

              <PromptInputButton
                onClick={toggleWebSearch}
                variant={useWebSearch ? "default" : "ghost"}
              >
                <GlobeIcon size={16} />

                <span>Search</span>
              </PromptInputButton>

              <ModelSelector
                onOpenChange={setModelSelectorOpen}
                open={modelSelectorOpen}
              >
                <ModelSelectorTrigger asChild>
                  <PromptInputButton>
                    {selectedModelData?.chefSlug && (
                      <ModelSelectorLogo
                        provider={selectedModelData.chefSlug}
                      />
                    )}
                    {selectedModelData?.name && (
                      <ModelSelectorName>
                        {selectedModelData.name}
                      </ModelSelectorName>
                    )}
                  </PromptInputButton>
                </ModelSelectorTrigger>

                <ModelSelectorContent>
                  <ModelSelectorInput placeholder="Search models..." />

                  <ModelSelectorList>
                    <ModelSelectorEmpty>No models found.</ModelSelectorEmpty>

                    {chefs.map((chef) => (
                      <ModelSelectorGroup heading={chef} key={chef}>
                        {models
                          .filter((m) => m.chef === chef)
                          .map((m) => (
                            <ModelItem
                              isSelected={model === m.id}
                              key={m.id}
                              m={m}
                              onSelect={handleModelSelect}
                            />
                          ))}
                      </ModelSelectorGroup>
                    ))}
                  </ModelSelectorList>
                </ModelSelectorContent>
              </ModelSelector>
            </PromptInputTools>

            <PromptInputSubmit disabled={isSubmitDisabled} status={status} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
};

export default ChatbotInput;
