document.getElementById('searchButton').addEventListener('click', () => {
    const countryName = document.getElementById('countryInput').value.trim();
    const countryInfoDiv = document.getElementById('countryInfo');
  
    if (!countryName) {
      countryInfoDiv.innerHTML = '<div class="alert alert-warning">Please enter a country name.</div>';
      return;
    }
  
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then(response => {
        if (!response.ok) throw new Error('Country not found');
        return response.json();
      })
      .then(data => {
        const country = data[0];
        countryInfoDiv.innerHTML = `
          <div class="card">
            <div class="card-header">
              <h5>${country.name.common}</h5>
            </div>
            <div class="card-body">
            <img src="${country.flags.svg}" alt="${country.name.common} Flag" class="img-fluid mt-3" style="max-height: 150px;">
              <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
              <p><strong>Region:</strong> ${country.region}</p>
              <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
              <p><strong>Language(s):</strong> ${Object.values(country.languages || {}).join(', ')}</p>
              
            </div>
          </div>
        `;
      })
      .catch(error => {
        countryInfoDiv.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
      });
  });
  