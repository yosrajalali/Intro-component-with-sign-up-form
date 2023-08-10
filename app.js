const form = document.querySelector('#form');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const emailAddress = document.querySelector('#emailAddress');
const password = document.querySelector('#password');

form.addEventListener('submit', (e) => {
  let messages = [];

  if (firstName.value.trim() === '') {
    messages.push({ field: firstName, message: 'First Name cannot be empty' });
  }
  if (lastName.value.trim() === '') {
    messages.push({ field: lastName, message: 'Last Name cannot be empty' });
  }
  if (emailAddress.value.trim() === '') {
    messages.push({
      field: emailAddress,
      message: 'Email Address cannot be empty',
    });
  } else if (!isValidEmail(emailAddress.value.trim())) {
    messages.push({
      field: emailAddress,
      message: 'Looks like this is not an email',
    });
  }
  if (password.value.trim() === '') {
    messages.push({ field: password, message: 'Password cannot be empty' });
  }

  if (messages.length > 0) {
    e.preventDefault();
    displayErrorMessages(messages);
  }
});

function displayErrorMessages(errors) {
  const existingErrorParagraphs = document.querySelectorAll('.error');

  // Remove any existing error paragraphs
  existingErrorParagraphs.forEach((paragraph) => {
    paragraph.parentNode.removeChild(paragraph);
  });

  const fieldsWithErrors = new Set();

  errors.forEach((error) => {
    const errorParagraph = document.createElement('p');
    errorParagraph.className = 'error';
    errorParagraph.textContent = error.message;
    error.field.parentNode.appendChild(errorParagraph);

    fieldsWithErrors.add(error.field.id);
  });

  // Remove error__icon class from fields without errors
  removeErrorIconClass(fieldsWithErrors);
}

function removeErrorIconClass(fieldsWithErrors) {
  [firstName, lastName, emailAddress, password].forEach((field) => {
    if (!fieldsWithErrors.has(field.id)) {
      field.classList.remove('error__icon');
    } else {
      field.classList.add('error__icon');
    }
  });
}

function isValidEmail(email) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}
