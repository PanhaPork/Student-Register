'use strict';

const form = document.getElementById('registrationForm');
const nameField = document.getElementById('studentName');
const idField = document.getElementById('studentId');
const emailField = document.getElementById('emailAddress');
const courseField = document.getElementById('courseSelection');
const agreeField = document.getElementById('agreeTerms');
const confirmation = document.getElementById('confirmation');
const formCard = document.querySelector('.form-card');

const fields = [nameField, idField, emailField, courseField];
const errorElements = {
  studentName: document.getElementById('studentNameError'),
  studentId: document.getElementById('studentIdError'),
  emailAddress: document.getElementById('emailAddressError'),
  courseSelection: document.getElementById('courseSelectionError'),
  agreeTerms: document.getElementById('agreeTermsError')
};

function setError(field, message) {
  field.classList.toggle('invalid', Boolean(message));
  field.setAttribute('aria-invalid', message ? 'true' : 'false');
  errorElements[field.id].textContent = message;
}

function validateName() {
  const value = nameField.value.trim();
  if (!value) return setError(nameField, 'Please enter the student name.'), false;
  if (value.length < 2) return setError(nameField, 'Name must contain at least 2 characters.'), false;
  setError(nameField, '');
  return true;
}

function validateStudentId() {
  const value = idField.value.trim();
  if (!value) return setError(idField, 'Please enter the student ID.'), false;
  if (value.length < 3) return setError(idField, 'Student ID must contain at least 3 characters.'), false;
  setError(idField, '');
  return true;
}

function validateEmail() {
  const value = emailField.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value) return setError(emailField, 'Please enter an email address.'), false;
  if (!emailPattern.test(value)) return setError(emailField, 'Please enter a valid email, e.g. name@example.com.'), false;
  setError(emailField, '');
  return true;
}

function validateCourse() {
  if (!courseField.value) return setError(courseField, 'Please select a course.'), false;
  setError(courseField, '');
  return true;
}

function validateAgreement() {
  errorElements.agreeTerms.textContent = agreeField.checked ? '' : 'Please confirm that your information is correct.';
  return agreeField.checked;
}

function validateForm() {
  const results = [validateName(), validateStudentId(), validateEmail(), validateCourse(), validateAgreement()];
  return results.every(Boolean);
}

function showConfirmation() {
  document.getElementById('summaryName').textContent = nameField.value.trim();
  document.getElementById('summaryId').textContent = idField.value.trim();
  document.getElementById('summaryEmail').textContent = emailField.value.trim();
  document.getElementById('summaryCourse').textContent = courseField.value;
  form.hidden = true;
  confirmation.hidden = false;
  confirmation.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  if (!validateForm()) {
    const firstInvalid = form.querySelector('.invalid') || (!agreeField.checked ? agreeField : null);
    if (firstInvalid) firstInvalid.focus();
    return;
  }
  showConfirmation();
});

nameField.addEventListener('input', validateName);
idField.addEventListener('input', validateStudentId);
emailField.addEventListener('input', validateEmail);
courseField.addEventListener('change', validateCourse);
agreeField.addEventListener('change', validateAgreement);

// Course cards pre-select a course and scroll to the registration form.
document.querySelectorAll('.choose-course').forEach(function (button) {
  button.addEventListener('click', function () {
    courseField.value = button.dataset.course;
    validateCourse();
    document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
  });
});

document.getElementById('editRegistration').addEventListener('click', function () {
  confirmation.hidden = true;
  form.hidden = false;
  document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
  nameField.focus({ preventScroll: true });
});

document.getElementById('newRegistration').addEventListener('click', function () {
  form.reset();
  fields.forEach(function (field) { setError(field, ''); });
  errorElements.agreeTerms.textContent = '';
  confirmation.hidden = true;
  form.hidden = false;
  document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
  nameField.focus({ preventScroll: true });
});

form.addEventListener('reset', function () {
  window.setTimeout(function () {
    fields.forEach(function (field) { setError(field, ''); });
    errorElements.agreeTerms.textContent = '';
  }, 0);
});
