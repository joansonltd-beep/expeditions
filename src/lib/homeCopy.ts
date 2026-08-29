// Two home-page blocks held in code rather than the CMS.
//
// "Who this is for" is drawn from the situations people actually arrive with,
// so it should only change when the business changes, not on a copy whim.
// "What we decide / what we do not" is the line between guidance and somebody
// else's decision, which is the most legally sensitive sentence on the site.
// Both belong with serviceTiers.ts rather than in Studio.

// Real situations, in the customer's own framing. Nothing here claims an
// outcome; each one is a description of a problem people turn up with.
export const WHO_THIS_IS_FOR: string[] = [
  "You have a job offer in another CARICOM country and you are not sure what has to happen before you can take it up.",
  "You have been accepted on a course, or you are still choosing one, and the permit and the travel are now the problem.",
  "Somebody told you to get a Skills Certificate and you do not know what that is or where to apply.",
  "You are going to see family, or going for a short trip, and you would rather someone else handled the arrangements.",
  "You started the process yourself, got stuck, and want someone to untangle it.",
];

export const WE_DO: string[] = [
  "Explain what your destination asks for, and which office handles it",
  "Work out what order things have to happen in",
  "Check your documents over before you hand anything in",
  "Book the flights, the stay and the transfers",
  "Tell you where people usually come unstuck",
];

export const THEY_DECIDE: string[] = [
  "Whether you get a Skills Certificate, a visa or a permit",
  "Whether a school takes you, and whether an employer hires you",
  "Whether a bank opens your account",
  "Whether immigration lets you in, and for how long",
  "What the fees are and how long any of it takes",
];
