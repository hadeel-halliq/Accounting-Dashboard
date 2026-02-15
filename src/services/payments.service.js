import apiClient from "./http/apiClient";
import { unwrap } from "./http/apiResponse";

/**
 * Payments Service
 * Handles all API calls related to payments
 */
export default {
  /**
   * Get all payments with pagination
   * @param {Object} params - { page, limit }
   * @returns {Promise} List of payments
   */
  getAll: (params) => apiClient.get("/payments", { params }).then(unwrap),

  /**
   * Get a single payment by ID
   * @param {number|string} id - Payment ID
   * @returns {Promise} Payment details
   */
  getById: (id) => apiClient.get(`/payments/${id}`).then(unwrap),

  /**
   * Create a new payment
   * @param {Object} data - { invoiceid, amount, paymentmethod }
   * @returns {Promise} Created payment
   */
  create: (data) => apiClient.post("/payments", data).then(unwrap),

  /**
   * Update an existing payment
   * @param {number|string} id - Payment ID
   * @param {Object} data - { amount, paymentmethod }
   * @returns {Promise} Updated payment
   */
  update: (id, data) => apiClient.put(`/payments/${id}`, data).then(unwrap),

  /**
   * Delete a payment
   * @param {number|string} id - Payment ID
   * @returns {Promise} Deletion result
   */
  remove: (id) => apiClient.delete(`/payments/${id}`).then(unwrap),
};
