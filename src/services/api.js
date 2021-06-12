import axios from 'axios';

const RAILS_URL = 'http://localhost:3000/api/v1/';

const rails = axios.create({
  baseURL: RAILS_URL,
});

export { rails };
