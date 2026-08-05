const contactButton = document.querySelector('#contactButton');

if (contactButton) {
  const contact = document.querySelector('.floating-contact');
  const contactImg = contactButton.querySelector('img');

  const currentIconPath = contactImg.getAttribute('src');
  const iconFolder = currentIconPath.slice(
    0,
    currentIconPath.lastIndexOf('/') + 1
  );

  contactButton.addEventListener('click', () => {
    contact.classList.toggle('is-open');

    const isOpen = contact.classList.contains('is-open');

    contactButton.setAttribute('aria-expanded', String(isOpen));
    contactButton.setAttribute(
      'aria-label',
      isOpen ? 'Close contact options' : 'Open contact options'
    );

    contactImg.src = isOpen
      ? `${iconFolder}cross-outline.svg`
      : `${iconFolder}contact.svg`;
  });
}
