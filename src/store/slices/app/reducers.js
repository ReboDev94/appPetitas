const reducers = {
    setPets: (state, { payload }) => {
        state.pets = payload

    },
    setPet: (state, { payload }) => {
        state.pets.push(payload);
    }
};

export default reducers;
