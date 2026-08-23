export const processIntro = {
  label: 'How we work',
  headline: 'How we guide every project to the finish line.',
  body: 'Each phase is handled by specialists who work together seamlessly, ensuring nothing falls through the cracks.',
};

/**
 * `duration` and `deliverable` are the two things a client actually asks
 * — how long, and what do I get — and the two things every competitor
 * we checked leaves out. Placeholder values: replace with Pixoraa's real
 * timings before launch.
 *
 * `id` also keys the phase photograph in data/media.js.
 */
export const processSteps = [
  {
    id: 'discovery',
    num: '001',
    title: 'Discovery',
    blurb: 'We listen first — no jargon.',
    detail:
      'A working session, an audit of what you already have, and a written read of the problem. You get that document whether or not we go further.',
    duration: '1 week',
    deliverable: 'Written brief + audit',
  },
  {
    id: 'strategy',
    num: '002',
    title: 'Strategy',
    blurb: 'We create a comprehensive roadmap for success.',
    detail:
      'Positioning, audience, and a scope with real dates. Nothing moves into production before this is signed off.',
    duration: '1–2 weeks',
    deliverable: 'Scope + dated plan',
  },
  {
    id: 'creation',
    num: '003',
    title: 'Creation',
    blurb: 'We build your assets with precision.',
    detail:
      'Shoot days, design, and build run together, reviewed weekly. You see work in progress, not a reveal at the end.',
    duration: '3–6 weeks',
    deliverable: 'Final assets + source files',
  },
  {
    id: 'launch',
    num: '004',
    title: 'Launch',
    blurb: 'We ensure a smooth deployment.',
    detail:
      'Staging, QA across devices, analytics wired, and a handover your team can actually operate.',
    duration: '1 week',
    deliverable: 'Live build + handover doc',
  },
  {
    id: 'growth',
    num: '005',
    title: 'Growth',
    blurb: 'We continuously optimise performance.',
    detail:
      'Monthly reporting against the numbers we agreed at strategy — and the changes we recommend because of them.',
    duration: 'Ongoing',
    deliverable: 'Monthly report + actions',
  },
];

export const processContact = {
  name: 'Jai Chachra',
  role: 'Client Success Manager',
  line: 'Talk to the person who will actually run your project.',
};
