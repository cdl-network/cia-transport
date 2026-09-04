// ======================================================
// Formspark Endpoints
// ======================================================

export const FORM_ENDPOINTS = {
    contact: "https://submit-form.com/RfTkwO9M8",
    application: "https://submit-form.com/EHKBrbWCi",
    prequalification: "https://submit-form.com/kZDQBYBSv"
};


// ======================================================
// Imports
// ======================================================

import { initContactForm } from "./contact-form.js";
import { initApplicationForm } from "./application-form.js";
import { initPrequalificationForm } from "./prequalification-form.js";


// ======================================================
// Shared Helpers
// ======================================================

export async function submitForm(form, endpoint, data = null) {
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(
            data || Object.fromEntries(new FormData(form))
        )
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
}


export function initPhoneInputs() {
    const phoneInputs = document.querySelectorAll(".phone-input");

    phoneInputs.forEach((phoneInput) => {
        phoneInput.addEventListener("input", (e) => {
            let value = e.target.value
                .replace(/\D/g, "")
                .slice(0, 10);

            if (value.length > 6) {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
            } else if (value.length > 3) {
                value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else if (value.length > 0) {
                value = `(${value}`;
            }

            e.target.value = value;
        });
    });
}


// ======================================================
// Initialize Forms
// ======================================================

export function forms() {
    initContactForm(
        FORM_ENDPOINTS.contact,
        submitForm
    );

    initApplicationForm(
        FORM_ENDPOINTS.application,
        submitForm
    );

    initPrequalificationForm(
        FORM_ENDPOINTS.prequalification,
        submitForm
    );

    initPhoneInputs();
}