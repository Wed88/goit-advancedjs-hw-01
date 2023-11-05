import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'feedback-form-state';
const feedbackFormEl = document.querySelector('.feedback-form');

initForm();

feedbackFormEl.addEventListener('input', event => {
  event.preventDefault;
  const formData = new FormData(feedbackFormEl);
});

function onfeedbackForm(event) {
  let persistedForm = localStorage.getItem(LOCALSTORAGE_KEY);
  persistedForm = persistedForm ? JSON.parse(persistedForm) : {};
  persistedForm[event.target.name] = event.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(persistedForm));
  console.log(persistedForm);
}

feedbackFormEl.addEventListener('input', throttle(onfeedbackForm, 500));

feedbackFormEl.addEventListener('submit', () => {
  console.log('feedback-form-state', JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
  localStorage.removeItem(LOCALSTORAGE_KEY);
});

function initForm() {
  let persistedForm = localStorage.getItem(LOCALSTORAGE_KEY);
  if (persistedForm) {
    persistedForm = JSON.parse(persistedForm);
    Object.entries(persistedForm).forEach(([name, value]) => {
      feedbackFormEl.elements[name].value = value;
    });
  }
}
