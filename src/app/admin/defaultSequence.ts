import type { SeqStep } from "./types";

/** Nurture sequence every new lead enters automatically. */
export const defaultSequence: SeqStep[] = [
  {
    id: "s1",
    dayOffset: 0,
    subject: "Your Shoulder to Shoulder application",
    body: "Hi {name},\n\nThanks for applying to Shoulder to Shoulder — I review every application personally, and yours is in front of me now.\n\nWhile you wait: the club exists for one reason. Alone you grow linearly; together you grow exponentially. A circle of 6–8 founders at your level, one hour a week, plus the dinners, side quests and Summits.\n\nI'll come back to you personally within a few days.\n\nShoulder to shoulder,\nLennart",
  },
  {
    id: "s2",
    dayOffset: 14,
    subject: "What the fastest-growing founders have in common",
    body: "Hi {name},\n\nA thought since your application: every founder knows the on-fire weeks and the stuck weeks. The difference between fast and slow growth is rarely talent — it's the room you're in.\n\nThe founders growing fastest collaborate with people who've been there, solve problems before they cost weeks, and hear opportunities before the rest of the world.\n\nThat's what the circles are built for. If you want to move your application forward, reply to this email and we'll plan your Founder Fit Conversation.\n\nLennart",
  },
  {
    id: "s3",
    dayOffset: 30,
    subject: "One question",
    body: "Hi {name},\n\nOne question, honestly meant: where will your business be in 12 months if nothing changes about who's around you?\n\nIf the answer excites you — great, keep going.\nIf it doesn't: that's exactly the problem Shoulder to Shoulder solves.\n\nThe next circle has a few open places. Reply and we'll talk.\n\nLennart",
  },
];
