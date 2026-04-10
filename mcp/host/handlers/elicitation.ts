import {
  addElicitation,
  rejectElicitation,
} from "@/mcp/client/elicitation-store";
import {
  ElicitRequestFormParams,
  ElicitResult,
} from "@modelcontextprotocol/client";
import { UIMessageStreamWriter } from "ai";

export const processFormElicitation = async (
  requestParams: ElicitRequestFormParams,
  writer: UIMessageStreamWriter,
): Promise<ElicitResult> => {
  console.log("Processing form elicitation in host...");

  console.log("Writing elicitation to writer");
  writer.write({
    type: "data-elicitation",
    data: {
      ...requestParams,
    },
  });
  console.log("Elicitation written to writer");

  console.log("Create request elicitation promise to user");
  const requestElicitation = new Promise<ElicitResult>((resolve, reject) => {
    const id = crypto.randomUUID();

    // add elicitation to store
    console.log("Adding elicitation to store...");
    addElicitation(id, resolve, reject);
    console.log("Elicitation added to store");

    setTimeout(() => {
      rejectElicitation(id, new Error("Elicitation timed out"));
    }, 60000);
  });

  console.log("Wait for user response");
  const userResponse = await requestElicitation;
  console.log("User response received ", userResponse);

  return userResponse;
};
