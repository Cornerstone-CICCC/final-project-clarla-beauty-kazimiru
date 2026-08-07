const tabs = document.querySelectorAll('.contact__tab');
const flows = document.querySelectorAll('.contact-form__flow');
const form = document.querySelector('.contact__form');

/**
 * Displays the form flow and activates the corresponding tab.
 * @param {string} formType - The type of form to display.
 */
const showFormType = (formType) => {
  flows.forEach((flow) => {
    const isActive = flow.dataset.formType === formType;

    flow.hidden = !isActive;
    flow.disabled = !isActive;
  });

  tabs.forEach((tab) => {
    tab.classList.toggle(
      'contact__tab--active',
      tab.dataset.formType === formType
    );
  });
};

/**
 * Displays the specified step of a form flow.
 * @param {string} formType - The type of form flow.
 * @param {number} stepNumber - The step number to display.
 */
const showStep = (formType, stepNumber) => {
  const flow = form.querySelector(
    `.contact-form__flow[data-form-type="${formType}"]`
  );
  const steps = flow.querySelectorAll('[data-step]');

  steps.forEach((step) => {
    const isActive = step.dataset.step === String(stepNumber);
    step.hidden = !isActive;
    step.disabled = !isActive;
  });
};

/**
 * Resets the contact form and hides all form steps.
 */
const resetContactForm = () => {
  form.reset();

  flows.forEach((flow) => {
    flow.querySelectorAll('[data-step]').forEach((step) => {
      step.hidden = true;

      if (step instanceof HTMLFieldSetElement) {
        step.disabled = true;
      }
    });
  });

  updateContactMethod();
};

/**
 * Updates the visibility and enabled state of contact method inputs
 * based on the selected radio button.
 */
const updateContactMethod = () => {
  document.querySelectorAll('.contact__method').forEach((method) => {
    const radio = method.querySelector('.contact__radio');
    const inputArea = method.querySelector('.contact__method-input');
    const inputs = inputArea.querySelectorAll('input, select');

    const isActive = radio.checked;

    inputArea.hidden = !isActive;

    inputs.forEach((input) => {
      input.disabled = !isActive;
    });
  });
};

/**
 * Initializes the contact form for the specified form type.
 * @param {string} formType - The type of form to initialize.
 */
const initializeForm = (formType) => {
  resetContactForm();
  showFormType(formType);
  showStep(formType, 1);
};

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    initializeForm(tab.dataset.formType);
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const activeFlow = form.querySelector('.contact-form__flow:not([hidden])');

  const activeStep = activeFlow.querySelector(
    '.contact-form__step:not([hidden])'
  );

  const formType = activeFlow.dataset.formType;
  const stepNumber = Number(activeStep.dataset.step);

  if (formType === 'services' && stepNumber === 1) {
    showStep('services', 2);
    return;
  }

  if (formType === 'services' && stepNumber === 2) {
    showStep('services', 3);
    return;
  }

  if (formType === 'classes' && stepNumber === 1) {
    showStep('classes', 2);
  }
});

document.querySelectorAll('input[name="contact-method"]').forEach((radio) => {
  radio.addEventListener('change', updateContactMethod);
});

initializeForm('services');
