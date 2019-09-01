const networkBase = 'http://192.168.1.100:4000';

export const ShowListing = () =>
  fetch(networkBase + '/yourlisting/')
     .then(response => response.json())
