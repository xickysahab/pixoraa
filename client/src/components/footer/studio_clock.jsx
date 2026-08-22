import useWorldTime from '../../common/use_world_time';

/**
 * The full three-city clock, in the footer's studio column where an
 * address block belongs. Static in flow — nothing to collide with.
 */
export default function StudioClock() {
  const times = useWorldTime();

  return (
    <ul className="fclock">
      {times.map((z) => (
        <li className="fclock__row" key={z.id}>
          <span className="fclock__city">{z.city}</span>
          <span className="fclock__rule" aria-hidden="true" />
          <time className="fclock__time">{z.time}</time>
        </li>
      ))}
    </ul>
  );
}
