const networkBase = 'http://192.168.1.100:4000';

export const CreateListing = (props) =>
  fetch(networkBase + '/createlisting/', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      title: props.title,
      description: props.description,
      location: props.geohash,
      lat: props.latitude,
      lon: props.longitude,
    }),
  }).then(response => response.json());
