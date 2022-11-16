/*,'checking' 'not-authenticated' . 'authenticated' */
const reducers = {
  login: (state, { payload }) => {
    state.status = "authenticated";
    state.uid = payload.uid;
    state.email = payload.email;
    state.displayName = payload.displayName;
    state.photoUrl = payload.photoURL;
    state.errorMessage = null;
  },
  logout: (state, { payload }) => {
    state.status = "not-authenticated";
    state.uid = null;
    state.email = null;
    state.displayName = null;
    state.photoUrl = null;
    state.errorMessage = payload?.errorMessage;
  },
  checkingCredentials: (state) => {
    state.status = "checking";
  },
  setLoading: (state, { payload }) => {
    state.loading = payload
  },
  setErrorMessage: (state, { payload }) => {
    state.errorMessage = payload
  }
};

export default reducers;
