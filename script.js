const newsStorageKey = "samjairoNews";
const videoStorageKey = "samjairoVideos";

const sampleNews = [
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

const sampleVideos = [
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

function getSavedData(key, fallback) {
  const stored = localStorage.getItem(key);

  if (!stored) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }

  try {
    return JSON.parse(stored);
  } catch (error) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
}

const newsItems = getSavedData(newsStorageKey, sampleNews);
const videoItems = getSavedData(videoStorageKey, sampleVideos);

function formatDate(dateString) {
  if (!dateString) return "Recent";
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function buildNewsCard(item) {
  const image = item.image || "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=80";

  return `
    <article class="news-card">
      <img src="${image}" alt="${item.title}" />
      <div class="news-body">
        <div class="meta-row">
          <span>${item.category}</span>
          <span>${formatDate(item.date)}</span>
        </div>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
      </div>
    </article>
  `;
}

function buildVideoMarkup(item) {
  const isYouTube = /(?:youtube\.com|youtu\.be)/i.test(item.videoUrl || "");
  let mediaMarkup = "";

  if (isYouTube) {
    const embedUrl = item.videoUrl.includes("embed/")
      ? item.videoUrl
      : item.videoUrl.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/");

    mediaMarkup = `<iframe src="${embedUrl}" title="${item.title}" allowfullscreen></iframe>`;
  } else {
    mediaMarkup = `<video controls src="${item.videoUrl}"></video>`;
  }

  return `
    <article class="video-card">
      <div class="video-frame">
        ${mediaMarkup}
      </div>
      <div class="video-body">
        <div class="meta-row">
          <span>${item.category}</span>
        </div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    </article>
  `;
}

function renderNews() {
  const list = document.getElementById("newsList");
  list.innerHTML = newsItems.map(buildNewsCard).join("");
}

function renderVideos() {
  const list = document.getElementById("videoList");
  list.innerHTML = videoItems.map(buildVideoMarkup).join("");
}

function saveNews() {
  localStorage.setItem(newsStorageKey, JSON.stringify(newsItems));
}

function saveVideos() {
  localStorage.setItem(videoStorageKey, JSON.stringify(videoItems));
}

async function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function handleNewsSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const newItem = {
    id: Date.now(),
    title: formData.get("title").toString().trim(),
    category: formData.get("category").toString().trim(),
    image: formData.get("image").toString().trim() || "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=80",
    date: formData.get("date").toString(),
    summary: formData.get("summary").toString().trim(),
    content: formData.get("content").toString().trim()
  };

  newsItems.unshift(newItem);
  saveNews();
  renderNews();
  form.reset();
}

async function handleVideoSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);
  const file = formData.get("videoFile");
  const url = formData.get("videoUrl").toString().trim();

  let videoUrl = url;

  if (file && file.size > 0) {
    videoUrl = await readFileAsDataUrl(file);
  }

  const newVideo = {
    id: Date.now(),
    title: formData.get("title").toString().trim(),
    category: formData.get("category").toString().trim(),
    description: formData.get("description").toString().trim(),
    videoUrl
  };

  videoItems.unshift(newVideo);
  saveVideos();
  renderVideos();
  form.reset();
}

const newsForm = document.getElementById("newsForm");
const videoForm = document.getElementById("videoForm");

newsForm.addEventListener("submit", handleNewsSubmit);
videoForm.addEventListener("submit", handleVideoSubmit);

renderNews();
renderVideos();

const defaultDate = document.querySelector('input[name="date"]');
if (defaultDate) {
  defaultDate.valueAsDate = new Date();
}
