# GramAnalyse

**Analyse your Instagram connections privately — no login, no server uploads.**

Upload your Instagram data export and instantly see who doesn't follow you back, explore mutual connections, copy usernames, and export results to CSV.

---

## Features

- **Drag & drop upload** — Drop `followers_1.json` and `following.json` directly onto the upload zones
- **Instant analysis** — Set-based comparison for accurate, high-performance results at any scale
- **Not following back** — See exactly who you follow that doesn't follow you back
- **Mutual followers** — Discover your genuine two-way connections
- **Search & filter** — Filter results by username in real time
- **Copy usernames** — Copy individual usernames or the entire list to your clipboard
- **CSV export** — Download results as a spreadsheet with Instagram profile URLs
- **Dark mode** — Automatic system preference detection with manual toggle
- **Fully private** — All processing happens in your browser; data never leaves your device

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | [Tailwind CSS v3](https://tailwindcss.com) |
| Components | [shadcn/ui](https://ui.shadcn.com) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| File upload | [react-dropzone](https://react-dropzone.js.org/) |
| Icons | [lucide-react](https://lucide.dev) |
| Toasts | [Sonner](https://sonner.emilkowal.ski/) |
| Dark mode | [next-themes](https://github.com/pacocoursey/next-themes) |

---

## Getting Your Instagram Data

1. Open Instagram and go to **Settings → Your activity**
2. Select **Download your information → Request a download**
3. Choose **JSON** as the format and submit the request
4. Instagram will email you a download link (usually within a few hours)
5. Extract the ZIP file and locate:
   - `followers_and_following/followers_1.json`
   - `followers_and_following/following.json`

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/bintibhatt/GramAnalyse.git
cd GramAnalyse

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment

The app is ready for one-click deployment on Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/bintibhatt/GramAnalyse)

Or deploy manually:

```bash
npm run build   # Verify the production build
vercel          # Deploy via the Vercel CLI
```

---

## Project Structure

```
src/
├── app/
│   ├── globals.css        # Tailwind base + CSS variable tokens
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Main page (client component)
│   └── providers.tsx      # ThemeProvider + Toaster wrapper
├── components/
│   ├── ui/                # shadcn/ui primitives
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── sonner.tsx
│   │   └── tabs.tsx
│   ├── AnalysisResults.tsx  # Tabbed results view
│   ├── FileDropzone.tsx     # Animated drag & drop zone
│   ├── Header.tsx           # App header with theme toggle
│   ├── StatsGrid.tsx        # Summary statistics cards
│   ├── ThemeToggle.tsx      # Dark/light mode button
│   ├── UploadSection.tsx    # Upload UI + instructions
│   └── UserList.tsx         # Searchable, copyable user list
├── hooks/
│   └── useInstagramAnalysis.ts  # Core state management hook
├── lib/
│   ├── instagram.ts   # Parser and analysis utilities
│   └── utils.ts       # cn() helper
└── types/
    └── instagram.ts   # TypeScript interfaces
```

---

## Privacy

This tool operates entirely client-side. Your Instagram export files are parsed in your browser using the [File API](https://developer.mozilla.org/en-US/docs/Web/API/File) and never sent to any server. No analytics or tracking is included.

---

## License

MIT
