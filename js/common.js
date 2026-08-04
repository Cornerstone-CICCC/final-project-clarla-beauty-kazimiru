const contactButton = document.querySelector('#contactButton');
const contactImg = contactButton.querySelector('img');
const contact = document.querySelector('.contact');
contactButton.addEventListener('click', () => {
  contact.classList.toggle('is-open');

  if (contact.classList.contains('is-open')) {
    contactImg.src = 'assets/icons/cross-outline.svg';
  } else {
    contactImg.src = 'assets/icons/contact.svg';
  }
});
