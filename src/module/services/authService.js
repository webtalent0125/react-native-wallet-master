import { Config } from '../../config';

export const authService = {
  register,
  sendPhoneCode,
  verifyPhoneCode,
};

function register(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      type: 'user'
    }),
  };

  const url = `${Config.apiUrl}/auth/register`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((user) => {
      return user;
    });
}

function sendPhoneCode(phoneNumber, token) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      phoneNumber,
    }),
  };

  const url = `${Config.apiUrl}/auth/sendVerificationCode`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((result) => {
      return result;
    });
}

function verifyPhoneCode(phonecode, token) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      verificationCode: phonecode,
    }),
  };

  const url = `${Config.apiUrl}/auth/checkVerificationCode`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((result) => {
      return result;
    });
}

function handleResponse(response) {
  return response.text().then((text) => {
    if (!response.ok) {
      // if (response.status === 401 || response.status === 403) {
      //   logout();
      // }
      const data = text && JSON.parse(text);
      return Promise.reject(data);
    } else {
      const data = text && JSON.parse(text);
      return data;
    }
  });
}
