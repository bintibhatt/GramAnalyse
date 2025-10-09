# GramAnalyse

Instagram Analytics Dashboard built with Next.js

## Features

- **Followers & Following Analysis**: Upload your Instagram data to find users who don't follow you back and whom you recently unfollowed.
- **Recently Unfollowed**: See a list of users you've unfollowed, with profile links and timestamps.
- **Compact, Modern UI**: Responsive dark theme, professional layout, and space-efficient design.
- **Secure Local Processing**: All Instagram data is processed locally in your browser—no uploads to any server.

## How It Works

1. Export your Instagram data from the official Instagram app or website (Settings > Your Activity > Download Your Information).
2. Upload your `followers.json`, `following.json`, and `recently_unfollowed_profiles.json` files in the dashboard.
3. Instantly view analytics on users not following you back and your recent unfollows.

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## File Structure

- `src/app/` — Next.js App Router pages
- `src/components/` — React components for analytics features
- `src/styles/` — SCSS styles (modular, dark theme)

## Customization

- All styles are in SCSS for easy customization
- Compact design for maximum information density

## License

MIT

---

> Built with ❤️ by bintibhatt
