import { SourceUrlUIPart } from "ai";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "../../../../components/ai-elements/sources";

interface ChatbotSourceProps {
  sources: SourceUrlUIPart[];
}

const ChatbotSource = ({ sources }: ChatbotSourceProps) => {
  return (
    <Sources>
      <SourcesTrigger count={sources.length} />

      <SourcesContent>
        {sources.map((source) => (
          <Source href={source.url} key={source.url} title={source.title} />
        ))}
      </SourcesContent>
    </Sources>
  );
};

export default ChatbotSource;
