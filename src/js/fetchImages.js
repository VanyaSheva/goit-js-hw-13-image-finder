export default function fetchImages (query, counter){
    return fetch(`https://pixabay.com/api/?key=4823621-792051e21e56534e6ae2e472f&q=${query}&image_type=photo&per_page=12&page=${counter+=1}`)
      .then(response => response.json());
  }