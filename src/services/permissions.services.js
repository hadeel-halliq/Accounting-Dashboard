import apiClient from "./http/apiClient";
import { unwrap } from "./http/apiResponse";

/**
 * Permissions API – matches backend endpoints.
 * GET  /permissions/user/:userid  → { data: { permissions: [...] } }
 * POST /permissions               → body: { userid, targettable, canadd, canedit, candelete, canprint }
 * PUT  /permissions/:permissionid → body: { canadd, canedit, ... } (partial)
 * DELETE /permissions/:permissionid
 */

export function getByUser(userId) {
  return apiClient
    .get(`/permissions/user/${userId}`)
    .then(unwrap)
    .then((data) => data?.permissions ?? []);
}

export function create(data) {
  return apiClient.post("/permissions", data).then(unwrap);
}

export function update(permissionId, data) {
  return apiClient.put(`/permissions/${permissionId}`, data).then(unwrap);
}

export function deletePermission(permissionId) {
  return apiClient.delete(`/permissions/${permissionId}`).then(unwrap);
}

/**
 * Sync full list for a user (uses create/update/delete under the hood).
 * Payload: array of { userid, targettable, canprint, canadd, canedit, candelete }
 */
export async function updateUserPermissions(userId, permissionsList) {
  const existing = await getByUser(userId);
  const byTable = Object.fromEntries(
    (existing || []).map((p) => [(p.targettable || "").toLowerCase(), p])
  );
  const seen = new Set();

  for (const row of permissionsList || []) {
    const table = (row.targettable || "").toLowerCase();
    seen.add(table);
    const payload = {
      canadd: !!row.canadd,
      canedit: !!row.canedit,
      candelete: !!row.candelete,
      canprint: !!row.canprint,
    };
    const prev = byTable[table];
    if (prev?.permissionid) {
      await update(prev.permissionid, payload);
    } else {
      await create({
        userid: Number(userId),
        targettable: row.targettable ?? table,
        ...payload,
      });
    }
  }

  for (const p of existing || []) {
    const table = (p.targettable || "").toLowerCase();
    if (!seen.has(table) && p.permissionid) {
      await deletePermission(p.permissionid);
    }
  }
}

// Default export: named functions + aliases for backward compatibility
const PermissionsService = {
  getByUser,
  getUserPermissions: getByUser,
  create,
  update,
  delete: deletePermission,
  remove: deletePermission,
  updateUserPermissions,
};

export default PermissionsService;
