export function forms() {
  initContactForm();
  initApplicationForm();
  prequalificationForm();
  initPhoneInputs();
  
}


function initPhoneInputs() {
    const phoneInputs = document.querySelectorAll(".phone-input");

    phoneInputs.forEach((phoneInput) => {
        phoneInput.addEventListener("input", (e) => {
            let value = e.target.value.replace(/\D/g, "").slice(0, 10);

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
// Helper
// ======================================================

async function submitForm(form, endpoint, data = null) {
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


// ======================================================
// Contact / Quote Form
// ======================================================

function initContactForm() {
  const form = document.querySelector("#contact-form");

  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const button = form.querySelector('button[type="submit"]');

    if (!button) return;

    const originalText = button.innerHTML;

    button.disabled = true;
    button.innerHTML = "Sending...";


    try {
      await submitForm(form, "https://submit-form.com/awMKUPbhG");

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


// ======================================================
// Driver Application
// ======================================================

function initApplicationForm() {
  const form = document.querySelector("#driver-application-form");

  if (!form) return;

  const thankYou = document.querySelector(
    "#application-thank-you"
  );

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const button = form.querySelector('button[type="submit"]');

    if (!button) return;

    const originalText = button.innerHTML;

    button.disabled = true;
    button.innerHTML = "Sending...";


    try {
      await submitForm(form, "https://submit-form.com/qTA9kvTfc");

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


// ======================================================
// Prequalification
// ======================================================

function prequalificationForm() {
  const form = document.querySelector("#prequalification-form");

  if (!form) return;

  const questions = Array.from(
    form.querySelectorAll(".prequal-question")
  );

  const navigation = form.querySelector(
    "#prequal-navigation"
  );

  const nextButton = form.querySelector(
    "#prequal-next"
  );

  const prevButton = form.querySelector(
    "#prequal-prev"
  );

  const counter = form.querySelector(
    "#prequal-counter"
  );

  const result = form.querySelector(
    "#prequal-result"
  );

  const passMessage = form.querySelector(
    "#prequal-pass"
  );

  const failMessage = form.querySelector(
    "#prequal-fail"
  );

  const contact = form.querySelector(
    "#prequal-contact"
  );

  const header = document.querySelector(
    "#prequal-header"
  );

  const progressContainer = document.querySelector(
    "#prequal-progress-bar"
  );


  if (
    !questions.length ||
    !navigation ||
    !nextButton ||
    !prevButton ||
    !result ||
    !contact
  ) {
    return;
  }


  let currentStep = 0;


  // --------------------------------------------------
  // Get answer
  // --------------------------------------------------

  const getAnswer = (name) => {
    const selected = form.querySelector(
      `input[name="${name}"]:checked`
    );

    return selected ? selected.value : null;
  };


  // --------------------------------------------------
  // Qualification logic
  // --------------------------------------------------

  const checkQualification = () => {

    const q1 = getAnswer("q1");
    const q2 = getAnswer("q2");
    const q4 = getAnswer("q4");
    const q5 = getAnswer("q5");
    const q6 = getAnswer("q6");
    const q7 = getAnswer("q7");
    const q8 = getAnswer("q8");


    /*
      CIA Transport rules:

      Q1: No = FAIL
      Q2: Under 1 year = FAIL
      Q3: Ignored
      Q4: No = FAIL
      Q5: 3+ = FAIL
      Q6: 2+ = FAIL
      Q7: Yes = FAIL
      Q8: Yes = FAIL
    */

    return (
      q1 !== "no" &&
      q2 !== "under-1" &&
      q4 !== "no" &&
      q5 !== "3+" &&
      q6 !== "2+" &&
      q7 !== "yes" &&
      q8 !== "yes"
    );
  };


  // --------------------------------------------------
  // Show question
  // --------------------------------------------------

  const showQuestion = (index) => {

    questions.forEach((question, questionIndex) => {
      question.classList.toggle(
        "hidden",
        questionIndex !== index
      );
    });


    const current = index + 1;
    const total = questions.length;


    if (counter) {
      counter.textContent = `${current} / ${total}`;
    }


    updateButtons();
  };


  // --------------------------------------------------
  // Check current answer
  // --------------------------------------------------

  const currentAnswered = () => {
    const question = questions[currentStep];

    if (!question) return false;

    return !!question.querySelector(
      'input[type="radio"]:checked'
    );
  };


  // --------------------------------------------------
  // Button state
  // --------------------------------------------------

  const updateButtons = () => {

    const answered = currentAnswered();


    nextButton.disabled = !answered;


    nextButton.classList.toggle(
      "opacity-40",
      !answered
    );

    nextButton.classList.toggle(
      "cursor-not-allowed",
      !answered
    );


    if (currentStep === 0) {
      prevButton.classList.add("hidden");
    } else {
      prevButton.classList.remove("hidden");
    }


    if (currentStep === questions.length - 1) {

      nextButton.innerHTML = `
        See Result

        <svg
          class="w-4 h-4"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">

          <path
            d="M4 10H16M16 10L11 5M16 10L11 15"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round" />

        </svg>
      `;

    } else {

      nextButton.innerHTML = `
        Next

        <svg
          class="w-4 h-4"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">

          <path
            d="M4 10H16M16 10L11 5M16 10L11 15"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round" />

        </svg>
      `;
    }
  };


  // --------------------------------------------------
  // Radio selection
  // --------------------------------------------------

  form
    .querySelectorAll('input[type="radio"]')
    .forEach((radio) => {

      radio.addEventListener("change", () => {
        updateButtons();
      });

    });


  // --------------------------------------------------
  // Show result
  // --------------------------------------------------

  const showResult = () => {

    const qualified = checkQualification();


    // Hide questions
    questions.forEach((question) => {
      question.classList.add("hidden");
    });


    // Hide navigation
    navigation.classList.add("hidden");


    // Hide header and progress
    if (header) {
      header.classList.add("hidden");
    }

    if (progressContainer) {
      progressContainer.classList.add("hidden");
    }


    // Show result
    result.classList.remove("hidden");


    if (qualified) {

      passMessage.classList.remove("hidden");
      failMessage.classList.add("hidden");

    } else {

      passMessage.classList.add("hidden");
      failMessage.classList.remove("hidden");

    }


    // Show contact form
    contact.classList.remove("hidden");
  };


  // --------------------------------------------------
  // Next
  // --------------------------------------------------

  nextButton.addEventListener("click", () => {

    if (!currentAnswered()) {
      return;
    }


    if (currentStep === questions.length - 1) {

      showResult();

      return;
    }


    currentStep++;

    showQuestion(currentStep);
  });


  // --------------------------------------------------
  // Back
  // --------------------------------------------------

  prevButton.addEventListener("click", () => {

    if (currentStep <= 0) {
      return;
    }


    currentStep--;

    showQuestion(currentStep);
  });


  // --------------------------------------------------
  // Final submission
  // --------------------------------------------------

  form.addEventListener("submit", async (event) => {

    event.preventDefault();


    const name = form.querySelector("#prequal-name");
    const phone = form.querySelector("#prequal-phone");
    const email = form.querySelector("#prequal-email");


    if (!name.value.trim()) {
      name.focus();
      return;
    }

    if (!phone.value.trim()) {
      phone.focus();
      return;
    }

    if (!email.value.trim()) {
      email.focus();
      return;
    }


    const qualified = checkQualification();

    const submitButton = form.querySelector(
      "#prequal-submit"
    );


    if (!submitButton) return;


    const originalText = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.innerHTML = "Sending...";


    // Store result in hidden field
    let resultField = form.querySelector(
      'input[name="qualification"]'
    );


    if (!resultField) {

      resultField = document.createElement("input");

      resultField.type = "hidden";
      resultField.name = "qualification";

      form.appendChild(resultField);
    }


    resultField.value = qualified
    ? "qualified"
    : "not-qualified";

// Build a client-friendly submission
const formData = Object.fromEntries(new FormData(form));

const answerLabels = {
    q1: "Do you hold a valid Class A CDL?",
    q2: "How much verifiable Class A tractor-trailer experience do you have?",
    q3: "How much flatbed experience do you have?",
    q4: "Are you age 23 or older?",
    q5: "How many moving violations have you had in the last 3 years?",
    q6: "How many DOT-recordable or preventable accidents have you had in the last 3 years?",
    q7: "Have you had a DUI/DWI, reckless driving violation, or license suspension in the last 5 years?",
    q8: "Are you currently prohibited by the FMCSA Clearinghouse or in an unfinished SAP return-to-duty program?"
};

const answerValues = {
    "yes": "Yes",
    "no": "No",
    "under-1": "Under 1 year",
    "1-2": "1–2 years",
    "2+": "2+ years",
    "under-6": "Under 6 months",
    "6+": "6+ months",
    "0": "0",
    "1": "1",
    "2+": "2+"
};

// Remove technical field names
delete formData.q1;
delete formData.q2;
delete formData.q3;
delete formData.q4;
delete formData.q5;
delete formData.q6;
delete formData.q7;
delete formData.q8;

// Add readable question + answer fields
Object.entries(answerLabels).forEach(([key, question]) => {
    const selectedValue = new FormData(form).get(key);

    if (selectedValue !== null) {
        formData[question] =
            answerValues[selectedValue] || selectedValue;
    }
});

// Make applicant information readable too
formData["Applicant Name"] = formData["prequal-name"];
formData["Applicant Phone"] = formData["prequal-phone"];
formData["Applicant Email"] = formData["prequal-email"];

delete formData["prequal-name"];
delete formData["prequal-phone"];
delete formData["prequal-email"];

formData["Qualification"] = qualified
    ? "Qualified"
    : "Not Qualified";

delete formData["qualification"];

try {
    await submitForm(
        form,
        "https://submit-form.com/F8OiV0sJI",
        formData
    );

    submitButton.innerHTML = "Submitted Successfully";


      // Disable fields after successful submission
      form
        .querySelectorAll("input, button")
        .forEach((element) => {
          element.disabled = true;
        });


    } catch (error) {

      submitButton.disabled = false;
      submitButton.innerHTML = originalText;

      alert(error.message);
    }
  });


  // --------------------------------------------------
  // Initial state
  // --------------------------------------------------

  showQuestion(0);
}