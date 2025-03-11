import { callApi } from "../../../Utils/api/apiUtils";
import { allApi } from "../../Endpoints/AllApi";

export const createContactApi = ({ body }: any) =>
  callApi({
    uriEndPoint: allApi.createContact.v1,
    body,
  });
export const allContactApi = () =>
  callApi({
    uriEndPoint: allApi.allContact.v1,
  });
export const profileContactApi = ({ query }: any) =>
  callApi({
    uriEndPoint: allApi.profileContact.v1,
    query,
  });
export const createNotesApi = ({ body }: any) =>
  callApi({
    uriEndPoint: allApi.creteNotes.v1,
    body,
    withCredentials: "include",
  });
export const getNotesApi = ({ query }: any) =>
  callApi({
    uriEndPoint: allApi.getNotes.v1,
    query,
  });
export const deleteNotes = ({ query }: any) =>
  callApi({
    uriEndPoint: allApi.deleteNotes.v1,
    query,
  });
export const editNote = ({ query, body }: any) =>
  callApi({
    uriEndPoint: allApi.editNote.v1,
    query,
    body,
  });
export const showBirthdays = () =>
  callApi({
    uriEndPoint: allApi.showBirthdays.v1,
  });
export const showReminders = () =>
  callApi({
    uriEndPoint: allApi.showReminders.v1,
  });
