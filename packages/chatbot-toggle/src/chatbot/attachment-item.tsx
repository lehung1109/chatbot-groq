import {
  Attachment,
  AttachmentPreview,
  AttachmentRemove,
  AttachmentData,
} from "../../../../components/ai-elements/attachments";
import { useCallback } from "react";

const AttachmentItem = ({
  attachment,
  onRemove,
}: {
  attachment: AttachmentData;
  onRemove: (id: string) => void;
}) => {
  const handleRemove = useCallback(() => {
    onRemove(attachment.id);
  }, [onRemove, attachment.id]);

  return (
    <Attachment data={attachment} onRemove={handleRemove}>
      <AttachmentPreview />
      <AttachmentRemove />
    </Attachment>
  );
};

export default AttachmentItem;
