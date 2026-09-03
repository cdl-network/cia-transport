// ======================================================
// Driver Application
// ======================================================

export function initApplicationForm(endpoint, submitForm) {
    const form = document.querySelector(
        "#driver-application-form"
    );

    if (!form) return;

    const thankYou = document.querySelector(
        "#application-thank-you"
    );

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

            // Hide form
            form.classList.add("hidden");

            // Show thank-you message
            if (thankYou) {
                thankYou.classList.remove("hidden");
            }

        } catch (error) {

            button.innerHTML = "Try Again";
            button.disabled = false;

            alert(error.message);
        }
    });
}