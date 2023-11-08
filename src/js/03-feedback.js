import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'feedback-form-state';
const feedbackFormEl = document.querySelector('.feedback-form');

initForm();

function onFeedbackForm(event) {
  let persistedForm = localStorage.getItem(LOCALSTORAGE_KEY);
  persistedForm = persistedForm ? JSON.parse(persistedForm) : {};
  persistedForm[event.target.name] = event.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(persistedForm));
}

feedbackFormEl.addEventListener('input', throttle(onFeedbackForm, 500));

feedbackFormEl.addEventListener('submit', onFeedbackFormSubmit);

function onFeedbackFormSubmit(event) {
  event.preventDefault();
  const formElements = event.currentTarget.elements;
  const email = formElements.email.value;
  const message = formElements.message.value;
  if (email === '' || message === '') {
    return alert('Attention! All fields must be completed');
  } else {
    console.log('feedback-form-state', JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
    localStorage.removeItem(LOCALSTORAGE_KEY);
    event.currentTarget.reset();
  }
}

function initForm() {
  let persistedForm = localStorage.getItem(LOCALSTORAGE_KEY);
  if (persistedForm) {
    persistedForm = JSON.parse(persistedForm);
    Object.entries(persistedForm).forEach(([name, value]) => {
      feedbackFormEl.elements[name].value = value;
    });
  }
};


