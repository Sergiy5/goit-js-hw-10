import './css/styles.css';
import debounce from 'lodash.debounce';
import Handlebars from 'handlebars';
import API from './fetchCountries';
import tempTargetCountry from './tamplates/targetCountry';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// У проектах посилання виносятся у окремий файл (наприклад об'єкт "refs") та імпортуються в основний

const handlTargetCountry = Handlebars.compile(tempTargetCountry);
const input = document.querySelector('#search-box');
const DEBOUNCE_DELAY = 2000;  
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

input.addEventListener('input',  debounce(serchCountry, DEBOUNCE_DELAY));

function serchCountry(e) {
  e.preventDefault();
  
  const inputData = input.value.trim();
cleanHtml();
  
  if (inputData == "") {
  return notyIfstringEmpty();
}
  API.fetchDataCountry(inputData)
    .then(markupCountries)
    .catch(onFetchRejact)
    .finally(() => inputData);
};

function markupCountries(data) {

  if (data.length > 10) {

    return onFetchNotify();

  } else if (data.length >= 2 && data.length <= 10) {

    markupListCounries(data);

  } else if (data.length === 1) {

    markupOneCountries(data);

  } else (data.length === 0); {
   
     return onFetchRejact()
  }
}

function markupListCounries() {
  const countriesListMarkup = data
    .map(({ flags, name }) => {
      return `<li>
        <h3><img src="${flags.png}" width = '30' alt="${name.official}">  ${name.official}</h3>
        </li>`;
    })
    .join('');

  return countryList.insertAdjacentHTML('beforeend', countriesListMarkup);
}

function markupOneCountries() {
  // Шаблон створений за допомогою шаблонізатору Handlebars
  return (countryInfo.innerHTML = handlTargetCountry(...data));
}

function onFetchRejact() {
  Notify.failure('Oops, there is no country with that name');
}

function onFetchNotify() {
  Notify.success('Too many matches found. Please enter a more specific name.');
}

function notyIfstringEmpty() {
  Notify.success('This string is empty.');
}

function cleanHtml() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}