import axios from 'axios';

function getEnvironmentalArticles(apiKey) {
  const apiUrl = `https://newsapi.org/v2/top-headlines?q=environment&apiKey=${apiKey}`;

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

// Example usage:
const apiKey = '9853f504c557435a90e5bc45a1a3a599';

getEnvironmentalArticles(apiKey)
  .then(articles => {
    articles.forEach(article => {
      console.log(`Title: ${article.title}`);
      console.log(`Author: ${article.author}`);
      console.log(`Description: ${article.description}`);
      console.log(`URL: ${article.url}`);
      console.log('---');
    });
  })
  .catch(error => {
    console.error('Error fetching articles:', error);
  });