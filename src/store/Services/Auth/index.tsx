import { callApi } from "../../../Utils/api/apiUtils";
import { authEndpoints } from "../../Endpoints/Auth";

export const loginApiCall = ({ body }: any) =>
  callApi({
    uriEndPoint: authEndpoints.loginApi.v1,
    body,
  });
