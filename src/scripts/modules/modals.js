export function initModals() {
  const openButtons = document.querySelectorAll("[data-modal-open]");
  const closeButtons = document.querySelectorAll("[data-modal-close]");
  const modals = document.querySelectorAll('[id$="-modal"]');

  if (!openButtons.length || !modals.length) return;

  let activeModal = null;

  const openModal = (modal) => {
    if (!modal) return;

    activeModal = modal;

    modal.classList.remove("hidden");
    modal.classList.add("flex");

    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("overflow-hidden");
  };

  const closeModal = (modal) => {
    if (!modal) return;

    modal.classList.add("hidden");
    modal.classList.remove("flex");

    modal.setAttribute("aria-hidden", "true");

    if (activeModal === modal) {
      activeModal = null;
      document.body.classList.remove("overflow-hidden");
    }
  };


  // Open modal
  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.dataset.modalOpen;
      const modal = document.getElementById(modalId);

      openModal(modal);
    });
  });


  // Close modal
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest('[id$="-modal"]');

      closeModal(modal);
    });
  });


  // ESC to close
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && activeModal) {
      closeModal(activeModal);
    }
  });
}