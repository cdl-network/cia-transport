const siteInfo = {
    companyName: "CIA Transport",

    phone: "779-707-1888",
    recruitingPhone: "217-492-8070",

    email: "dispatch@ciatransport.com",

    contactEmail: "contact@ciatransport.com",

    address:
        "10 Gougar Rd 2nd Floor Suite 10, Joliet, IL 60432, United States",

    hours: {
        weekdays: "Mon-Fri: 7:00am-6:00pm",
        saturday: "Sat: 8:00am-12:00pm",
    },

    social: {
        facebook: "#",
        instagram: "#",
    },

    stats: {
        trucks: "40",
        states: "48",
        trailerLength: "53'",
    },
};


export function initSiteInfo() {
    // Phone
    document.querySelectorAll("[data-site-phone]").forEach((element) => {
        element.textContent = siteInfo.phone;
        element.href = `tel:${siteInfo.phone.replace(/\D/g, "")}`;
    });

    // Recruiting phone
    document
        .querySelectorAll("[data-site-recruiting-phone]")
        .forEach((element) => {
            element.textContent = siteInfo.recruitingPhone;
            element.href = `tel:${siteInfo.recruitingPhone.replace(/\D/g, "")}`;
        });

    // Email
    document.querySelectorAll("[data-site-email]").forEach((element) => {
        element.textContent = siteInfo.email;
        element.href = `mailto:${siteInfo.email}`;
    });
    

    // Contact email
    document
        .querySelectorAll("[data-site-contact-email]")
        .forEach((element) => {
            element.textContent = siteInfo.contactEmail;
            element.href = `mailto:${siteInfo.contactEmail}`;
        });

    // Address
    document.querySelectorAll("[data-site-address]").forEach((element) => {
        element.textContent = siteInfo.address;
    });

    // Hours
    document
        .querySelectorAll("[data-site-hours-weekdays]")
        .forEach((element) => {
            element.textContent = siteInfo.hours.weekdays;
        });

    document
        .querySelectorAll("[data-site-hours-saturday]")
        .forEach((element) => {
            element.textContent = siteInfo.hours.saturday;
        });

    // Facebook
    document.querySelectorAll("[data-site-facebook]").forEach((element) => {
        element.href = siteInfo.social.facebook || "#";
    });

    // Instagram
    document.querySelectorAll("[data-site-instagram]").forEach((element) => {
        element.href = siteInfo.social.instagram || "#";
    });


    // Stats
    document.querySelectorAll("[data-site-trucks]").forEach((element) => {
        element.textContent = siteInfo.stats.trucks;
    });

    document.querySelectorAll("[data-site-states]").forEach((element) => {
        element.textContent = siteInfo.stats.states;
    });

    document
        .querySelectorAll("[data-site-trailer-length]")
        .forEach((element) => {
            element.textContent = siteInfo.stats.trailerLength;
        });
}
