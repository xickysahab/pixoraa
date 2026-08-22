/**
 * Overlapping initial-chips plus a "You?" slot.
 * Initials stand in until real client photos land in assets/images/hero.
 */
const CLIENTS = [
  { id: 'a', initials: 'RM', tone: 1 },
  { id: 'b', initials: 'SK', tone: 2 },
  { id: 'c', initials: 'AV', tone: 3 },
  { id: 'd', initials: 'JD', tone: 4 },
];

export default function ClientAvatars() {
  return (
    <div className="avatars">
      <ul className="avatars__list">
        {CLIENTS.map((c) => (
          <li key={c.id} className={`avatars__item avatars__item--${c.tone}`}>
            <span aria-hidden="true">{c.initials}</span>
          </li>
        ))}
        <li className="avatars__item avatars__item--you">
          <span>You?</span>
        </li>
      </ul>
      <span className="visually-hidden">
        Trusted by over one hundred clients.
      </span>
    </div>
  );
}
