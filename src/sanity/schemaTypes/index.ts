import { type SchemaTypeDefinition } from "sanity";

import { siteSettings } from "./siteSettings";
import { service } from "./service";
import { packageType } from "./packageType";
import { addOn } from "./addOn";
import { stay } from "./stay";
import { testimonial } from "./testimonial";
import { aboutContent } from "./aboutContent";
import { policiesContent } from "./policiesContent";
import { homeContent } from "./homeContent";
import { insurancePage } from "./insurancePage";
import { businessSetupPage } from "./businessSetupPage";
import { post } from "./post";
import { contentSection } from "./contentSection";
import { linkRef } from "./linkRef";

export const schemaTypes: SchemaTypeDefinition[] = [
  // documents
  siteSettings,
  homeContent,
  service,
  packageType,
  addOn,
  stay,
  testimonial,
  aboutContent,
  policiesContent,
  insurancePage,
  businessSetupPage,
  post,
  // objects
  contentSection,
  linkRef,
];
