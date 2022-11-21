import { appSlice } from ".";
export const {
    setPets: setPetsAction,
    setPet: setPetAction,
    deletePet: deletePetAction,
    updatePet: updatePetAction,
    setEvents: setEventsAction,
    deleteEvent: deleteEventAction,
    updateEvent: updateEventAction
} = appSlice.actions;
