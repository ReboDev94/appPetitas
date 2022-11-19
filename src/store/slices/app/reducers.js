const reducers = {
    setPets: (state, { payload }) => {
        state.app.pets = payload
    }
};

export default reducers;
