import apiClient from "./http/apiClient";
import { unwrap } from "./http/apiResponse";

/**
 * Returns Service (المرتجعات)
 * Handles all API calls related to return requests
 */
export default {
  /**
   * Get all returns with pagination
   * @param {Object} params - { page, limit }
   * @returns {Promise} List of returns
   */
  getAll: (params) => apiClient.get("/returns", { params }).then(unwrap),

  /**
   * Get a single return by ID
   * @param {number|string} id - Return ID
   * @returns {Promise} Return details
   */
  getById: (id) => apiClient.get(`/returns/${id}`).then(unwrap),

  /**
   * Create a new return request
   * @param {Object} data - { originalinvoiceid, status: 'PENDING', reason, items: [...] }
   * @returns {Promise} Created return
   */
  create: (data) => apiClient.post("/returns", data).then(unwrap),

  /**
   * Update return status
   * @param {number|string} id - Return ID
   * @param {Object} data - { status: 'COMPLETED' | 'REJECTED' | 'PENDING' }
   * @returns {Promise} Updated return
   */
  updateStatus: (id, data) => apiClient.put(`/returns/${id}`, data).then(unwrap),

  /**
   * Delete a return
   * @param {number|string} id - Return ID
   * @returns {Promise} Deletion result
   */
  remove: (id) => apiClient.delete(`/returns/${id}`).then(unwrap),
};
