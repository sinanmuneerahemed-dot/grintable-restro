export const CONTACT = {
  restaurantName: "Grin Table Restaurant",
  tagline: "Every meal is a memory.",
  phoneDisplay: "+1 (555) 123-4567",
  phoneRaw: "+15551234567",
  whatsappRaw: "15551234567",
  address: "123 Flavor Street, Your City, ST 00000",
  openingHours: "Mon-Sun: 11:00 AM - 11:00 PM",
  directionsUrl: "https://maps.google.com/?q=123+Flavor+Street,+Your+City",
  instagramUrl: "https://instagram.com/grintable.restaurant",
  reviewsUrl: "https://www.google.com/search?q=Grin+Table+Restaurant+reviews",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Times+Square,+New+York,+NY&output=embed"
};

export function toWhatsAppLink(message) {
  return `https://wa.me/${CONTACT.whatsappRaw}?text=${encodeURIComponent(message)}`;
}

export function escapeHtml(value = "") {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}