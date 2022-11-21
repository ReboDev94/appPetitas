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
    },
    setEvents: (state, { payload }) => {
        state.eventsPets = payload
    },
    deleteEvent: (state, { payload }) => {
        state.eventsPets = state.eventsPets.filter((ev) => ev.id !== payload);
    },
    updateEvent: (state, { payload }) => {
        state.eventsPets = state.eventsPets.map((ev) => {
            if (ev.id === payload.id) {
                const { mascota, ...rest } = payload
                return { ...ev, ...rest };
            }
            return ev;
        })
    }
};

export default reducers;
