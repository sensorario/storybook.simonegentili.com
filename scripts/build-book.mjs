import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { load as loadYaml } from "js-yaml";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content");
const RIGHTS_FILE = path.join(CONTENT_DIR, "shared", "rights.md");
const LUA_FILTER = path.join(ROOT, "scripts", "pandoc", "code-to-image.lua");

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: node scripts/build-book.mjs <book-slug>");
  process.exit(1);
}

const bookDir = path.join(CONTENT_DIR, "books", slug);
if (!existsSync(bookDir)) {
  console.error(`Unknown book "${slug}": ${bookDir} does not exist`);
  process.exit(1);
}

const book = loadYaml(readFileSync(path.join(bookDir, "book.yaml"), "utf8"));

function sortedEntries(dir) {
  return readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));
}

// Depth-first walk of a chapter directory: numeric filename/foldername
// prefixes (00-, 01-, 99-, ...) are what decides ordering, nothing else.
function collectMarkdownFiles(dir) {
  const files = [];
  for (const entry of sortedEntries(dir)) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectMarkdownFiles(entryPath));
    } else if (entry.name.endsWith(".md")) {
      files.push(entryPath);
    }
  }
  return files;
}

// Every top-level chapter must have its own conclusions file, except the
// final conclusions chapter itself (it *is* the conclusion). Every "qna"
// file is capped at 5 questions (marked by "### D:" headings).
function validateBook(chaptersDir) {
  const errors = [];
  for (const entry of sortedEntries(chaptersDir)) {
    if (!entry.isDirectory()) continue;
    const chapterPath = path.join(chaptersDir, entry.name);
    if (entry.name === "99-conclusioni-finali") continue;

    const hasConclusions = readdirSync(chapterPath).includes("99-conclusioni.md");
    if (!hasConclusions) {
      errors.push(`Chapter "${entry.name}" is missing a 99-conclusioni.md file`);
    }

    for (const file of collectMarkdownFiles(chapterPath)) {
      if (!path.basename(file).startsWith("90-qna")) continue;
      const questionCount = (readFileSync(file, "utf8").match(/^### D:/gm) || []).length;
      if (questionCount > 5) {
        errors.push(`${path.relative(ROOT, file)} has ${questionCount} Q&A entries, max is 5`);
      }
    }
  }
  return errors;
}

function renderOtherBooksFragment(otherBooks) {
  const lines = ["# Altri libri", ""];
  for (const entry of otherBooks || []) {
    lines.push(`- [${entry.title}](${entry.amazonUrl})`);
  }
  return lines.join("\n") + "\n";
}

function buildMasterFileList(outDir) {
  const chaptersDir = path.join(bookDir, "chapters");
  const errors = validateBook(chaptersDir);
  if (errors.length > 0) {
    console.error(`Validation failed for "${slug}":\n` + errors.map((e) => `  - ${e}`).join("\n"));
    process.exit(1);
  }

  const otherBooksFile = path.join(outDir, "back-matter-altri-libri.md");
  writeFileSync(otherBooksFile, renderOtherBooksFragment(book.otherBooks));

  return [RIGHTS_FILE, ...collectMarkdownFiles(chaptersDir), otherBooksFile];
}

function runPandoc(masterFiles, outFile, extraArgs) {
  const args = [
    ...masterFiles,
    "--metadata", `title=${book.title}`,
    "--metadata", `author=${book.author}`,
    "--pdf-engine=xelatex",
    ...extraArgs,
    "-o", outFile,
  ];
  execFileSync("pandoc", args, { cwd: ROOT, stdio: "inherit" });
}

const outDir = path.join(ROOT, "build", slug);
mkdirSync(outDir, { recursive: true });

const masterFiles = buildMasterFileList(outDir);

const textPdf = path.join(outDir, `${slug}-text.pdf`);
runPandoc(masterFiles, textPdf, ["--toc", "--toc-depth=3", "-V", "documentclass=report"]);
console.log(`Built ${path.relative(ROOT, textPdf)}`);

const imagePdf = path.join(outDir, `${slug}-image.pdf`);
runPandoc(masterFiles, imagePdf, [`--lua-filter=${LUA_FILTER}`]);
console.log(`Built ${path.relative(ROOT, imagePdf)}`);
