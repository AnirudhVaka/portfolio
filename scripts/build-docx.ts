/**
 * Build DOCX resumes — one per region — at build time.
 *
 * Runs via `npm run build:docx` (which uses tsx to import .ts source).
 * Output goes to /public/downloads/, served as a static download by
 * Next.js. The "Download Word" button on /resume links directly to the
 * matching file.
 *
 * ATS-friendly choices:
 *   - Calibri 11pt body, 24pt name heading, 11pt section headings
 *   - Real bullet lists (not images, not custom symbols)
 *   - Single column throughout
 *   - No tables for layout
 *   - Hyperlinked email/phone/LinkedIn/portfolio/github
 *   - Bullet content matches the HTML version exactly (same source)
 */

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  ExternalHyperlink,
  BorderStyle,
  LevelFormat,
  TabStopType,
  convertInchesToTwip,
} from "docx";
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { resume } from "../data/resume";
import { RULES, bulletAllowed, type ResumeRules, type SectionKey } from "../lib/resumeRules";
import { REGIONS, type Region } from "../lib/geo";

// Resolve project root robustly whether run from project root or elsewhere.
const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(here, "..");
const outDir = join(projectRoot, "public", "downloads");

const ACCENT_HEX = "1A56DB";
const TEXT_HEX = "1E1E2E";
const MUTED_HEX = "4A4A6A";

if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

const numbering = {
  config: [
    {
      reference: "bullets",
      levels: [
        {
          level: 0,
          format: LevelFormat.BULLET,
          text: "•",
          alignment: AlignmentType.LEFT,
          style: {
            paragraph: {
              indent: {
                left: convertInchesToTwip(0.25),
                hanging: convertInchesToTwip(0.18),
              },
            },
          },
        },
      ],
    },
  ],
};

function nameHeading(name: string): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { after: 60 },
    children: [
      new TextRun({
        text: name,
        bold: true,
        size: 44, // 22pt
        font: "Calibri",
        color: TEXT_HEX,
      }),
    ],
  });
}

function titleChip(title: string): Paragraph {
  return new Paragraph({
    spacing: { after: 100 },
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: 22, // 11pt
        font: "Calibri",
        color: ACCENT_HEX,
      }),
    ],
  });
}

function contactLine(parts: Array<{ text: string; href?: string }>): Paragraph {
  const children: (TextRun | ExternalHyperlink)[] = [];
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i]!;
    if (p.href) {
      children.push(
        new ExternalHyperlink({
          link: p.href,
          children: [
            new TextRun({ text: p.text, size: 20, font: "Calibri", color: ACCENT_HEX, underline: {} }),
          ],
        })
      );
    } else {
      children.push(new TextRun({ text: p.text, size: 20, font: "Calibri", color: MUTED_HEX }));
    }
    if (i < parts.length - 1) {
      children.push(new TextRun({ text: " | ", size: 20, font: "Calibri", color: MUTED_HEX }));
    }
  }
  return new Paragraph({ spacing: { after: 40 }, children });
}

function metaLine(text: string): Paragraph {
  return new Paragraph({
    spacing: { after: 40 },
    children: [
      new TextRun({ text, italics: true, size: 20, font: "Calibri", color: MUTED_HEX }),
    ],
  });
}

function sectionHeading(text: string): Paragraph {
  return new Paragraph({
    spacing: { before: 200, after: 60 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 6, space: 1, color: "D0D5E8" },
    },
    children: [
      new TextRun({
        text: text.toUpperCase(),
        bold: true,
        size: 20,
        font: "Calibri",
        color: ACCENT_HEX,
        characterSpacing: 30,
      }),
    ],
  });
}

function body(text: string): Paragraph {
  return new Paragraph({
    spacing: { after: 80, line: 280 },
    children: [new TextRun({ text, size: 22, font: "Calibri", color: MUTED_HEX })],
  });
}

function bulletPara(text: string): Paragraph {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 40, line: 260 },
    children: [new TextRun({ text, size: 22, font: "Calibri", color: MUTED_HEX })],
  });
}

function jobHeader(title: string, dates: string): Paragraph {
  return new Paragraph({
    spacing: { before: 100, after: 0 },
    tabStops: [{ type: TabStopType.RIGHT, position: 9000 }],
    children: [
      new TextRun({ text: title, bold: true, size: 24, font: "Calibri", color: TEXT_HEX }),
      new TextRun({ text: "\t" + dates, size: 22, font: "Calibri", color: MUTED_HEX }),
    ],
  });
}

function companyLine(text: string): Paragraph {
  return new Paragraph({
    spacing: { after: 40 },
    children: [
      new TextRun({ text, bold: true, size: 22, font: "Calibri", color: ACCENT_HEX }),
    ],
  });
}

function projectHeader(name: string, url: string, role: string, dates: string): Paragraph {
  return new Paragraph({
    spacing: { before: 100, after: 0 },
    tabStops: [{ type: TabStopType.RIGHT, position: 9000 }],
    children: [
      new TextRun({ text: `${role} — `, bold: true, size: 24, font: "Calibri", color: TEXT_HEX }),
      new ExternalHyperlink({
        link: url,
        children: [
          new TextRun({
            text: name,
            bold: true,
            size: 24,
            font: "Calibri",
            color: ACCENT_HEX,
            underline: {},
          }),
        ],
      }),
      new TextRun({
        text: `  (${url.replace(/^https?:\/\//, "")})`,
        size: 20,
        font: "Calibri",
        color: MUTED_HEX,
      }),
      new TextRun({ text: "\t" + dates, size: 22, font: "Calibri", color: MUTED_HEX }),
    ],
  });
}

function buildSections(rules: ResumeRules): Paragraph[] {
  const out: Paragraph[] = [];

  // Header.
  out.push(nameHeading(resume.contact.name));
  out.push(titleChip(rules.titleChip));
  out.push(
    contactLine([
      { text: resume.contact.email, href: `mailto:${resume.contact.email}` },
      { text: resume.contact.phone, href: `tel:${resume.contact.phone.replace(/\s/g, "")}` },
      { text: resume.contact.portfolio, href: `https://${resume.contact.portfolio}` },
    ])
  );
  out.push(
    contactLine([
      { text: rules.locationLine },
      { text: resume.contact.github, href: `https://${resume.contact.github}` },
      { text: resume.contact.linkedin, href: `https://${resume.contact.linkedin}` },
    ])
  );

  // Meta strip (visa / work-mode / notice period).
  const meta: string[] = [];
  if (rules.visaLine) meta.push(rules.visaLine);
  if (rules.workModeLine) meta.push(rules.workModeLine);
  if (rules.includeNoticePeriod) meta.push(`Notice period: ${resume.noticePeriod}`);
  if (meta.length > 0) out.push(metaLine(meta.join(" · ")));

  for (const key of rules.sectionOrder) {
    out.push(...renderSection(key, rules));
  }
  return out;
}

function renderSection(key: SectionKey, rules: ResumeRules): Paragraph[] {
  switch (key) {
    case "personalDetails":
      return personalDetails(rules);
    case "summary":
      return summary(rules);
    case "experience":
      return experience(rules);
    case "sideProjects":
      return sideProjects(rules);
    case "skills":
      return skills();
    case "education":
      return education(rules);
    case "languages":
      return languages();
    case "references":
      return references();
  }
}

function personalDetails(rules: ResumeRules): Paragraph[] {
  const out: Paragraph[] = [sectionHeading("Personal Details")];
  const lines: string[] = [`Location: ${rules.locationLine}`];
  if (rules.includeNationality && rules.nationality) {
    lines.push(`Nationality: ${rules.nationality}`);
  }
  if (rules.includeNoticePeriod) {
    lines.push(`Notice period: ${resume.noticePeriod}`);
  }
  lines.push(`Languages: ${resume.languages.map((l) => l.name).join(", ")}`);
  for (const line of lines) out.push(body(line));
  return out;
}

function summary(rules: ResumeRules): Paragraph[] {
  return [sectionHeading(rules.summaryLabel), body(resume.summary)];
}

function experience(rules: ResumeRules): Paragraph[] {
  const out: Paragraph[] = [sectionHeading(rules.experienceLabel)];
  for (const job of resume.experience) {
    const bullets = job.bullets.filter((b) => bulletAllowed(b.priority, rules.bulletFilter));
    if (bullets.length === 0) continue;
    out.push(jobHeader(job.title, job.dates));
    const locMode =
      job.location.toLowerCase() === job.mode.toLowerCase()
        ? job.mode
        : `${job.location} · ${job.mode}`;
    out.push(
      companyLine(
        `${job.company}${
          job.clientContext ? ` · ${job.clientContext}` : ""
        } · ${locMode}`
      )
    );
    for (const b of bullets) out.push(bulletPara(b.text));
  }
  return out;
}

function sideProjects(rules: ResumeRules): Paragraph[] {
  const out: Paragraph[] = [sectionHeading(rules.projectsLabel)];
  for (const p of resume.sideProjects) {
    out.push(projectHeader(p.name, p.url, p.role, p.dates));
    out.push(body(p.resumeBlurb));
  }
  return out;
}

function skills(): Paragraph[] {
  const out: Paragraph[] = [sectionHeading("Technical Skills")];
  for (const g of resume.skills) {
    out.push(
      new Paragraph({
        spacing: { after: 40, line: 260 },
        children: [
          new TextRun({
            text: `${g.label}: `,
            bold: true,
            size: 22,
            font: "Calibri",
            color: TEXT_HEX,
          }),
          new TextRun({
            text: g.items.join(", "),
            size: 22,
            font: "Calibri",
            color: MUTED_HEX,
          }),
        ],
      })
    );
  }
  return out;
}

function education(rules: ResumeRules): Paragraph[] {
  const out: Paragraph[] = [sectionHeading("Education")];
  out.push(
    new Paragraph({
      spacing: { after: 40 },
      children: [
        new TextRun({
          text: resume.education.degree,
          bold: true,
          size: 22,
          font: "Calibri",
          color: TEXT_HEX,
        }),
      ],
    })
  );
  out.push(body(`${resume.education.institution}, ${resume.education.location}`));
  out.push(
    new Paragraph({
      children: [
        new TextRun({
          text: resume.education.dates + (rules.includeCGPA ? ` | CGPA: ${resume.education.cgpa}` : ""),
          size: 21,
          font: "Calibri",
          color: ACCENT_HEX,
        }),
      ],
    })
  );
  return out;
}

function languages(): Paragraph[] {
  return [
    sectionHeading("Languages"),
    body(resume.languages.map((l) => `${l.name} — ${l.level}`).join("  ·  ")),
  ];
}

function references(): Paragraph[] {
  return [
    sectionHeading("References"),
    new Paragraph({
      children: [
        new TextRun({
          text: "References available on request.",
          italics: true,
          size: 22,
          font: "Calibri",
          color: MUTED_HEX,
        }),
      ],
    }),
  ];
}

async function buildOne(region: Region): Promise<void> {
  const rules = RULES[region];
  const doc = new Document({
    creator: "Anirudh Vaka",
    title: `Anirudh Vaka — Resume (${region.toUpperCase()})`,
    description: `Senior DevOps Engineer resume formatted for ${region.toUpperCase()}.`,
    styles: {
      default: {
        document: { run: { font: "Calibri", size: 22 } },
      },
    },
    numbering,
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(0.55),
              right: convertInchesToTwip(0.63),
              bottom: convertInchesToTwip(0.47),
              left: convertInchesToTwip(0.63),
            },
          },
        },
        children: buildSections(rules),
      },
    ],
  });
  const buf = await Packer.toBuffer(doc);
  const outPath = join(outDir, `anirudh-vaka-resume-${rules.fileSlug}.docx`);
  writeFileSync(outPath, buf);
  console.log(`  ✓ ${rules.fileSlug.padEnd(8)} → ${outPath}`);
}

async function main() {
  console.log("Building region-specific DOCX resumes…");
  for (const region of REGIONS) {
    await buildOne(region);
  }
  console.log(`Done. ${REGIONS.length} files written to ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
