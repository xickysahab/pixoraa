import useWorldTime from '../../common/use_world_time';

/**
 * The three studio cities, each with its live local time.
 *
 * This replaces the floating clock widget: it lives inside chrome that
 * already exists, so it can never collide with the scroll cue or the
 * footer the way a fixed overlay did. Times are hidden below 80rem,
 * where the header runs out of room and the cities alone still read.
 */
export default function LocationTag() {
  const times = useWorldTime();

  return (
    <div className="loc">
      <span className="loc__dot" aria-hidden="true" />
      <ul className="loc__list">
        {times.map((z) => (
          <li className="loc__item" key={z.id}>
            <span className="loc__city">{z.city}</span>
            <time className="loc__time">{z.time}</time>
          </li>
        ))}
      </ul>
    </div>
  );
}
