function fetchDataCountry(country) {
  const BASE_URL = 'https://restcountries.com/v3.1'; 
  return fetch(
    `${BASE_URL}/name/${country}?fields=name,capital,population,flags,languages`
  ).then(response => {
    //  На разі частина про помилку 404 не обов'язкова тому що це виправили і в than не потрапляє
    if (!response.ok) {
     
      if (response.status === 404) {
        return [];
      }
      throw new Error();
    }
    const data = response.json();
    return data;
  });
}
export default { fetchDataCountry };
