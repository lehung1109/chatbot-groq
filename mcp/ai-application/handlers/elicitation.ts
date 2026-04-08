import {
  ElicitRequestFormParams,
  ElicitResult,
} from "@modelcontextprotocol/client";

export const processFormElicitation = async (
  requestParams: ElicitRequestFormParams,
): Promise<ElicitResult> => {
  const properties = requestParams.requestedSchema.properties;
  const required = requestParams.requestedSchema.required;

  return {
    action: "accept",
    content: {
      propertyName: "form",
    },
  };
};
