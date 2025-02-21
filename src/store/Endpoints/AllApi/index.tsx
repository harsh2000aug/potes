import { defaults } from "../default";

export const allApi = {
  createContact: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/create-contact/",
    },
  },
};
