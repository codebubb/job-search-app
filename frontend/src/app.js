import { JobSearch } from './JobSearch';

const jobSearch = new JobSearch('#search-form', '.result-container');
jobSearch.setCountryCode();
jobSearch.configureFormListener();
