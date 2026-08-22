/**
 * Entry animations hide their content until they run. That's fine for a
 * real visitor, but it makes the page unverifiable when rAF and
 * IntersectionObserver are paused — background tabs, headless capture,
 * screenshot tooling.
 *
 * Append ?static to the URL in a dev build to render every entry
 * animation in its final state.
 *
 *   http://localhost:5173/?static
 */
export const STATIC_MOTION =
  import.meta.env.DEV &&
  typeof window !== 'undefined' &&
  new URLSearchParams(window.location.search).has('static');

/**
 * Wrap an `initial` prop. Returns `false` in static mode, which tells
 * Motion to mount straight into the animate state.
 */
export function entry(initial) {
  return STATIC_MOTION ? false : initial;
}
