import { useState } from "react";
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
import { PromptInputButton } from "../ai-elements/prompt-input";
import ModelItem from "./model-item";
import { ChatbotActionType, useChatbot } from "@/providers/chatbot-provider";

export interface ChatbotModelSelectorProps {
  chefs: string[];
  models: ModelProps[];
}

export interface ModelProps {
  chef: string;
  chefSlug: string;
  id: string;
  name: string;
  providers: string[];
}

const ChatbotModelSelector = ({ chefs, models }: ChatbotModelSelectorProps) => {
  const [modelSelectorOpen, setModelSelectorOpen] = useState(false);
  const { dispatch, state } = useChatbot();
  const { selectedModel } = state || {};

  const handleModelSelect = (modelId: string) => {
    const selected = models.find((m) => m.id === modelId);

    if (selected) {
      dispatch?.({
        type: ChatbotActionType.SET_SELECTED_MODEL,
        payload: selected,
      });
    }

    setModelSelectorOpen(false);
  };

  return (
    <ModelSelector onOpenChange={setModelSelectorOpen} open={modelSelectorOpen}>
      <ModelSelectorTrigger asChild>
        <PromptInputButton>
          {selectedModel?.chefSlug && (
            <ModelSelectorLogo provider={selectedModel.chefSlug} />
          )}
          {selectedModel?.name && (
            <ModelSelectorName>{selectedModel.name}</ModelSelectorName>
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
                    isSelected={selectedModel?.id === m.id}
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
  );
};

export default ChatbotModelSelector;
