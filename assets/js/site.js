import { CONTACT, toWhatsAppLink } from "/assets/js/config.js";

function applyContactPlaceholders() {
  document.querySelectorAll("[data-phone-text]").forEach((node) => {
    node.textContent = CONTACT.phoneDisplay;
  });

  document.querySelectorAll("[data-phone-link]").forEach((node) => {
    node.setAttribute("href", `tel:${CONTACT.phoneRaw}`);
  });

  document.querySelectorAll("[data-whatsapp-link]").forEach((node) => {
    const customMessage =
      node.getAttribute("data-whatsapp-message") ||
      "Hi Grin Table, I would like to know more.";
    node.setAttribute(
      "href",
      toWhatsAppLink(customMessage)
    );
    node.setAttribute("target", "_blank");
    node.setAttribute("rel", "noopener noreferrer");
  });

  document.querySelectorAll("[data-directions-link]").forEach((node) => {
    node.setAttribute("href", CONTACT.directionsUrl);
    node.setAttribute("target", "_blank");
    node.setAttribute("rel", "noopener noreferrer");
  });

  document.querySelectorAll("[data-instagram-link]").forEach((node) => {
    node.setAttribute("href", CONTACT.instagramUrl);
    node.setAttribute("target", "_blank");
    node.setAttribute("rel", "noopener noreferrer");
  });

  document.querySelectorAll("[data-reviews-link]").forEach((node) => {
    node.setAttribute("href", CONTACT.reviewsUrl);
    node.setAttribute("target", "_blank");
    node.setAttribute("rel", "noopener noreferrer");
  });

  document.querySelectorAll("[data-address]").forEach((node) => {
    node.textContent = CONTACT.address;
  });

  document.querySelectorAll("[data-opening-hours]").forEach((node) => {
    node.textContent = CONTACT.openingHours;
  });

  document.querySelectorAll("[data-map-embed]").forEach((node) => {
    node.setAttribute("src", CONTACT.mapEmbedUrl);
  });

  const yearNode = document.querySelector("[data-year]");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }
}

function setupMobileNavigation() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-nav-menu]");

  if (!toggle || !menu) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupActiveNavState() {
  const currentPath = window.location.pathname.replace(/\/$/, "") || "/";

  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    const href = new URL(link.href).pathname.replace(/\/$/, "") || "/";
    if (href === currentPath) {
      link.classList.add("is-active");
    }
  });
}

function setupRevealAnimation() {
  const animatedNodes = document.querySelectorAll("[data-animate]");
  if (!animatedNodes.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  animatedNodes.forEach((node) => {
    node.classList.add("reveal");
    observer.observe(node);
  });
}

function mountMobileActionBar() {
  if (document.querySelector(".mobile-action-bar")) {
    return;
  }

  const bar = document.createElement("nav");
  bar.className = "mobile-action-bar glass";
  bar.setAttribute("aria-label", "Quick actions");
  bar.innerHTML = `
    <a href="tel:${CONTACT.phoneRaw}" aria-label="Call Grin Table">Call</a>
    <a href="${toWhatsAppLink("Hi Grin Table, I would like to reserve/order.")}" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">WhatsApp</a>
    <a href="${CONTACT.directionsUrl}" target="_blank" rel="noopener noreferrer" aria-label="Get directions">Directions</a>
  `;
  document.body.appendChild(bar);
}

function setupSmoothAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

applyContactPlaceholders();
setupMobileNavigation();
setupActiveNavState();
setupRevealAnimation();
mountMobileActionBar();
setupSmoothAnchorScroll();
