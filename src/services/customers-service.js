import api from "./api";

// جلب الزبائن (pagination + filters)
export const getCustomers = ({
  page = 1,
  limit = 10,
  search,
  branch_id,
  status
} = {}) =>
  api.get("/customers", {
    params: { page, limit, search, branch_id, status }
  });

// إنشاء زبون جديد
export const createCustomer = (data) =>
  api.post("/customers", data);

// تعديل بيانات زبون
export const updateCustomer = (id, data) =>
  api.put(`/customers/${id}`, data);

// أرشفة زبون
export const archiveCustomer = (id) =>
  api.patch(`/customers/${id}/archive`);


