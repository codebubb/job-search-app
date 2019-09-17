import { jobTemplate } from './templates';
import { extractFormData, getCurrencySymbol } from './utils';


export class JobSearch {
  constructor(searchFormSelector, resultsContainerSelector) {
    this.searchForm = document.querySelector(searchFormSelector);
    this.resultsContainer = document.querySelector(resultsContainerSelector);
  }

  setCountryCode() {
    fetch('http://ip-api.com/json')
      .then(results => results.json())
      .then(results => {
        this.countryCode = results.countryCode.toLowerCase();
        this.setCurrencySymbol();
      })
      .catch(() => this.countryCode = 'us');
  }

  setCurrencySymbol() {
    this.currencySymbol = getCurrencySymbol(this.countryCode);
  }

  configureFormListener() {
    this.searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const { search, location } = extractFormData(this.searchForm);
    fetch(`http://localhost:3000/?search=${search}&location=${location}&country=${this.countryCode}`)
      .then(response => response.json())
      .then(({ results }) => {
        console.log(results);
        return results
          .map(job => jobTemplate(job, this.currencySymbol))
          .join('');
      })
      .then(jobs => this.resultsContainer.innerHTML = jobs);
    });
  }
}

