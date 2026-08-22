import { services } from '../../data/services';
import TextSwap from '../../common/text_swap';

/**
 * The sticky index. Two things separate this from a hover-only list:
 *
 *  - it tracks the block actually on screen, so it reads as a position
 *    indicator rather than decoration;
 *  - the entries are real anchors, so the index doubles as navigation
 *    within a section that runs several screens tall.
 *
 * Each entry carries its own number, which is what ties the list to the
 * counter above it and to the numeral burnt into each frame. Without
 * them "01/06" refers to nothing the reader can see.
 */
export default function ServiceIndex({ active }) {
  const total = services.length;

  return (
    <aside className="svc__index" aria-label="Services index">
      <div className="svc__index-head">
        <span className="label">Capabilities</span>
        <span className="svc__counter">
          <em>{String(active + 1).padStart(2, '0')}</em>
          <span className="svc__counter-sep">/</span>
          {String(total).padStart(2, '0')}
        </span>
      </div>

      <ul className="svc__index-list">
        {services.map((s, i) => (
          <li
            key={s.id}
            className={`swap-host svc__index-item ${
              i === active ? 'swap-host--on svc__index-item--on' : ''
            }`}
          >
            <a href={`#service-${s.id}`} aria-current={i === active}>
              <span className="svc__index-num" aria-hidden="true">
                {s.index}
              </span>
              <TextSwap className="svc__index-name">{s.title}</TextSwap>
            </a>
          </li>
        ))}
      </ul>

      <div className="svc__index-foot">
        <span className="label">All six, one team</span>
      </div>
    </aside>
  );
}
