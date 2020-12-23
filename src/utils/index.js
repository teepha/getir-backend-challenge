/**
 * @description Response handler for formatting the response payload
 * @param {object} res
 * @param {number} statusCode
 * @param {string} message
 * @param {array} data
 * @returns {object} response object
 */
export const response = ({ res, statusCode, message, data }) => {
  const success = statusCode < 400;
  
  return res.status(statusCode).json({
    code: success ? 0 : 1,
    msg: success ? "Success" : message,
    records: data,
  });
};
