/**
 * RESUME DATA — single source of truth for both portfolio + /resume.
 *
 * Every region's renderer (IN, US, DE, NL, IE, UK, CA, SG, ANZ, Global)
 * reads from this file. One change here updates all variants, the
 * pre-built PDFs (via print-CSS at build time), and the pre-built DOCX
 * files (via scripts/build-docx.mjs).
 *
 * Editing rules:
 *   - Numbers must be CONSISTENT across the file. 99.9% uptime, 200+
 *     pipelines, 60% faster, 25% cost cut, 70% release error reduction
 *     — these appear in multiple places and must always agree.
 *   - Use the strongest, region-neutral phrasing here. Per-region
 *     softening (e.g. British spelling on UK) is applied in the
 *     renderer, not here.
 *   - Bullets are quantified: every line should answer "what changed?".
 */

export interface ContactBlock {
  name: string;
  title: string;
  email: string;
  phone: string;
  /** Just the host+path, no scheme. The renderer adds https://. */
  linkedin: string;
  github: string;
  portfolio: string;
  baseCity: string; // "Hyderabad, India" — used as default; renderers may override.
}

export interface ExperienceBullet {
  text: string;
  /**
   * If true, this bullet is high-signal — kept on short variants (US 1-page).
   * If false, it's "nice to have" — dropped from compact variants, kept on
   * longer ones (IN/DE/UK/IE 2-page).
   */
  priority: "core" | "extra";
}

export interface ExperienceEntry {
  id: string;
  title: string;
  company: string;
  clientContext?: string; // e.g. "London-based enterprise SaaS client"
  dates: string; // human-formatted; renderers don't reparse.
  location: string;
  mode: "On-site" | "Hybrid" | "Remote";
  bullets: ExperienceBullet[];
}

export interface SideProject {
  id: string;
  name: string;
  url: string;
  role: string;
  dates: string;
  tagline: string;
  /** ~2-3 sentence description for the resume. Portfolio gets a richer copy. */
  resumeBlurb: string;
  stack: string[];
  metrics?: string; // e.g. "20+ paying users"
  engineeringWriteupUrl?: string;
}

export interface SkillsGroup {
  /** Used on the resume's two-column skills list and on the portfolio constellation. */
  label: string;
  items: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  location: string;
  dates: string;
  cgpa: string; // include only on IN + SG variants
}

export interface SpokenLanguage {
  name: string;
  level: string; // e.g. "C1 (Advanced Professional)", "Native", "Fluent"
}

export interface ResumeData {
  contact: ContactBlock;
  summary: string;
  experience: ExperienceEntry[];
  sideProjects: SideProject[];
  skills: SkillsGroup[];
  education: EducationEntry;
  languages: SpokenLanguage[];
  noticePeriod: string; // surfaced only on IN + SG variants
}

export const resume: ResumeData = {
  contact: {
    name: "Anirudh Vaka",
    title: "Senior DevOps / Platform / SRE Engineer · AI Infrastructure & LLMOps",
    email: "anirudhvaka@gmail.com",
    phone: "+91 79817 30312",
    linkedin: "linkedin.com/in/anirudhvaka",
    github: "github.com/AnirudhVaka",
    portfolio: "anirudhvaka.dev",
    baseCity: "Hyderabad, India",
  },

  summary:
    "Senior DevOps / Platform / SRE engineer with 3+ years operating production infrastructure across AWS, Azure, and on-prem Kubernetes — including building an on-prem Kubernetes data center from bare metal at 99.9% uptime for 1000+ customers. Promoted intern → DevOps Lead in under two years; now lead a team of 5 under an ISO 27001:2022-certified practice. Founder of two live AI SaaS products (PrepAtlas, HumanifyCV) with paying users. Strong on Terraform, Kubernetes, GitHub Actions, GitOps, and FinOps — plus a self-hosted LLM platform (Ollama, grounded RAG on pgvector) and an AI-in-SDLC auto-remediation pipeline that cuts MTTR.",

  experience: [
    {
      id: "aicpa",
      title: "Senior DevOps Engineer — AICPA & CIMA Enterprise Platform",
      company: "Snovasys Software Solutions Ltd",
      clientContext: "London-based enterprise SaaS client",
      dates: "Nov 2024 – Present",
      location: "Remote",
      mode: "Remote",
      bullets: [
        {
          text: "Led enterprise migration to GitHub Enterprise with label-driven GitOps workflows — reduced release errors ~70%.",
          priority: "core",
        },
        {
          text: "Engineered PR-based ephemeral environments provisioning full AWS stacks (ECS, RDS, S3, SQS, SNS) via Terraform — cut setup time from days to minutes.",
          priority: "core",
        },
        {
          text: "Architected multi-region AWS deployment with Route 53 latency routing and active-active failover for global availability.",
          priority: "core",
        },
        {
          text: "Built DevSecOps guardrails with Trivy + Grype shift-left container scanning across 200+ CI/CD pipelines.",
          priority: "core",
        },
        {
          text: "Established observability and ChatOps (CloudWatch, Athena, Grafana, MS Teams) — reduced incident MTTR significantly.",
          priority: "extra",
        },
        {
          text: "Integrated ServiceNow REST APIs to automate change-management — CRs open/close in lockstep with deployments, eliminating manual ticket toil.",
          priority: "extra",
        },
      ],
    },
    {
      id: "timechamp-lead",
      title: "DevOps Lead — TimeChamp SaaS Platform",
      company: "Snovasys Software Solutions Ltd",
      dates: "Oct 2024 – Present",
      location: "Hyderabad, India",
      mode: "Hybrid",
      bullets: [
        {
          text: "Promoted to Lead Oct 2024; running concurrently with the AICPA engagement.",
          priority: "extra",
        },
        {
          text: "Operate production on-prem Kubernetes cluster at 99.9% uptime — ~15 nodes, 100+ containers on Hyper-V at CtrlS Hyderabad data center.",
          priority: "core",
        },
        {
          text: "Lead a team of 5 DevOps engineers; own architecture decisions, sprint planning, and on-call rotation.",
          priority: "core",
        },
        {
          text: "Manage hybrid cloud workloads across AWS + Azure (AKS, VMSS, Blob Storage, Functions, Entra ID, Key Vault) with optimized backup and DR for SQL Server + PostgreSQL.",
          priority: "core",
        },
        {
          text: "Drove ~25% monthly cloud cost reduction through FinOps — right-sizing, Reserved Instances / Savings Plans, biweekly cost reviews, and weekend scale-to-zero automation that idles all non-prod every Friday and restores it Monday.",
          priority: "core",
        },
        {
          text: "Built an internal AI platform on the on-prem cluster — self-hosted open LLMs (Ollama: DeepSeek, Qwen), grounded RAG on pgvector, and an AI-in-SDLC auto-remediation pipeline (detect → diagnose → generate fix → PR → gated QA) that cut MTTR.",
          priority: "extra",
        },
        {
          text: "Designed corporate network: dual-ISP + SD-WAN on FortiGate 60F (active-active failover) — 99.9% office network uptime.",
          priority: "extra",
        },
      ],
    },
    {
      id: "timechamp-engineer",
      title: "DevOps Engineer — TimeChamp SaaS Platform",
      company: "Snovasys Software Solutions Ltd",
      dates: "May 2023 – Sep 2024",
      location: "Hyderabad, India",
      mode: "On-site",
      bullets: [
        {
          text: "Built production on-prem data center at CtrlS Hyderabad from bare metal — racked Dell PowerEdge servers, designed VLAN segmentation, configured FortiGate 200F with IPSec VPN and dual-ISP failover.",
          priority: "core",
        },
        {
          text: "Led platform transformation from monolithic IIS to Docker + Kubernetes — cut release cycle time ~60% with zero-downtime deployments.",
          priority: "core",
        },
        {
          text: "Implemented Cloudflare edge security (WAF, CDN, DNS, SSL/TLS) for production workloads.",
          priority: "core",
        },
        {
          text: "Migrated legacy CI/CD (TeamCity, Octopus Deploy) to Azure DevOps — 200+ pipelines across product lines.",
          priority: "core",
        },
        {
          text: "Built DR Validator — automated MS SQL backup + DR verification in C# / .NET with AWS S3 and PowerShell — eliminated silent backup failures.",
          priority: "extra",
        },
        {
          text: "Deployed centralized observability stack (Prometheus, Grafana, Loki) for logging, metrics, and alerting across the cluster.",
          priority: "extra",
        },
      ],
    },
    {
      id: "intern",
      title: "Software Engineer Intern",
      company: "Snovasys Software Solutions Ltd",
      dates: "Jan 2023 – Apr 2023",
      location: "Hyderabad, India",
      mode: "On-site",
      bullets: [
        {
          text: "Built REST APIs in C# / .NET for internal product features.",
          priority: "extra",
        },
        {
          text: "Built HTML/CSS landing pages for product launches.",
          priority: "extra",
        },
        {
          text: "Rotated through support engineering; selected for full-time conversion to DevOps Engineer based on infrastructure work during the rotation.",
          priority: "extra",
        },
      ],
    },
  ],

  sideProjects: [
    {
      id: "prepatlas",
      name: "PrepAtlas",
      url: "https://prepatlas.in",
      role: "Founder & Engineer",
      dates: "Dec 2025 – Present",
      tagline:
        "AI learning + career platform — tutor, adaptive practice, exam engine, role tracks",
      resumeBlurb:
        "AI learning and career platform for Indian students — an AI tutor teaching over chat, voice, and generated video, adaptive practice, a timed exam engine, and 13 role-based career tracks with mock interviews and JD analysis. Next.js 15 on self-hosted PocketBase with a provider-routed LLM layer (Claude, NVIDIA) behind a per-user token budget and schema-validated output; offline-capable PWA and Android TWA on a $35/month AWS stack, 20+ paying users in beta.",
      stack: [
        "Next.js 15",
        "React 19",
        "TypeScript",
        "Tailwind",
        "shadcn/ui",
        "PocketBase (self-hosted)",
        "Anthropic Claude API",
        "NVIDIA API",
        "Razorpay",
        "Resend",
        "Sentry",
        "AWS EC2",
        "nginx",
        "Bubblewrap TWA",
      ],
      metrics: "20+ paying users in beta · $35/mo hosting",
      // engineeringWriteupUrl: the prepatlas.in/engineering writeup was
      // taken down — the card's deep-dive CTA hides itself while this is unset.
    },
    {
      id: "humanifycv",
      name: "HumanifyCV",
      url: "https://humanifycv.com",
      role: "Founder & Engineer",
      dates: "Jan 2026 – Present",
      tagline:
        "AI career workspace — a verified career vault that generates, tailors, and ATS-checks resumes",
      resumeBlurb:
        "AI career workspace built on a structured Career Vault — verified experience stored once, with AI generation, humanisation, and JD tailoring reading from it rather than inventing history, plus ATS analysis, cover letters, and a multi-tenant console for colleges. Next.js 16 + Prisma/Postgres with NextAuth v5 (TOTP 2FA over AES-256-GCM secrets, WebAuthn passkeys), Razorpay, and a multi-model Claude router, deployed by GitHub Actions to Docker Compose on AWS EC2 behind Cloudflare; 30–40 paying users.",
      stack: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Postgres + Prisma 7",
        "NextAuth v5",
        "WebAuthn passkeys",
        "TOTP 2FA",
        "Anthropic Claude (multi-model router)",
        "Razorpay",
        "AWS EC2 + Docker Compose",
        "Amazon SES SMTP (Nodemailer)",
        "Cloudflare",
        "GitHub Actions",
        "Sentry",
        "Jest + Testing Library",
      ],
      metrics: "30–40 paying users",
      // engineeringWriteupUrl: pending — surface as "coming soon" disabled CTA.
    },
  ],

  skills: [
    {
      label: "Cloud (AWS & Azure)",
      items: [
        "AWS (ECS, EKS, RDS, Lambda, S3, Route 53, IAM, multi-region)",
        "Azure (AKS, VMs / VMSS, Blob Storage, Functions)",
        "Entra ID + Key Vault",
        "Azure OpenAI + Azure Speech",
        "On-prem (Hyper-V, bare-metal Kubernetes)",
        "GCP (fundamentals)",
      ],
    },
    {
      label: "Containers & Orchestration",
      items: [
        "Kubernetes (production, on-prem + cloud)",
        "Docker",
        "Helm",
        "Kustomize",
        "ArgoCD",
        "Horizontal Pod Autoscaling",
        "Ingress",
        "Network policies",
        "Admission control",
      ],
    },
    {
      label: "IaC",
      items: ["Terraform", "AWS CDK", "Ansible"],
    },
    {
      label: "CI/CD & GitOps",
      items: [
        "GitHub Actions",
        "GitLab CI",
        "Jenkins",
        "Azure DevOps",
        "ArgoCD",
        "OPA (policy-as-code)",
      ],
    },
    {
      label: "AI Infrastructure",
      items: [
        "Ollama (self-hosted LLMs)",
        "DeepSeek / Qwen",
        "RAG on pgvector",
        "Anthropic Claude API (router: prompt caching, vision)",
        "Prompt engineering",
        "AI-in-SDLC auto-remediation",
      ],
    },
    {
      label: "Web & Caching",
      items: ["Nginx", "Redis", "AWS API Gateway", "CloudFront"],
    },
    {
      label: "Networking & Security",
      items: [
        "Linux",
        "Windows Server (IIS, Hyper-V, MS SQL)",
        "Cisco switches",
        "FortiGate (firewall, VPN, SD-WAN)",
        "IDS / IPS",
        "VLAN segmentation",
        "Cloudflare WAF",
        "OIDC / IAM",
        "TLS",
        "Trivy / Grype",
        "SonarQube",
        "ISO 27001:2022 / SOC 2-aligned",
      ],
    },
    {
      label: "Databases",
      items: [
        "PostgreSQL",
        "Supabase",
        "MS SQL Server",
        "MySQL",
        "AWS RDS",
        "DynamoDB",
      ],
    },
    {
      label: "Observability & SRE",
      items: [
        "Prometheus",
        "Grafana",
        "CloudWatch",
        "Sentry",
        "Loki",
        "OpenSearch",
        "ELK",
        "SLOs / error budgets",
        "Incident response & RCA",
        "On-call rotation",
      ],
    },
    {
      label: "Languages & Frameworks",
      items: [
        "TypeScript",
        "Python",
        "Go",
        "C# (.NET)",
        "Bash",
        "PowerShell",
        "SQL",
        "Angular",
      ],
    },
  ],

  education: {
    degree: "B.Tech, Computer Science & Engineering",
    institution: "PBR Visvodaya Institute of Technology and Science",
    location: "Andhra Pradesh, India",
    dates: "2019 – 2023",
    cgpa: "8.3 / 10",
  },

  languages: [
    { name: "English", level: "C1 (Advanced Professional)" },
    { name: "Telugu", level: "Native" },
    { name: "Hindi", level: "Fluent" },
  ],

  noticePeriod: "Serving notice — last working day 22 Oct 2026",
};
