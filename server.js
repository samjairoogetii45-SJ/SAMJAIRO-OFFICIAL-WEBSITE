const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_DIR = path.join(__dirname, "data");
const UPLOAD_DIR = path.join(__dirname, "uploads", "videos");

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const NEWS_FILE = path.join(DATA_DIR, "news.json");
const VIDEOS_FILE = path.join(DATA_DIR, "videos.json");

const defaultNews = [
  {
    id: 1,
    title: "Samjairo Launches New Community Update Campaign",
    category: "Announcement",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    date: "2026-09-15",
    summary: "A new community-driven campaign is bringing fresh updates, events, and stories to all fans.",
    content:
      "Samjairo is excited to introduce a new community update campaign designed to keep audiences informed and engaged. The campaign includes a stronger newsletter experience, feature highlights, and a more dynamic media presence across platforms."
  },
  {
    id: 2,
    title: "Behind the Scenes: Samjairo Media Production Week",
    category: "Media",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80",
    date: "2026-09-10",
    summary: "A look into the production process and the creative team shaping the next set of videos.",
    content:
      "This week, the Samjairo media team showcased a collaborative production cycle focused on storytelling, planning, and creative visual design. The team produced several concept drafts and recorded interviews to improve future content delivery."
  },
  {
    id: 3,
    title: "Samjairo Hosts First Public Q&A Session",
    category: "Event",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80",
    date: "2026-09-02",
    summary: "The first public Q&A brought fans together for questions, stories, and a direct community interaction.",
    content:
      "Fans joined the first Samjairo public Q&A session and asked important questions about upcoming announcements, visual direction, and community priorities. The event was designed to connect the audience and create a more authentic public presence."
  }
];

const defaultVideos = [
  {
    id: 1,
    title: "Samjairo Intro Reel",
    category: "Featured",
    description: "A short introduction highlighting the vision and direction of Samjairo.",
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?si=2n1RrdBPHF9nUMvY"
  },
  {
    id: 2,
    title: "Studio Update",
    category: "Behind the Scenes",
    description: "A quick look at the production environment and planning process behind future media content.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 3,
    title: "Live Event Highlights",
    category: "Event",
    description: "A highlight reel from the recent public event and community engagement session.",
    videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U"
  }
];

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2));
    return fallback;
  }

  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2));
    return fallback;
  }
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
}

function ensureSeedData() {
  readJson(NEWS_FILE, defaultNews);
  readJson(VIDEOS_FILE, defaultVideos);
}

ensureSeedData();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = path.extname(file.originalname) || ".mp4";
    cb(null, `${uniqueSuffix}${extension}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 150 * 1024 * 1024 }
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(UPLOAD_DIR));
app.use(express.static(__dirname));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "Samjairo Official Website" });
});

app.get("/api/news", (req, res) => {
  res.json(readJson(NEWS_FILE, defaultNews));
});

app.post("/api/news", (req, res) => {
  const { title, category, image, date, summary, content } = req.body || {};

  if (!title || !category || !summary || !content) {
    return res.status(400).json({ error: "Missing required news fields." });
  }

  const news = readJson(NEWS_FILE, defaultNews);
  const newEntry = {
    id: Date.now(),
    title: title.trim(),
    category: category.trim(),
    image: image || "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=80",
    date: date || new Date().toISOString().slice(0, 10),
    summary: summary.trim(),
    content: content.trim()
  };

  news.unshift(newEntry);
  writeJson(NEWS_FILE, news);
  return res.status(201).json(newEntry);
});

app.get("/api/videos", (req, res) => {
  res.json(readJson(VIDEOS_FILE, defaultVideos));
});

app.post("/api/videos", upload.single("videoFile"), (req, res) => {
  const { title, category, description, videoUrl } = req.body || {};

  if (!title || !category || !description) {
    return res.status(400).json({ error: "Missing required video fields." });
  }

  const videos = readJson(VIDEOS_FILE, defaultVideos);
  const uploadedRoute = req.file ? `/uploads/videos/${req.file.filename}` : (videoUrl || "").trim();

  if (!uploadedRoute) {
    return res.status(400).json({ error: "A video file or valid URL is required." });
  }

  const newVideo = {
    id: Date.now(),
    title: title.trim(),
    category: category.trim(),
    description: description.trim(),
    videoUrl: uploadedRoute
  };

  videos.unshift(newVideo);
  writeJson(VIDEOS_FILE, videos);
  return res.status(201).json(newVideo);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Samjairo website running on http://localhost:${PORT}`);
});
