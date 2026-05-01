import type { JSONValue } from "ai";
import z from "zod";

/** Converts a loose MCP-style JSON Schema object into a Zod object schema for tool calls */
export function convertToZodSchema(inputSchema: {
  [x: string]: unknown;
  type: "object";
  properties?: Record<string, JSONValue>;
  required?: string[];
}) {
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
