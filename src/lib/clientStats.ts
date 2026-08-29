// Client counts, supplied by Joanson.
//
// EDIT THESE AS THE NUMBERS CHANGE. This is the only place they live, and the
// home page reads straight from it. Bump a number, redeploy, done.
//
// Deliberately not rounded up or dressed up. "11" is more believable than
// "10+", and a reader can tell the difference. If a number ever stops being
// accurate, change it or take the row out rather than leaving it to drift.
//
// `asOf` shows on the page so the figures are dated rather than open-ended.
// Update it whenever you update a count.

export type ClientStat = {
  value: number;
  label: string;
};

export const CLIENT_STATS_AS_OF = "August 2026";

export const CLIENT_STATS: ClientStat[] = [
  { value: 11, label: "helped to visit" },
  { value: 3, label: "moved for work" },
  { value: 1, label: "gone to study" },
];
