// Draft handling for content entries.
//
// Any content item with `draft: true` is a placeholder that still needs real,
// verified details. Drafts render (with a visible "Draft" badge) during
// `npm start` so you can see the layout, and are stripped from production
// builds so an unverified claim never ships.

export const SHOW_DRAFTS = process.env.NODE_ENV !== 'production';

export function published(items) {
  return SHOW_DRAFTS ? items : items.filter((item) => !item.draft);
}

export function countDrafts(...lists) {
  return lists.flat().filter((item) => item.draft).length;
}
