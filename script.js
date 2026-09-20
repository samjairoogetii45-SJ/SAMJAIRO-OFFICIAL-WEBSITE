const newsStorageKey = "samjairoNews";
const videoStorageKey = "samjairoVideos";

let newsItems = [];
let videoItems = [];

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}

async function loadData() {
  try {
    const [newsResponse, videoResponse] = await Promise.all([
      fetchJson("/api/news"),
      fetchJson("/api/videos")
    ]);

    newsItems = newsResponse || [];
    videoItems = videoResponse || [];
    renderNews();
    renderVideos();
  } catch (error) {
    console.error("Failed to load data", error);
  }
}

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
  } else if (item.videoUrl) {
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

async function handleNewsSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);

  const payload = {
    title: formData.get("title").toString().trim(),
    category: formData.get("category").toString().trim(),
    image: formData.get("image").toString().trim() || "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=80",
    date: formData.get("date").toString(),
    summary: formData.get("summary").toString().trim(),
    content: formData.get("content").toString().trim()
  };

  if (!payload.title || !payload.category || !payload.summary || !payload.content) {
    alert("Please fill in all required news fields.");
    return;
  }

  await fetchJson("/api/news", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  form.reset();
  await loadData();
}

async function handleVideoSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const file = formData.get("videoFile");
  const url = formData.get("videoUrl").toString().trim();

  if (!file || file.size === 0) {
    if (!url) {
      alert("Please upload a video or enter a video URL.");
      return;
    }
  }

  const response = await fetch("/api/videos", {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(errorText);
    alert("Failed to upload video.");
    return;
  }

  form.reset();
  await loadData();
}

function attachEventHandlers() {
  const newsForm = document.getElementById("newsForm");
  const videoForm = document.getElementById("videoForm");

  if (newsForm) {
    newsForm.addEventListener("submit", handleNewsSubmit);
  }

  if (videoForm) {
    videoForm.addEventListener("submit", handleVideoSubmit);
  }

  const defaultDate = document.querySelector('input[name="date"]');
  if (defaultDate) {
    defaultDate.valueAsDate = new Date();
  }
}

attachEventHandlers();
loadData();
