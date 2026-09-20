# Samjairo Official Website

A complete Samjairo official website with:
- news and announcement cards
- video gallery
- admin forms to publish content
- real backend API for storing news and uploaded videos
- responsive layout for mobile and desktop

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

3. Open the site:

```text
http://localhost:3000
```

## Project structure

- `server.js` — Express backend and API endpoints
- `index.html` — homepage layout
- `styles.css` — website styling
- `script.js` — frontend logic for loading and posting content
- `data/news.json` — saved news posts
- `data/videos.json` — saved videos
- `uploads/videos/` — uploaded video files

## Notes

This version saves data on the server rather than only in browser localStorage, so the website is much closer to a real content-management website.
