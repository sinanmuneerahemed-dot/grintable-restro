import { escapeHtml } from "/assets/js/config.js";

const galleryGrid = document.querySelector("[data-gallery-grid]");
const filterButtons = document.querySelectorAll("[data-gallery-filter]");
const lightbox = document.querySelector("[data-lightbox]");

let items = [];
let activeItems = [];
let currentLightboxIndex = 0;

function renderGallery() {
  if (!galleryGrid) {
    return;
  }

  galleryGrid.innerHTML = activeItems
    .map(
      (item, index) => `
      <button
        class="gallery-card glass"
        type="button"
        data-gallery-item
        data-gallery-index="${index}"
        aria-label="Open image: ${escapeHtml(item.title)}"
      >
        <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt)}" loading="lazy" decoding="async" />
        <span>${escapeHtml(item.title)}</span>
      </button>
    `
    )
    .join("");

  galleryGrid.querySelectorAll("[data-gallery-item]").forEach((itemNode) => {
    itemNode.addEventListener("click", () => {
      const index = Number(itemNode.getAttribute("data-gallery-index"));
      openLightbox(index);
    });
  });
}

function setFilter(filterValue) {
  filterButtons.forEach((button) => {
    const isActive = button.getAttribute("data-gallery-filter") === filterValue;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  activeItems =
    filterValue === "all"
      ? items
      : items.filter((item) => item.category === filterValue);
  renderGallery();
}

function updateLightboxContent() {
  if (!lightbox || !activeItems.length) {
    return;
  }

  const imageNode = lightbox.querySelector("[data-lightbox-image]");
  const captionNode = lightbox.querySelector("[data-lightbox-caption]");
  const currentItem = activeItems[currentLightboxIndex];

  imageNode.src = currentItem.src;
  imageNode.alt = currentItem.alt;
  captionNode.textContent = currentItem.title;
}

function openLightbox(index) {
  if (!lightbox) {
    return;
  }
  currentLightboxIndex = index;
  updateLightboxContent();
  lightbox.classList.add("is-open");
  document.body.classList.add("no-scroll");
}

function closeLightbox() {
  if (!lightbox) {
    return;
  }
  lightbox.classList.remove("is-open");
  document.body.classList.remove("no-scroll");
}

function stepLightbox(direction) {
  if (!activeItems.length) {
    return;
  }
  currentLightboxIndex =
    (currentLightboxIndex + direction + activeItems.length) % activeItems.length;
  updateLightboxContent();
}

function setupLightboxEvents() {
  if (!lightbox) {
    return;
  }

  lightbox.querySelector("[data-lightbox-close]").addEventListener("click", closeLightbox);
  lightbox.querySelector("[data-lightbox-prev]").addEventListener("click", () => stepLightbox(-1));
  lightbox.querySelector("[data-lightbox-next]").addEventListener("click", () => stepLightbox(1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
    }
    if (event.key === "ArrowLeft") {
      stepLightbox(-1);
    }
    if (event.key === "ArrowRight") {
      stepLightbox(1);
    }
  });
}

async function initGallery() {
  if (!galleryGrid) {
    return;
  }

  try {
    const response = await fetch("/data/gallery.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load gallery (${response.status})`);
    }

    const data = await response.json();
    items = data.images;
    activeItems = items;
    renderGallery();
  } catch (error) {
    galleryGrid.innerHTML = `
      <div class="panel error-box">
        <h2>Gallery is unavailable right now</h2>
        <p>Please refresh the page and try again.</p>
      </div>
    `;
    console.error(error);
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setFilter(button.getAttribute("data-gallery-filter"));
  });
});

setupLightboxEvents();
initGallery();
