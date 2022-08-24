/* eslint-disable import/prefer-default-export */

export const settings = {
  baseUrl: process.env.REACT_APP_API_BASEURL,
  auth0Domain: process.env.REACT_APP_AUTH0_DOMAIN,
  auth0ClientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  auth0RedirectUrl: process.env.REACT_APP_AUTH0_REDIRECT_URL,
  login: '/login',
  sector: {
    addSector: '/api/AddSector',
    getSectors: '/api/getSectorsList',
    deleteSector: '/api/deleteSector/$[id]',
    updateSector: '/api/updatesector/$[id]',
    getSectorById: '/api/getSectorById/$[id]',
  },
};

export const getAccessToken = () => localStorage.getItem('accessToken');
export const removeAccessToken = () => localStorage.removeItem('accessToken');

export const getColorArray = (num) => {
  const result = [];
  for (let i = 0; i < num; i += 1) {
    const letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let j = 0; j < 6; j += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    result.push(color);
  }
  return result;
};
