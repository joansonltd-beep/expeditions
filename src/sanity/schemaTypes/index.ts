import { type SchemaTypeDefinition } from "sanity";

import { siteSettings } from "./siteSettings";
import { service } from "./service";
import { packageType } from "./packageType";
import { stay } from "./stay";
import { testimonial } from "./testimonial";
import { aboutContent } from "./aboutContent";
import { policiesContent } from "./policiesContent";
import { homeContent } from "./homeContent";
import { insurancePage } from "./insurancePage";
import { post } from "./post";
import { contentSection } from "./contentSection";
import { linkRef } from "./linkRef";

export const schemaTypes: SchemaTypeDefinition[] = [
  // documents
  siteSettings,
  homeContent,
  service,
  packageType,
  stay,
  testimonial,
  aboutContent,
  policiesContent,
  insurancePage,
  post,
  // objects
  contentSection,
  linkRef,
];
