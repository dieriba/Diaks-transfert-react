const globalInitialState = {
  isOnMobile: window.innerWidth < 1000 ? true : false,
  windowWidth: window.innerWidth,
  searchTransfertCode: '',
  showSidebar: false,
};

export default globalInitialState;
