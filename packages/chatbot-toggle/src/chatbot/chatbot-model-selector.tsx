import { useState } from "react";
import {
  ModelSelector,
  ModelSelectorContent,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorInput,
  ModelSelectorList,
  ModelSelectorName,
  ModelSelectorTrigger,
} from "../../../../components/ai-elements/model-selector";
import { PromptInputButton } from "../../../../components/ai-elements/prompt-input";
import ModelItem from "./model-item";
import { useChatbotStore } from "../providers/chatbot-provider";
import { GroqChatModelId } from "../types/groq";

export interface ChatbotModelSelectorProps {
  models: GroqChatModelId[];
}

const ChatbotModelSelector = ({ models }: ChatbotModelSelectorProps) => {
  const [modelSelectorOpen, setModelSelectorOpen] = useState(false);
  const selectedModel = useChatbotStore((state) => state.selectedModel);
  const setSelectedModel = useChatbotStore((state) => state.setSelectedModel);

  const handleModelSelect = (modelId: string) => {
    const selected = models.find((m) => m === modelId);

    if (selected) {
      setSelectedModel(selected);
    }

    setModelSelectorOpen(false);
  };

  return (
    <ModelSelector onOpenChange={setModelSelectorOpen} open={modelSelectorOpen}>
      <ModelSelectorTrigger asChild>
        <PromptInputButton className="w-24">
          {selectedModel && (
            <ModelSelectorName>{selectedModel}</ModelSelectorName>
          )}
        </PromptInputButton>
      </ModelSelectorTrigger>

      <ModelSelectorContent>
        <ModelSelectorInput placeholder="Search models..." />

        <ModelSelectorList>
          <ModelSelectorEmpty>No models found.</ModelSelectorEmpty>

          <ModelSelectorGroup heading={"AI model"} key={"AI model"}>
            {Object.values(GroqChatModelId).map((model) => (
              <ModelItem
                isSelected={selectedModel === model}
                key={model}
                m={{
                  chef: "OpenAI",
                  chefSlug: "openai",
                  id: model,
                  name: model,
                  providers: ["openai"],
                }}
                onSelect={handleModelSelect}
              />
            ))}
          </ModelSelectorGroup>
        </ModelSelectorList>
      </ModelSelectorContent>
    </ModelSelector>
  );
};

export default ChatbotModelSelector;
