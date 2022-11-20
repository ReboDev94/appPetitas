const reducers = {
    setPets: (state, { payload }) => {
        state.pets = payload

    },
    setPet: (state, { payload }) => {
        state.pets.push(payload);
    },
    deletePet: (state, { payload }) => {
        state.pets = state.pets.filter((p) => p.id !== payload);
    },
    updatePet: (state, { payload }) => {
        state.pets = state.pets.map((p) => {
            if (p.id === payload.id)
                return payload;
            return p;
        })
    }
};

export default reducers;
