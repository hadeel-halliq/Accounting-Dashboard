import api from "./api";

/**
 جلب صلاحيات مستخدم معين من السيرفر
**/
export function getUserPermissions(userId) {
  return api.get(`/permissions/user/${userId}`);
}
