import { useCallback } from "react";
import { Attachments } from "../../../../components/ai-elements/attachments";
import AttachmentItem from "./attachment-item";
import { usePromptInputAttachments } from "../../../../components/ai-elements/prompt-input";

const PromptInputAttachmentsDisplay = () => {
  const attachments = usePromptInputAttachments();

  const handleRemove = useCallback(
    (id: string) => {
      attachments.remove(id);
    },
    [attachments],
  );

  if (attachments.files.length === 0) {
    return null;
  }

  return (
    <Attachments variant="inline">
      {attachments.files.map((attachment) => (
        <AttachmentItem
          attachment={attachment}
          key={attachment.id}
          onRemove={handleRemove}
        />
      ))}
    </Attachments>
  );
};

export default PromptInputAttachmentsDisplay;
