import { jobTemplate } from './templates';
import { extractFormData } from './utils';


export class JobSearch {
  
  constructor() {
    this.searchForm = document.querySelector('#search-form');
    this.resultContainer = document.querySelector('.result-container');
    this.configureFormListener();
  }

configureFormListener() {
  this.searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const { search, location } = extractFormData(this.searchForm);
    fetch(`http://localhost:3000/?search=${search}&location=${location}`)
    .then(response => response.json())
    .then(({ results }) => results.map(jobTemplate).join(''))
    .then(jobs => this.resultContainer.innerHTML = jobs);
  });
}
}

