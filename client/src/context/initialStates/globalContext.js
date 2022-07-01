const globalInitialState = {
  isOnMobile: window.innerWidth < 1000 ? true : false,
  windowWidth: window.innerWidth,
  rate: '',
  amountEuro: '',
  amountGnf: '',
  fees: '',
  searchTransfertCode: '',
  showSidebar: false,
};

export default globalInitialState;
