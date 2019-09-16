import { JobSearch } from './JobSearch';

const jobSearch = new JobSearch('#search-form', '.resultsContainer');
jobSearch.setCountryCode();
jobSearch.configureFormListener();
