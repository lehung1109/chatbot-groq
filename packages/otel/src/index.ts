import { resourceFromAttributes } from "@opentelemetry/resources";
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";

const resources = resourceFromAttributes({
  [ATTR_SERVICE_NAME]: "yourServiceName",
  [ATTR_SERVICE_VERSION]: "1.0",
});

console.dir(resources);
