const form = document.querySelector('.contact__form');

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

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  console.log(formData);

  const contactData = {
    eventType: formData.get('event-type'),
    eventDate: formData.get('event-date'),
    eventTime: formData.get('event-time'),
    name: formData.get('name'),
    contactMethod: formData.get('contact-method'),
    contactTime: formData.get('contact-time'),
  };

  sessionStorage.setItem('contactFormData', JSON.stringify(contactData));

  window.location.href = '/pages/contact.html?form=services&step=2';
});

document
  .querySelector('.contact__tab[data-form-type="classes"]')
  .addEventListener('click', () => {
    window.location.href = '/pages/contact.html?form=classes&step=1';
  });

document.querySelectorAll('input[name="contact-method"]').forEach((radio) => {
  radio.addEventListener('change', updateContactMethod);
});

updateContactMethod();
