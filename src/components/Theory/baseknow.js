import SpeechRecognition from 'react-speech-recognition';
import classes from './basestyle.module.css';
import { findAnswer } from './knowledgeData';
import { knowledgeImages } from './knowledgeImages';

const SPEECH_LOCALE = { ru: 'ru-Ru', en: 'en-US' };
const NOT_FOUND_ALT = { ru: 'что-то пошло не так..', en: 'something went wrong..' };

// `getLanguage` is read fresh on every interaction (not captured once at mount),
// so switching the site's language mid-session updates the assistant immediately.
const Baseknow = (getLanguage = () => 'ru') => {
  let form = document.getElementById('dialog__form');
  let input = document.getElementById('dialog__input');
  let button = document.getElementById('dialog__button');
  let messanger = document.getElementById('dialog__messanger');

  form.addEventListener('submit', handleForm);

  function handleForm(e) {
    if (e) e.preventDefault();
    if (input.value !== '') {
      const language = getLanguage();
      messanger.innerHTML += `<div class=${classes.question}>${input.value}</div>`;
      let { text, extras } = findAnswer(input.value, language);
      messanger.innerHTML += `<div class="dialog__message answer">${text}<br/></div>`;
      extras.forEach((extra) => {
        if (knowledgeImages[extra]) {
          messanger.innerHTML += `<img alt="${NOT_FOUND_ALT[language]}" loading="lazy" class=${classes.knowImage} src=${knowledgeImages[extra]}/>`;
        } else {
          messanger.innerHTML += extra;
        }
      });
      messanger.scrollTop = 99999;

      let utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = SPEECH_LOCALE[language];
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    }
    input.value = '';
  }

  input.addEventListener('click', inputClick, false);

  function inputClick() {
    speechSynthesis.cancel();
  }

  button.addEventListener('mouseover', buttonOver, false);
  button.addEventListener('mouseout', buttonOut, false);
  button.addEventListener('click', buttonClick, false);

  function buttonOver() {
    button.classList.add('dialog__button-hover');
  }

  function buttonOut() {
    button.classList.remove('dialog__button-hover');
  }

  function buttonClick() {
    button.classList.add('dialog__button-listen');

    speechSynthesis.cancel();

    let recognizer = new SpeechRecognition(); //webkit..
    recognizer.interimResults = true;
    recognizer.lang = SPEECH_LOCALE[getLanguage()];
    recognizer.onresult = function (event) {
      let result = event.results[event.resultIndex];
      if (result.isFinal) {
        input.value = result[0].transcript;
        button.classList.remove('dialog__button-listen');
        handleForm();
      } else {
        input.value = result[0].transcript;
      }
    };
    recognizer.onaudioend = function () {
      button.classList.remove('dialog__button-listen');
    };
    recognizer.start();
  }
};

export default Baseknow;
