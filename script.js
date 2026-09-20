:root {
  --primary: #7c3aed;
  --primary-dark: #5b21b6;
  --bg: #0f172a;
  --bg-soft: #111827;
  --panel: #1f2937;
  --panel-alt: #0b1220;
  --text: #e5eefc;
  --muted: #a8bbd6;
  --line: rgba(148, 163, 184, 0.2);
  --accent: #22c55e;
  --warning: #f59e0b;
  --shadow: 0 20px 50px rgba(15, 23, 42, 0.35);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: "Inter", sans-serif;
  background: linear-gradient(180deg, #040b16 0%, #0b1220 100%);
  color: var(--text);
}

a {
  color: inherit;
  text-decoration: none;
}

img,
video {
  max-width: 100%;
  display: block;
}

button,
input,
textarea {
  font: inherit;
}

.container {
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(14px);
  background: rgba(11, 18, 32, 0.72);
  border-bottom: 1px solid var(--line);
}

.nav-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 76px;
  gap: 1rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.brand-mark {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--primary), #8b5cf6);
  font-weight: 800;
  font-size: 1.2rem;
}

.brand-name {
  display: block;
  font-size: 1.1rem;
  font-weight: 800;
}

.brand small {
  display: block;
  color: var(--muted);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.62rem;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 1.3rem;
  color: var(--muted);
}

.main-nav a {
  transition: color 0.2s ease;
}

.main-nav a:hover,
.text-link:hover {
  color: #fff;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 0.9rem 1.4rem;
  border: 1px solid transparent;
  font-weight: 700;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.button:hover {
  transform: translateY(-1px);
}

.button-primary {
  background: linear-gradient(135deg, var(--primary), #8b5cf6);
  color: #fff;
  box-shadow: var(--shadow);
}

.button-secondary {
  background: rgba(255, 255, 255, 0.04);
  border-color: var(--line);
  color: var(--text);
}

.hero {
  padding: 4.5rem 0 3rem;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.3fr 0.9fr;
  gap: 2rem;
  align-items: center;
}

.eyebrow {
  display: inline-block;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 700;
  color: #c4b5fd;
  margin-bottom: 1rem;
}

.hero-copy h1,
.section-head h2,
.about-copy h2 {
  margin: 0 0 1rem;
  line-height: 1.08;
}

.hero-copy h1 {
  font-size: clamp(2.5rem, 4vw, 4.4rem);
  max-width: 600px;
}

.hero-copy p,
.about-copy p,
.info-box p,
.feature-panel p {
  color: var(--muted);
  line-height: 1.7;
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2rem 0;
}

.hero-stats {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  padding: 0;
  margin: 0;
}

.hero-stats li {
  min-width: 110px;
}

.hero-stats strong {
  display: block;
  font-size: 1.3rem;
  margin-bottom: 0.3rem;
}

.hero-stats span {
  color: var(--muted);
  font-size: 0.8rem;
}

.hero-card {
  background: rgba(148, 163, 184, 0.06);
  border: 1px solid var(--line);
  border-radius: 28px;
  overflow: hidden;
  box-shadow: var(--shadow);
}

.card-top {
  background: rgba(124, 58, 237, 0.15);
  display: flex;
  gap: 0.6rem;
  padding: 1rem 1.1rem;
  border-bottom: 1px solid var(--line);
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
}

.feature-panel {
  padding: 2rem;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.3), rgba(15, 23, 42, 0.8));
}

.mini-label {
  display: inline-flex;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.14);
  color: #86efac;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
}

.feature-panel h3 {
  font-size: clamp(1.5rem, 2vw, 2.1rem);
  margin: 1rem 0 0.75rem;
}

.feature-badges {
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}

.feature-badges span {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 0.55rem 0.9rem;
  color: var(--muted);
  font-size: 0.82rem;
}

.brands-strip {
  background: rgba(148, 163, 184, 0.04);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding: 1rem 0;
}

.strip-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  text-align: center;
  color: var(--muted);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.72rem;
}

.content-section {
  padding: 5rem 0;
}

.alt-bg {
  background: rgba(148, 163, 184, 0.03);
}

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 1rem;
  margin-bottom: 2rem;
}

.section-head h2,
.about-copy h2 {
  font-size: clamp(2.1rem, 3vw, 3rem);
}

.text-link {
  color: #d8b4fe;
  font-weight: 600;
}

.news-grid,
.video-grid,
.about-wrap,
.admin-grid {
  display: grid;
  gap: 1.5rem;
}

.news-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.news-card,
.video-card,
.info-box,
.panel-form {
  background: rgba(17, 24, 39, 0.8);
  border: 1px solid var(--line);
  border-radius: 22px;
  overflow: hidden;
  box-shadow: var(--shadow);
}

.news-card {
  display: flex;
  flex-direction: column;
}

.news-card img {
  aspect-ratio: 16 / 9;
  object-fit: cover;
  background: #111827;
}

.news-body {
  padding: 1.4rem 1.2rem 1.3rem;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  color: #c4b5fd;
  font-size: 0.78rem;
  margin-bottom: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.news-card h3,
.video-card h3,
.info-box h3 {
  margin: 0 0 0.7rem;
  font-size: 1.35rem;
}

.news-card p,
.video-card p {
  color: var(--muted);
  line-height: 1.7;
  margin: 0;
}

.video-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.video-card {
  padding-bottom: 1rem;
}

.video-frame {
  background: #0b1220;
  border-bottom: 1px solid var(--line);
  min-height: 220px;
}

.video-frame iframe,
.video-frame video {
  width: 100%;
  min-height: 220px;
  height: 100%;
  border: 0;
  background: #020817;
}

.video-body {
  padding: 1rem 1.2rem 0.2rem;
}

.about-wrap {
  grid-template-columns: 1fr 1.2fr;
  align-items: center;
}

.about-boxes {
  display: grid;
  gap: 1rem;
}

.info-box {
  padding: 1.35rem 1.4rem;
}

.admin-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.panel-form {
  padding: 1.5rem;
}

.panel-form h3 {
  margin: 0 0 1.3rem;
  font-size: 1.5rem;
}

label {
  display: block;
  margin-bottom: 1rem;
  color: var(--muted);
  font-size: 0.9rem;
}

input,
textarea {
  width: 100%;
  margin-top: 0.4rem;
  background: rgba(148, 163, 184, 0.04);
  color: var(--text);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 0.9rem 1rem;
  resize: vertical;
}

input::placeholder,
textarea::placeholder {
  color: #94a3b8;
}

input:focus,
textarea:focus {
  outline: 2px solid rgba(124, 58, 237, 0.35);
  border-color: rgba(124, 58, 237, 0.7);
}

.site-footer {
  border-top: 1px solid var(--line);
  padding: 2rem 0 3rem;
  background: rgba(2, 6, 23, 0.7);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 1rem;
}

.footer-brand {
  margin-top: 0.5rem;
}

.site-footer h3 {
  margin-top: 0;
}

.site-footer p {
  color: var(--muted);
  line-height: 1.8;
  margin: 0 0 0.25rem;
}

@media (max-width: 860px) {
  .hero-grid,
  .about-wrap,
  .admin-grid,
  .news-grid,
  .video-grid,
  .footer-grid {
    grid-template-columns: 1fr;
  }

  .main-nav {
    display: none;
  }

  .section-head {
    align-items: start;
    flex-direction: column;
  }

  .strip-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
