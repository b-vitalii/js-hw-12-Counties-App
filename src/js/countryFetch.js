export default function countriesFetch(searchQuery) {
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
  .then(response => response.json());
}