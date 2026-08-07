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
 * @param {number} stepNumber - The initial step number.
 */
const initializeForm = (formType, stepNumber = 1) => {
  resetContactForm();
  showFormType(formType);
  showStep(formType, stepNumber);
};

/**
 * Restores data passed from the home page.
 */
const restoreHomeFormData = () => {
  const savedData = sessionStorage.getItem('contactFormData');

  if (!savedData) {
    return;
  }

  const data = JSON.parse(savedData);

  const nameInput = document.querySelector('#name-service');

  if (nameInput && data.name) {
    nameInput.value = data.name;
  }

  sessionStorage.removeItem('contactFormData');
};

/**
 * Displays Services step 3 with data from steps 1 and 2.
 */
const showServicesThanks = () => {
  const name = document.querySelector('#name-service')?.value ?? '';

  const premiumServices = [
    ...document.querySelectorAll('input[name="premium"]:checked'),
  ].map((input) => input.closest('label').textContent.trim());

  const thanks = form.querySelector(
    '.contact-form__flow--services [data-step="3"]'
  );

  /*
   * Customer name
   */
  const nameElement = thanks.querySelectorAll('.name');

  nameElement.forEach((element) => {
    element.textContent = name;
  });

  /*
   * Premium services
   */
  const premiumList = thanks.querySelector('.contact__quote__item-premium');

  if (premiumList) {
    premiumList.innerHTML = '';

    if (premiumServices.length === 0) {
      const item = document.createElement('li');
      item.textContent = 'None';
      premiumList.appendChild(item);
    } else {
      premiumServices.forEach((service) => {
        const item = document.createElement('li');

        item.textContent = service;
        premiumList.appendChild(item);
      });
    }
  }

  showStep('services', 3);
};

/**
 * Displays Classes step 2 with data from steps 1.
 */
const showClassesThanks = () => {
  const name = document.querySelector('#name-class')?.value ?? '';

  const thanks = form.querySelector(
    '.contact-form__flow--classes [data-step="2"]'
  );

  /*
   * Customer name
   */
  const nameElement = thanks.querySelectorAll('.name');

  nameElement.forEach((element) => {
    element.textContent = name;
  });

  showStep('classes', 2);
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
    showServicesThanks();
    return;
  }

  if (formType === 'classes' && stepNumber === 1) {
    showClassesThanks();
    return;
  }
});

document.querySelectorAll('input[name="contact-method"]').forEach((radio) => {
  radio.addEventListener('change', updateContactMethod);
});

/**
 * Initial state
 *
 * Normal:
 *   /pages/contact.html
 *   → Services Step 1
 *
 * From home:
 *   /pages/contact.html?form=services&step=2
 *   → Services Step 2
 */
const params = new URLSearchParams(window.location.search);

const initialFormType =
  params.get('form') === 'classes' ? 'classes' : 'services';

const initialStep = Number(params.get('step')) || 1;

initializeForm(initialFormType, initialStep);

restoreHomeFormData();
