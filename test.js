var requestOptions = {
  method: 'GET',
};

fetch("https://api.geoapify.com/v1/geocode/reverse?lat=51.21709661403662&lon=6.7782883744862374&apiKey=dbce2b245b214e66b2ff3a7e40680993", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result.features[0].properties.country))
  .catch(error => console.log('error', error));