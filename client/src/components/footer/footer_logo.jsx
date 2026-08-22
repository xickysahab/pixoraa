import { site } from '../../data/site';

/**
 * The oversized wordmark that anchors the page bottom. Purely visual —
 * the accessible company name lives in the footer's meta row.
 */
export default function FooterLogo() {
  return (
    <div className="foot__wordmark" aria-hidden="true">
      <span>Pixoraa</span>
      <span className="foot__wordmark-dim">Digital</span>
      <span className="foot__wordmark-c">©</span>
    </div>
  );
}
