import { toWhatsAppLink } from "/assets/js/config.js";

const reservationForm = document.querySelector("[data-reservation-form]");

function toReservationMessage(fields) {
  return [
    "Hi Grin Table, I want to reserve a table.",
    `Name: ${fields.name}`,
    `Phone: ${fields.phone}`,
    `Date: ${fields.date}`,
    `Time: ${fields.time}`,
    `Guests: ${fields.guests}`,
    `Notes: ${fields.notes || "-"}`,
  ].join("\n");
}

function setupDateMinValue() {
  const dateInput = document.querySelector("#reservation-date");
  if (!dateInput) {
    return;
  }

  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);
}

function initReservationForm() {
  if (!reservationForm) {
    return;
  }

  reservationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(reservationForm);
    const fields = {
      name: formData.get("name")?.toString().trim() || "",
      phone: formData.get("phone")?.toString().trim() || "",
      date: formData.get("date")?.toString().trim() || "",
      time: formData.get("time")?.toString().trim() || "",
      guests: formData.get("guests")?.toString().trim() || "",
      notes: formData.get("notes")?.toString().trim() || "",
    };

    const message = toReservationMessage(fields);
    window.open(toWhatsAppLink(message), "_blank", "noopener,noreferrer");
  });
}

setupDateMinValue();
initReservationForm();
