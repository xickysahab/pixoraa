import { hero } from '../../data/site';

/** 4.9/5 — 100+ happy clients. Numbers set in mono, per the type rules. */
export default function RatingBadge() {
  const { score, outOf, clients } = hero.rating;

  return (
    <div className="rating">
      <div className="rating__stars" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} viewBox="0 0 24 24" width="13" height="13">
            <path
              d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z"
              fill="var(--molten)"
            />
          </svg>
        ))}
      </div>
      <p className="rating__text">
        <span className="rating__score">{score}</span>
        <span className="rating__of">/{outOf}</span>
        <span className="rating__div" aria-hidden="true" />
        <span className="rating__clients">{clients} happy clients</span>
      </p>
    </div>
  );
}
