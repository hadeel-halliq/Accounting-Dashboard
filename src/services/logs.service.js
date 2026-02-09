import apiClient from "./http/apiClient";
import { unwrap } from "./http/apiResponse";

const LogsService = {
  list: (params) =>
    apiClient
      .get("/logs", { params })
      .then(unwrap)
      .then((d) => d.logs),
};

export default LogsService;
