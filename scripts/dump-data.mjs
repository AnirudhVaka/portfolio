/**
 * One-shot Node script that imports the typed TS data files using Node 22's
 * --experimental-strip-types feature, and emits the merged data as JSON to
 * stdout. Used by scripts/build_docx.py when the `docx` npm package isn't
 * available (e.g. before `npm install` runs).
 *
 * Run with:
 *   node --experimental-strip-types scripts/dump-data.mjs > /tmp/resume-data.json
 */
import { resume } from "../data/resume.ts";
import { RULES } from "../lib/resumeRules.ts";
import { REGIONS } from "../lib/geo.ts";

process.stdout.write(JSON.stringify({ resume, RULES, REGIONS }, null, 2));
