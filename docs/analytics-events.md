# Conversion events

## Current state

**No analytics provider is installed on this site.** There is no Google
Analytics, Tag Manager, Plausible, Fathom or similar tag anywhere in the
codebase, and no measurement ID in the environment.

The site still fires named conversion events through `src/lib/analytics.ts`.
That module pushes to whichever tag is present on the page and silently does
nothing when none is. Nothing is being recorded today, and nothing is being
sent to any third party.

## Turning it on

Add one provider and every event below starts reporting, with no further code
changes:

- **Google Tag Manager or GA4 via gtag.js** — events arrive as GA4 events with
  their properties intact, and also on `window.dataLayer`.
- **Plausible** — events arrive as custom events with props.
- **Fathom** — events arrive by name; Fathom does not take properties.

Two things to settle before switching one on, because the privacy policy on
this site already commits to them: the cookie/consent position for analytics
cookies, and whether the chosen provider needs a consent banner. Plausible and
Fathom are cookieless, which avoids that question entirely.

## Events

| Event | Fires when | Properties |
| --- | --- | --- |
| `whatsapp_click` | Any WhatsApp link is clicked | `location` |
| `phone_click` | Any `tel:` link is clicked | `location` |
| `email_click` | Any `mailto:` link is clicked | `location` |
| `form_start` | First keystroke or selection in a form, once per form | `form` |
| `form_submit` | A form passes validation and submits | `form`, plus form-specific fields |
| `consultation_click` | A Move Planning Consultation CTA is clicked | `location` |
| `guide_cta_click` | The paid-service CTA on a guide is clicked | `location` |
| `pathway_complete` | The Find My Pathway form is completed | `purpose`, `from`, `to`, `timeframe` |

### Property values

- `location` — where on the site the click happened, for example `hero`,
  `footer`, `guide-cta`, `services-consultation`, `country-page`.
- `form` — which form, for example `pathway`, `plan-my-move`, `contact`,
  `job-offer`, `job-seeker`.
- `purpose` — `visit`, `work`, `study` or `relocate`.

No event carries a name, email, phone number or any other personal detail.
Only the categorical answers above are sent, so switching a provider on does
not start exporting customer data.

## Adding a new event

1. Add the name to the `AnalyticsEvent` union in `src/lib/analytics.ts`.
2. Add a row to the table above.
3. Call `track("your_event", { ... })` at the point it happens.

Keep the union and this table in step. The union is the single source of truth
for what names are valid.
