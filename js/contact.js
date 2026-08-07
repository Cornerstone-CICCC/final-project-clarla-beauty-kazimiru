const tabs = document.querySelectorAll('.contact__tab');
const flows = document.querySelectorAll('.contact-form__flow');
const form = document.querySelector('.contact__form');

let currentFormType = 'services';

const showFormType = (formType) => {
  flows.forEach((flow) => {
    const isActive = flow.dataset.formType === formType;

    flow.hidden = !isActive;
    flow.disabled = !isActive;
  });

  currentFormType = formType;
};

const showStep = (formType, stepNumber) => {
  const flow = form.querySelector(`[data-form-type="${formType}"]`);
  const steps = flow.querySelectorAll('[data-step]');

  steps.forEach((step) => {
    step.hidden = step.dataset.step !== String(stepNumber);
  });
};

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const formType = tab.dataset.formType;

    showFormType(formType);
    showStep(formType, 1);

    tabs.forEach((tab) => {
      tab.classList.remove('contact__tab--active');
    });
    tab.classList.add('contact__tab--active');
  });
});

const contactMethods = document.querySelectorAll(
  'input[name="contact-method"]'
);

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

contactMethods.forEach((radio) => {
  radio.addEventListener('change', updateContactMethod);
});

showFormType('services');
showStep('services', 1);
updateContactMethod();
