export type OTelAttributes = Record<string, string | number | boolean>;

export interface OTelEvent {
  name: string;
  attributes?: OTelAttributes;
}

export const createOtelEvent = (event: OTelEvent): OTelEvent => event;
