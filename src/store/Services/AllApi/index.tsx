import { callApi } from "../../../Utils/api/apiUtils";
import { allApi } from "../../Endpoints/AllApi";

export const createContactApi = ({ body }: any) =>
  callApi({
    uriEndPoint: allApi.createContact.v1,
    body,
  });
