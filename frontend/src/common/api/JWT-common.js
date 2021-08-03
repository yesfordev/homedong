export const saveToken = (token) => {
  window.localStorage.setItem('JWT-Token', token);
};
export const getToken = () => {
  return window.localStorage.getItem('JWT-Token');
};
export const deleteToken = () => {
  window.localStorage.removeItem('JWT-Token');
};
