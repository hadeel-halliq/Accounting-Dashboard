import apiClient from "./http/apiClient";
import { unwrap } from "./http/apiResponse";

const LogsService = {
  // list: (params) =>
  //   apiClient
  //     .get("/logs", { params })
  //     .then(unwrap)
  //     .then((res) => res.data),

  list: (params = {}) => {
    const cleanParams = {
      page: params.page,
      limit: params.limit,
      _t: Date.now(),
    };

    if (params.targettable) {
      cleanParams.targettable = params.targettable;
    }

    return apiClient.get("/logs", { params: cleanParams }).then(unwrap);
  },
};

export default LogsService;
