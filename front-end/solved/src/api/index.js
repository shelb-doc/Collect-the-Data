import ky from 'ky';

const baseURL = 'http://localhost:8080/customers';

/**
 * Get all customers by either level or state
 * @param {Object} query - type of query and value
 * @param {string} query.type - The type of query
 * @param {string} query.value - The value to be used for the query
 * @return {Promise<[Object]>} - Customers Data
 */
export const index = ({ type, value }) =>
  ky.get(`${baseURL}/${type}/${value}`).json();

/**
 * Update a customer
 * @param {Object} payload - customer
 * @return
 */
export const update = payload => ky.put(`${baseURL}`, { json: payload });

export const add = payload => ky.post(`${baseURL}`, { json: payload });

export const deleteCustomer = id => ky.delete(`${baseURL}/${id}`);
