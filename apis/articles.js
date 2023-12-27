import axios from 'axios';
import { API_KEYS } from '../config/api-keys.js';

export async function getEnvironmentalArticles(topic) {
  const apiUrl = `https://newsapi.org/v2/top-headlines?q=${topic}&apiKey=${API_KEYS.NEWS_API}`;

  return new Promise((resolve, reject) => {
    axios.get(apiUrl)
      .then(response => {
        const articles = response.data.articles;
        resolve(articles);
      })
      .catch(error => {
        reject(error.response ? error.response.data : error.message);
      });
  });
}