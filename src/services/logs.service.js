import apiClient from "./http/apiClient";
import { unwrap } from "./http/apiResponse";

const LogsService = {
  list: (params) =>
    apiClient
      .get("/logs", { params })
      .then(unwrap)
      .then((res) => res.data), 
};

export default LogsService;
