const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userRole = localStorage.getItem('userRole');

export const authInitialState = {
  user: user ? JSON.parse(user) : null,
  token: token ? token : '',
  userRole: userRole ? userRole : '',
  nameUser: user ? JSON.parse(user).username : '',
  newPasswordAccount: '',
  confirmNewPasswordAccount: '',
  oldPasswordAccount: '',
  isLoading: false,
  errorStatus: '',
  alertText: '',
  cleanError: '',
  showAlert: false,
};
