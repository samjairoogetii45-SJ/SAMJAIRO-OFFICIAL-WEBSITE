# Samjairo Official Website

A simple but polished official website for Samjairo featuring: 
- News and announcements section
- Video gallery
- Admin form to add news and videos
- Responsive design for mobile and desktop
- Browser-based storage for content persistence

## Run locally

Open `index.html` directly in a browser.

If you want a local server:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Files

- `index.html` — site layout
- `styles.css` — styling
- `script.js` — dynamic content and form handling

## Notes

The site currently stores content in the browser's localStorage, so newly posted news and videos remain after refresh on the same browser.

For a production-ready CMS with real database storage, the next step is to connect this frontend to a backend such as Node.js + Express or Firebase.
