import SpeechRecognition from 'react-speech-recognition';
import classes from './basestyle.module.css';
import { findAnswer } from './knowledgeData';
import { knowledgeImages } from './knowledgeImages';

const Baseknow = () => {
  let form = document.getElementById('dialog__form');
  let input = document.getElementById('dialog__input');
  let button = document.getElementById('dialog__button');
  let messanger = document.getElementById('dialog__messanger');

  form.addEventListener('submit', handleForm);

  function handleForm(e) {
    if (e) e.preventDefault();
    if (input.value !== '') {
      messanger.innerHTML += `<div class=${classes.question}>${input.value}</div>`;
      let { text, extras } = findAnswer(input.value);
      messanger.innerHTML += `<div class="dialog__message answer">${text}<br/></div>`;
      extras.forEach((extra) => {
        if (knowledgeImages[extra]) {
          messanger.innerHTML += `<img alt="что-то пошло не так.." loading="lazy" class=${classes.knowImage} src=${knowledgeImages[extra]}/>`;
        } else {
          messanger.innerHTML += extra;
        }
      });
      messanger.scrollTop = 99999;

      let utterance = new SpeechSynthesisUtterance(text);
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
    recognizer.lang = 'ru-Ru';
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
