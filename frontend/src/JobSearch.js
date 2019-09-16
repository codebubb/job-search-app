import { jobTemplate } from './templates';
import { extractFormData } from './utils';


export class JobSearch {
  constructor(searchFormSelector, resultsContainerSelector) {
    this.searchForm = document.querySelector(searchFormSelector);
    this.resultsContainer = document.querySelector(resultsContainerSelector);
  }

  setCountryCode() {
    fetch('https://ip-api.com/json')
      .then(results => results.json())
      .then(results => this.countryCode = results.countryCode);
  }

  configureFormListener() {
    this.searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const { search, location } = extractFormData(this.searchForm);
    fetch(`http://localhost:3000/?search=${search}&location=${location}&countryCode=${this.countryCode}`)
    .then(response => response.json())
    .then(({ results }) => results.map(jobTemplate).join(''))
    .then(jobs => this.resultsContainer.innerHTML = jobs);
  });
}
}

