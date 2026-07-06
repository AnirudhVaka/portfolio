/**
 * Persistent slim status bar (brief B) — IDE / Grafana style, pinned to the
 * bottom. Reinforces the "control plane" theme. Server component, static copy.
 * body:has(.status-bar) reserves space so it never covers the footer.
 */
export function StatusBar() {
  return (
    <div className="status-bar" role="status" aria-label="Availability status">
      <div className="sb-group">
        <span className="sb-item sb-ok">
          <span className="sb-dot" aria-hidden="true" /> Available
        </span>
        <span className="sb-sep" aria-hidden="true">·</span>
        <span className="sb-item sb-hide-sm">Senior DevOps / Platform / SRE</span>
      </div>
      <div className="sb-group">
        <span className="sb-item">IST (UTC+5:30)</span>
        <span className="sb-sep" aria-hidden="true">·</span>
        <span className="sb-item">replies &lt; 24h</span>
        <span className="sb-sep sb-hide-sm" aria-hidden="true">·</span>
        <span className="sb-item sb-hide-sm sb-ok">all systems operational</span>
      </div>
    </div>
  );
}
