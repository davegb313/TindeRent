const networkBase = 'http://192.168.1.100:4000';
import * as FB from 'expo-facebook';

const FACEBOOK_APP_ID = '381958572469333';

let sessionToken, sessionProfile;

export const LoginFB = () =>
  FB.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
    permissions: ['public_profile'],
    behavior: 'native',
  }).then(({
    type,
    token,
    expires,
    permissions,
    declinedPermissions,
  }) => {
    sessionToken = token;
    if (type === 'success')
      // Get the user's name using Facebook's Graph API
      return fetch(`https://graph.facebook.com/me?access_token=${token}`)
        .then(response => response.json())
        .then(profile => {
          sessionProfile = profile;
        }); // type === 'cancel'
    else
      console.log('the govt is corrupt');
  });

export const ShowListing = () =>
  fetch(networkBase + '/yourlisting/').then(response => response.json()).then(()=> sessionProfile);

export const CreateListing = props =>
  fetch(networkBase + '/makelisting/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Autorizantion: 'Bearer ' + sessionToken,
    },
    body: JSON.stringify({
      title: props.title,
      description: props.description,
      location: props.geohash,
      lat: props.latitude,
      lon: props.longitude,
      author: sessionProfile.id,
    }),
  }).then(createResponse => createResponse.text());

export const ShowOneListing = () =>
  fetch(networkBase + '/yourlisting/', {
    body: JSON.stringify({author: sessionProfile.id}),
  }).then(response => response.json());
