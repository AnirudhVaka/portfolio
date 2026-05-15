/**
 * TimeChamp — fourth in the projects list. Existing layered architecture
 * preserved + polished per brief: 99.9% uptime metric prominent, 100+
 * containers + 15+ nodes + Dell PowerEdge specifics, $0 cloud spend
 * for on-prem workloads.
 */
export function TimeChampCard() {
  return (
    <article className="project-card" id="timechamp" data-reveal>
      <div className="project-head">
        <span className="project-tag amber mono">Bare-metal infra · Production</span>
        <h2 className="project-title">TimeChamp On-Prem Infrastructure</h2>
      </div>
      <p className="project-tagline">
        Production Kubernetes data center built from bare metal at CtrlS
        Hyderabad. Two years at 99.9% uptime.
      </p>

      <div className="project-body">
        <p>
          <strong>The problem.</strong> TimeChamp's existing platform was a
          Windows monolith on IIS, deployed by hand, with no observability and
          unpredictable cloud spend. Customer growth was capped by release
          velocity and on-call burden.
        </p>
        <p>
          <strong>The approach.</strong> Architected and built a full on-prem
          Kubernetes data center from bare metal — racked Dell PowerEdge
          servers at CtrlS Hyderabad, designed VLAN segmentation, configured
          FortiGate 200F + IPSec VPN with dual-ISP failover. Migrated the
          monolith to Docker + Kubernetes (~15 nodes, 100+ containers on
          Hyper-V). Deployed Prometheus + Grafana + Loki for observability,
          200+ Azure DevOps pipelines for CI/CD, Cloudflare WAF + CDN at the
          edge.
        </p>
        <p>
          <strong>The outcome.</strong> 99.9% uptime over two years. Release
          cycle cut ~60% with zero-downtime deployments. $0 cloud spend for
          on-prem workloads — only burst traffic goes to AWS / Azure.
        </p>
      </div>

      <div className="infra-layers">
        <div className="infra-layer l-physical">
          <div className="layer-header">
            <span className="layer-label">Physical Layer</span>
            <span className="layer-location">CtrlS Hyderabad</span>
          </div>
          <div className="layer-pills">
            <span className="layer-pill">Dell PowerEdge servers</span>
            <span className="layer-pill">FortiGate 200F</span>
            <span className="layer-pill">IPSec VPN + dual-ISP</span>
            <span className="layer-pill">Cisco VLAN segmentation</span>
          </div>
        </div>
        <div className="layer-connector">
          <div className="layer-connector-line">
            <div className="layer-connector-dot" />
          </div>
        </div>
        <div className="infra-layer l-orch">
          <div className="layer-header">
            <span className="layer-label">Orchestration Layer</span>
            <span className="layer-location">~15 nodes · 100+ containers</span>
          </div>
          <div className="layer-pills">
            <span className="layer-pill">Kubernetes</span>
            <span className="layer-pill">Hyper-V</span>
            <span className="layer-pill">Docker</span>
            <span className="layer-pill">Helm</span>
          </div>
        </div>
        <div className="layer-connector">
          <div className="layer-connector-line">
            <div className="layer-connector-dot" style={{ animationDelay: "0.6s" }} />
          </div>
        </div>
        <div className="infra-layer l-obs">
          <div className="layer-header">
            <span className="layer-label">Observability Layer</span>
            <span className="layer-location">metrics · logs · alerts</span>
          </div>
          <div className="layer-pills">
            <span className="layer-pill">Prometheus</span>
            <span className="layer-pill">Grafana</span>
            <span className="layer-pill">Loki</span>
          </div>
        </div>
        <div className="layer-connector">
          <div className="layer-connector-line">
            <div className="layer-connector-dot" style={{ animationDelay: "1.2s" }} />
          </div>
        </div>
        <div className="infra-layer l-cicd">
          <div className="layer-header">
            <span className="layer-label">CI/CD + Edge</span>
            <span className="layer-location">automation · security</span>
          </div>
          <div className="layer-pills">
            <span className="layer-pill">Azure DevOps · 200+ pipelines</span>
            <span className="layer-pill">Cloudflare WAF + CDN</span>
            <span className="layer-pill">DR Validator (C# + AWS S3)</span>
          </div>
        </div>
      </div>

      <ul className="project-decisions">
        <li>
          <strong>On-prem over cloud-native</strong>
          Datacenter colo at CtrlS — predictable cost at scale, full network
          + storage control, regulatory comfort for customer data.
        </li>
        <li>
          <strong>Hyper-V under K8s</strong>
          Hyper-V for the hypervisor — leverages the team's existing
          Microsoft expertise and licensing while K8s does the orchestration.
        </li>
        <li>
          <strong>Network HA</strong>
          FortiGate 200F + IPSec VPN + dual-ISP failover — verified by
          pulling the live ISP cable. Zero customer impact.
        </li>
        <li>
          <strong>DR Validator</strong>
          Custom tool in C# / .NET — restores every MS SQL backup to a
          throwaway instance daily, alerts on silent corruption.
        </li>
      </ul>

      <div className="project-metrics">
        <span className="metric">
          <strong>99.9%</strong> uptime · 2 years
        </span>
        <span className="metric">
          <strong>100+</strong> containers · 15+ nodes
        </span>
        <span className="metric">
          <strong>$0</strong> cloud spend for on-prem workloads
        </span>
      </div>

      <div className="project-stack">
        <span>Kubernetes</span>
        <span>Docker</span>
        <span>Hyper-V</span>
        <span>FortiGate</span>
        <span>Cisco</span>
        <span>Prometheus</span>
        <span>Grafana</span>
        <span>Loki</span>
        <span>Azure DevOps</span>
        <span>Cloudflare</span>
        <span>C# / .NET</span>
      </div>
    </article>
  );
}
