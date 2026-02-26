import { escapeHtml, toWhatsAppLink } from "/assets/js/config.js";

const menuContainer = document.querySelector("[data-menu-container]");
const menuChips = document.querySelector("[data-menu-chips]");

function getOrderMessage(itemName) {
  return `Hi Grin Table, I'd like to order: ${itemName}. Quantity: __. My name: __. Delivery/Pickup: __.`;
}

function renderMenu(data) {
  if (!menuContainer) {
    return;
  }

  menuContainer.innerHTML = "";
  if (menuChips) {
    menuChips.innerHTML = "";
  }

  data.categories.forEach((category) => {
    const categoryId = `category-${category.id}`;

    if (menuChips) {
      const chip = document.createElement("a");
      chip.className = "chip";
      chip.href = `#${categoryId}`;
      chip.textContent = category.title;
      menuChips.appendChild(chip);
    }

    const section = document.createElement("section");
    section.className = "panel menu-category";
    section.id = categoryId;
    section.setAttribute("data-animate", "");

    const itemsMarkup = category.items
      .map((item) => {
        const badge = item.type === "veg" ? "Veg" : "Non-veg";
        const badgeClass = item.type === "veg" ? "badge-veg" : "badge-nonveg";

        return `
          <article class="menu-item-card glass">
            <div class="menu-item-head">
              <h3>${escapeHtml(item.name)}</h3>
              <span class="menu-price">${escapeHtml(item.price)}</span>
            </div>
            <p>${escapeHtml(item.description)}</p>
            <div class="menu-item-actions">
              <span class="badge ${badgeClass}">${badge}</span>
              <a
                class="btn btn-secondary"
                href="${toWhatsAppLink(getOrderMessage(item.name))}"
                target="_blank"
                rel="noopener noreferrer"
              >
                Order on WhatsApp
              </a>
            </div>
          </article>
        `;
      })
      .join("");

    section.innerHTML = `
      <header class="section-head">
        <h2>${escapeHtml(category.title)}</h2>
      </header>
      <div class="menu-grid">${itemsMarkup}</div>
    `;

    menuContainer.appendChild(section);
  });
}

async function initMenuPage() {
  if (!menuContainer) {
    return;
  }

  try {
    const response = await fetch("/data/menu.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load menu data (${response.status})`);
    }

    const data = await response.json();
    renderMenu(data);
  } catch (error) {
    menuContainer.innerHTML = `
      <div class="panel error-box">
        <h2>Menu is unavailable right now</h2>
        <p>Please refresh the page, or order directly on WhatsApp.</p>
        <a class="btn btn-primary" data-whatsapp-link>Order on WhatsApp</a>
      </div>
    `;
    console.error(error);
  }
}

initMenuPage();
