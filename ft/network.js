const networkBase = 'http://192.168.1.100:4000';

export const SignUp = props =>
  fetch(networkBase + '/signup', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email: props.id,
      password: props.name,
    }),
  });
