import {
  addElicitation,
  rejectElicitation,
} from "@/mcp/client/elicitation-store";
import {
  ElicitRequestFormParams,
  ElicitResult,
} from "@modelcontextprotocol/client";
import { TransformStream } from "node:stream/web";

export const processFormElicitation = async (
  requestParams: ElicitRequestFormParams,
  transformStream: TransformStream,
): Promise<ElicitResult> => {
  const userMessage = new Promise<ElicitResult>((resolve, reject) => {
    const id = crypto.randomUUID();
    // write data to transform stream, so transform stream can be used as a pipe
    const writableStream = transformStream.writable.getWriter();

    writableStream.write(
      JSON.stringify({
        ...requestParams,
        id,
      }),
    );

    // add elicitation to store
    addElicitation(
      id,
      resolve as (value: unknown) => void,
      reject,
      writableStream,
    );

    setTimeout(() => {
      rejectElicitation(id, new Error("Elicitation timed out"));
    }, 20000);
  });

  return await userMessage;
};
