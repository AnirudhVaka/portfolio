"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AVAILABILITY } from "@/lib/regionCopy";

/**
 * Interactive mini-terminal for the Contact section (brief C2). Accepts typed
 * commands: help, whoami, projects, stack, resume, contact, clear. Command
 * history via ↑/↓. Accessible: labelled input, role="log" + aria-live output.
 *
 * This is progressive enhancement — the `ssh anirudh@connect` footer block
 * remains the static / no-JS fallback.
 */

interface Line {
  id: number;
  cls: "cmd" | "out" | "err";
  node: ReactNode;
}

const PROMPT = "anirudh@portfolio:~$";
const COMMANDS = ["help", "whoami", "projects", "stack", "resume", "contact", "clear"];

let uid = 0;
const line = (cls: Line["cls"], node: ReactNode): Line => ({ id: uid++, cls, node });

export function ContactTerminal() {
  const [history, setHistory] = useState<Line[]>(() => [
    line("out", "anirudh.dev shell — type 'help' to list commands."),
  ]);
  const [value, setValue] = useState("");
  const [recall, setRecall] = useState<string[]>([]);
  const [recallIdx, setRecallIdx] = useState(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history]);

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setRecall((r) => [...r, raw.trim()]);
    setRecallIdx(-1);

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    const echoed = line("cmd", (
      <>
        <span className="term-prompt-sym">{PROMPT}</span> {raw.trim()}
      </>
    ));

    let out: Line[];
    switch (cmd) {
      case "help":
        out = [
          line("out", "Available commands:"),
          line("out", "  help      show this list"),
          line("out", "  whoami    who is Anirudh"),
          line("out", "  projects  what I've shipped"),
          line("out", "  stack     tools I work in"),
          line("out", "  resume    open the region-aware resume"),
          line("out", "  contact   how to reach me"),
          line("out", "  clear     clear the screen"),
        ];
        break;
      case "whoami":
        out = [
          line("out", "Anirudh Vaka — Senior DevOps / Platform / SRE Engineer · AI Infrastructure & LLMOps."),
          line("out", "Leads a team of 5; promoted intern → DevOps Lead in under 2 years."),
          line("out", "99.9% uptime for 1000+ customers. Founder of PrepAtlas + HumanifyCV."),
          line("out", <span className="term-accent">{AVAILABILITY}</span>),
        ];
        break;
      case "projects":
        out = [
          line("out", "• PrepAtlas          AI-grounded exam prep · 20+ paying users"),
          line("out", "• HumanifyCV         AI humanization SaaS · 30+ paying users"),
          line("out", "• AI Platform        self-hosted LLMs + AI-in-SDLC auto-remediation"),
          line("out", "• AICPA & CIMA       multi-region AWS + label-driven GitOps"),
          line("out", "• On-prem K8s        bare-metal data center · 99.9% uptime · 2 yrs"),
          line("out", "• FinOps             weekend scale-to-zero · ~25% cost cut"),
        ];
        break;
      case "stack":
        out = [
          line("out", "cloud       AWS · Azure (AKS, Entra ID, Key Vault, OpenAI, Speech)"),
          line("out", "containers  Kubernetes · Docker · Helm · ArgoCD"),
          line("out", "iac         Terraform · AWS CDK · Ansible"),
          line("out", "ci/cd       GitHub Actions · GitLab CI · Jenkins · Azure DevOps · OPA"),
          line("out", "ai infra    Ollama (DeepSeek/Qwen) · RAG (pgvector) · Claude"),
          line("out", "observ.     Prometheus · Grafana · Loki · CloudWatch"),
        ];
        break;
      case "resume":
        out = [
          line("out", (
            <>
              opening the region-aware resume →{" "}
              <a className="term-accent" href="/resume">
                /resume
              </a>
            </>
          )),
        ];
        setTimeout(() => {
          window.location.href = "/resume";
        }, 600);
        break;
      case "contact":
        out = [
          line("out", (
            <>
              email     <a className="term-accent" href="mailto:anirudhvaka@gmail.com">anirudhvaka@gmail.com</a>
            </>
          )),
          line("out", (
            <>
              phone     <a className="term-accent" href="tel:+917981730312">+91 79817 30312</a>
            </>
          )),
          line("out", (
            <>
              linkedin  <a className="term-accent" href="https://linkedin.com/in/anirudhvaka" target="_blank" rel="noopener noreferrer">linkedin.com/in/anirudhvaka</a>
            </>
          )),
          line("out", (
            <>
              github    <a className="term-accent" href="https://github.com/AnirudhVaka" target="_blank" rel="noopener noreferrer">github.com/AnirudhVaka</a>
            </>
          )),
        ];
        break;
      default:
        out = [
          line("err", `command not found: ${cmd}`),
          line("out", "type 'help' for the list of commands."),
        ];
    }
    setHistory((h) => [...h, echoed, ...out]);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      run(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!recall.length) return;
      const idx = recallIdx === -1 ? recall.length - 1 : Math.max(0, recallIdx - 1);
      setRecallIdx(idx);
      setValue(recall[idx] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (recallIdx === -1) return;
      const idx = recallIdx + 1;
      if (idx >= recall.length) {
        setRecallIdx(-1);
        setValue("");
      } else {
        setRecallIdx(idx);
        setValue(recall[idx] ?? "");
      }
    } else if (e.key === "Tab") {
      const match = COMMANDS.find((c) => c.startsWith(value.trim().toLowerCase()));
      if (match) {
        e.preventDefault();
        setValue(match);
      }
    }
  }

  return (
    <>
      <div
        className="term"
        onClick={() => inputRef.current?.focus()}
        data-reveal
      >
        <div className="term-bar" aria-hidden="true">
          <span className="term-dot r" />
          <span className="term-dot y" />
          <span className="term-dot g" />
          <span className="term-title">anirudh@portfolio — bash</span>
        </div>
        <div className="term-body" ref={bodyRef} role="log" aria-live="polite" aria-label="Terminal output">
          {history.map((l) => (
            <div className={`term-line ${l.cls}`} key={l.id}>
              {l.node}
            </div>
          ))}
        </div>
        <div className="term-input-row">
          <span className="term-prompt-sym" aria-hidden="true">
            {PROMPT}
          </span>
          <input
            ref={inputRef}
            className="term-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Terminal command input. Type help for commands."
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </div>
      </div>
      <p className="term-hint mono" aria-hidden="true">
        try: whoami · projects · stack · resume — ↑/↓ for history, Tab to complete
      </p>
    </>
  );
}
