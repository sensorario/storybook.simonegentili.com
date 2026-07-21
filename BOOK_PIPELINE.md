# Book pipeline (markdown → PDF)

Turns a book's markdown chapters into two PDF profiles using Pandoc + XeLaTeX.
Independent of the component-library build; nothing here is published to npm.

## Prerequisites (not npm-installable — must be on PATH)

- `pandoc`
- `xelatex` (TeX Live / MacTeX)
- `silicon` (code screenshot renderer, used for the "image" PDF profile)

Install via Homebrew, e.g.:

```bash
brew install pandoc mactex silicon
```

## Usage

```bash
npm run book -- <slug>
```

e.g.

```bash
npm run book -- book-one
npm run book -- book-two
```

Output lands in `build/<slug>/`:
- `<slug>-text.pdf` — has a table of contents, code blocks rendered as text
- `<slug>-image.pdf` — no ToC, code blocks rasterized to PNG via `silicon`

`build/` is gitignored; PDFs are never committed.

## Content convention

```
content/
  shared/
    rights.md              # copyright boilerplate, prepended to every book
    assets/placeholder.png
  books/<slug>/
    book.yaml               # title, author, isbn, backCover, otherBooks: [{title, amazonUrl}]
    chapters/
      01-<name>/
        00-testo.md
        99-conclusioni.md    # required for every chapter EXCEPT 99-conclusioni-finali
        <NN-sub-chapter>/00-testo.md   # optional nested sub-chapters
      99-conclusioni-finali/
        00-testo.md
```

Ordering is purely filename/dirname prefix (numeric, depth-first, sorted).
Any `90-qna*.md` file is capped at 5 `### D:` headings — the build fails validation otherwise.

## Adding a new book

1. Create `content/books/<new-slug>/book.yaml` and `chapters/` following the layout above.
2. Every chapter dir needs its own `99-conclusioni.md` except `99-conclusioni-finali`.
3. Run `npm run book -- <new-slug>`.
