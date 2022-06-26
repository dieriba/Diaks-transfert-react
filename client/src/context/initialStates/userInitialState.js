const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

export const userInitialState = {
  user: user ? JSON.parse(user) : null,
  token: token ? token : '',
  role: '',
};
