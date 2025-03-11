import { defaults } from "../default";

export const allApi = {
  createContact: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/contact/",
    },
  },

  allContact: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/all-contacts/",
    },
  },
  profileContact: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/contact/",
    },
  },
  creteNotes: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/create-note/",
    },
  },
  getNotes: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/notes/",
    },
  },
  deleteNotes: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: "/notes/",
    },
  },
  editNote: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: "/notes/",
    },
  },
  showBirthdays: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/birthdays/",
    },
  },
  showReminders: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/reminders/",
    },
  },
};
