import { getToken } from './JWT-common';

const isAuthenticated = () => !!getToken();

export default isAuthenticated;
