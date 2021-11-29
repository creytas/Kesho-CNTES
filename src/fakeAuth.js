export const fakeAuth = {
  isAuthenticated: false,

  login(callBack) {
    fakeAuth.isAuthenticated = true;
    callBack();
  },

  logout(callBack) {
    localStorage.clear();
    fakeAuth.isAuthenticated = false;
    console.log('deconncter');

    callBack();
  }
};
