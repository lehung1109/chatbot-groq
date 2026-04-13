import { JSONValue } from "ai";
import { clsx, type ClassValue } from "clsx";
import jsonSchemaToZod, { JsonSchema } from "json-schema-to-zod";
import { twMerge } from "tailwind-merge";
import z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const getErrorMessage = (error: unknown) => {
  if (!error) return null;
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;

  try {
    return JSON.stringify(error);
  } catch {
    return "Unknown error";
  }
};

export function convertToZodSchema(inputSchema: {
  [x: string]: unknown;
  type: "object";
  properties?: Record<string, JSONValue> | undefined;
  required?: string[] | undefined;
}) {
  // Bỏ index signature nếu cần clean
  const { properties } = inputSchema;
  const objectProperties: Record<string, z.ZodType> = {};

  Object.entries(properties || {}).forEach(([key, value]) => {
    if (typeof value === "object" && value !== null) {
      objectProperties[key] = z
        .string()
        .describe((value as { description: string }).description);
    } else {
      objectProperties[key] = z.string().describe(value as string);
    }
  });

  return z.object(objectProperties);
}

export const MCP_SESSION_ID_HEADER = "mcp-session-id";
