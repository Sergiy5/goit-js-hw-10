function fetchDataCountry(country) {
  const BASE_URL = 'https://restcountries.com/v3.1'; 
  return fetch(
    `${BASE_URL}/name/${country}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      //  На разі частина про помилку 404 не обов'язкова тому що це виправили (здається)
      if (response.status === 404) {
        return [];
      }
      throw new Error(response.status);
    }
    const data = response.json();
    return data;
  });
}
export default { fetchDataCountry };
