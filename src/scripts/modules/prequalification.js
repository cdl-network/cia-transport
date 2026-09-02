export function initPrequalification() {
  const form = document.querySelector("#prequalification-form");
  const modal = form.closest("#prequalification-modal");

  if (!form) return;

  const questions = Array.from(
    form.querySelectorAll(".prequal-question")
  );

  const contact = form.querySelector("#prequal-contact");
  const navigation = form.querySelector("#prequal-navigation");
  const nextButton = form.querySelector("#prequal-next");
  const prevButton = form.querySelector("#prequal-prev");

  const progressBar = form.querySelector("#prequal-progress");
  const counter = form.querySelector("#prequal-counter");

  const result = form.querySelector("#prequal-result");
  const passMessage = form.querySelector("#prequal-pass");
  const failMessage = form.querySelector("#prequal-fail");

  if (
    !questions.length ||
    !contact ||
    !navigation ||
    !nextButton ||
    !prevButton
  ) {
    return;
  }


  let currentStep = 0;


  // ---------------------------------------
  // Show current question
  // ---------------------------------------

  const showQuestion = (index) => {
    questions.forEach((question, questionIndex) => {
      question.classList.toggle(
        "hidden",
        questionIndex !== index
      );
    });

    updateProgress();
    updateButtons();
  };


  // ---------------------------------------
  // Progress
  // ---------------------------------------

  const updateProgress = () => {
    const total = questions.length;
    const current = currentStep + 1;
    const percentage = (current / total) * 100;

    if (progressBar) {
      progressBar.style.width = `${percentage}%`;
    }

    if (counter) {
      counter.textContent = `${current} / ${total}`;
    }
  };


  // ---------------------------------------
  // Is current question answered?
  // ---------------------------------------

  const isCurrentQuestionAnswered = () => {
    const question = questions[currentStep];

    if (!question) return false;

    return !!question.querySelector(
      'input[type="radio"]:checked'
    );
  };


  // ---------------------------------------
  // Button state
  // ---------------------------------------

  const updateButtons = () => {
    const answered = isCurrentQuestionAnswered();

    nextButton.disabled = !answered;

    nextButton.classList.toggle(
      "opacity-40",
      !answered
    );

    nextButton.classList.toggle(
      "cursor-not-allowed",
      !answered
    );


    // Back button
    if (currentStep === 0) {
      prevButton.classList.add("hidden");
    } else {
      prevButton.classList.remove("hidden");
    }


    // Last question
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


  // ---------------------------------------
  // Radio changes
  // ---------------------------------------

  form
    .querySelectorAll('input[type="radio"]')
    .forEach((radio) => {

      radio.addEventListener("change", () => {
        updateButtons();
      });

    });


  // ---------------------------------------
  // Qualification logic
  // ---------------------------------------

  const checkQualification = () => {

    const getAnswer = (name) => {
      const selected = form.querySelector(
        `input[name="${name}"]:checked`
      );

      return selected ? selected.value : null;
    };


    const q1 = getAnswer("q1");
    const q2 = getAnswer("q2");
    const q4 = getAnswer("q4");
    const q5 = getAnswer("q5");
    const q6 = getAnswer("q6");
    const q7 = getAnswer("q7");
    const q8 = getAnswer("q8");


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


  // ---------------------------------------
  // Show result + contact form
  // ---------------------------------------

  const showResult = () => {
  const qualified = checkQualification();

  // Hide question
  questions.forEach((question) => {
    question.classList.add("hidden");
  });

  // Hide question navigation
  navigation.classList.add("hidden");

  // Hide header
  const header = modal?.querySelector("#prequal-header");

if (header) {
  header.classList.add("hidden");
}

const progressContainer = modal?.querySelector("#prequal-progress-bar");

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

  // Show contact form BELOW result
  contact.classList.remove("hidden");
};


  // ---------------------------------------
  // Next
  // ---------------------------------------

  nextButton.addEventListener("click", () => {

    // Do nothing until answer selected
    if (!isCurrentQuestionAnswered()) {
      return;
    }


    // Last question → evaluate
    if (currentStep === questions.length - 1) {

      showResult();

      return;
    }


    currentStep++;

    showQuestion(currentStep);
  });


  // ---------------------------------------
  // Back
  // ---------------------------------------

  prevButton.addEventListener("click", () => {

    if (currentStep <= 0) {
      return;
    }

    currentStep--;

    showQuestion(currentStep);
  });


  // ---------------------------------------
  // Final contact form submission
  // ---------------------------------------

  form.addEventListener("submit", (event) => {

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


    /*
      Actual form submission will be added later.
      For now, this confirms the UI flow.
    */

    console.log("Prequalification submitted:", {
      name: name.value,
      phone: phone.value,
      email: email.value,
      qualified: checkQualification()
    });
  });


  // ---------------------------------------
  // Initial state
  // ---------------------------------------

  showQuestion(0);
}