// ======================================================
// Contact / Quote Form
// ======================================================

export function initContactForm(endpoint, submitForm) {
    const form = document.querySelector("#contact-form");

    if (!form) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const button = form.querySelector(
            'button[type="submit"]'
        );

        if (!button) return;

        const originalText = button.innerHTML;

        button.disabled = true;
        button.innerHTML = "Sending...";

        try {
            await submitForm(form, endpoint);

            form.reset();

            button.innerHTML = "Sent Successfully";

            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
            }, 3000);

        } catch (error) {

            button.innerHTML = "Try Again";
            button.disabled = false;

            alert(error.message);
        }
    });
}