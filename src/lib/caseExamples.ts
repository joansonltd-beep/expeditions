// Anonymised customer situations for the home page.
//
// EMPTY ON PURPOSE. Nothing here is invented, and nothing should be added
// without Joanson confirming it happened and the client agreeing to it being
// used, even anonymised.
//
// When the site has none, the home page renders a labelled placeholder that is
// visible only in development, so the gap is obvious to whoever edits the site
// and invisible to visitors. Add one entry here and the real section appears.
//
// Rules for anything added:
//   - No names, and no detail specific enough to identify someone.
//   - `question` should be the customer's actual question, in their words.
//   - `support` is what we did. Never what the authority decided.
//   - `next` is the step that followed. Never an outcome, never an approval,
//     and never "and they got the job".

export type CaseExample = {
  from: string; // starting point
  to: string; // intended destination
  question: string; // the main question they arrived with
  support: string; // the kind of support given
  next: string; // the step that followed
};

export const CASE_EXAMPLES: CaseExample[] = [];
