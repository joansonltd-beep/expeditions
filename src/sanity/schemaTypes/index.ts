import { type SchemaTypeDefinition } from "sanity";

import { siteSettings } from "./siteSettings";
import { service } from "./service";
import { packageType } from "./packageType";
import { stay } from "./stay";
import { testimonial } from "./testimonial";
import { aboutContent } from "./aboutContent";
import { policiesContent } from "./policiesContent";
import { contentSection } from "./contentSection";
import { linkRef } from "./linkRef";

export const schemaTypes: SchemaTypeDefinition[] = [
  // documents
  siteSettings,
  service,
  packageType,
  stay,
  testimonial,
  aboutContent,
  policiesContent,
  // objects
  contentSection,
  linkRef,
];
