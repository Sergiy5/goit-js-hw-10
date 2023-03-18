import './css/styles.css';
import debounce from 'lodash.debounce';
import Handlebars from 'handlebars';
import API from './fetchCountries';
import tempTargetCountry from './tamplates/targetCountry';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// У проектах змінні виносятся у окремий файл (наприклад в об'єкт "refs" через створену функцію яку імпортують) та імпортуються в основний

const input = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');
const handlTargetCountry = Handlebars.compile(tempTargetCountry);
const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(serchCountry, DEBOUNCE_DELAY));

function serchCountry(e) {
  e.preventDefault();

  const inputData = input.value.trim();
  cleanHtml();

  if (inputData == '') {
    return;
  }
  API.fetchDataCountry(inputData).then(markupCountries).catch(onFetchRejact);
  // .finally(() => );
}

function markupCountries(data) {
  if (data.length > 10) {
    return notyIfToMuchCountries();
  } else if (data.length >= 2 && data.length <= 10) {
    return markupListCounries(data);
  } else if (data.length === 1) {
    return markupOneCountry(data);
  } else data.length === 0;
  {
    return onFetchRejact();
  }
}

function markupListCounries(data) {
  const countriesListMarkup = data
    .map(({ flags, name }) => {
      return `<li>
        <h3><img src="${flags.png}" width = '30' alt="${name.official}">  ${name.official}</h3>
        </li>`;
    })
    .join('');

  return countryList.insertAdjacentHTML('beforeend', countriesListMarkup);
}

function markupOneCountry(data) {
  // Шаблон створений за допомогою шаблонізатору Handlebars
  return (countryInfo.innerHTML = handlTargetCountry(...data));
}

function onFetchRejact() {
  Notify.failure('Oops, there is no country with that name', {
    position: 'center-top',
  });
}

function notyIfToMuchCountries() {
  Notify.success('Too many matches found. Please enter a more specific name.', {
    position: 'center-top',
  });
}

function cleanHtml() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}
