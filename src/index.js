import './styles/styles.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import refs from './js/refs.js';
import countryCard from './templates/templatesCountry.hbs';
import countryList from './templates/templatesCountryList.hbs';
import countriesFetch from './js/countryFetch.js';
import { error, notice, success } from '@pnotify/core';

const debounce = require('lodash.debounce');
refs.input.addEventListener('input', debounce(inputSearch, 500));

function inputSearch(event) {
  if (!event.target.value) {
    refs.output.innerHTML = '';
    return;
  }
  countriesFetch(event.target.value)
    .then(countries => {
      if (countries.status === 404) {
        return Promise.reject(
          'ERROR! The country not found.',
        );
      }

      if (countries.length > 10) {
        refs.output.innerHTML = countryList(countries),
        notice({
          text: 'Please enter a more specific query!', 
        });
        return;
      }

      if (countries.length >= 2 ) {
        refs.output.innerHTML = countryList(countries)
        success({
          text: `${countries.length} Country was found, but enter a more specific query!`, 
        });
      }else{
        refs.output.innerHTML = countryCard(countries) 
      }
    })
    .catch(err => {
      error({
        text: err,
      });
    });
}





