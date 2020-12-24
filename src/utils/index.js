export const formatResponse = ({ res, statusCode, message, data }) => {
  const success = statusCode < 400;

  return res.status(statusCode).json({
    code: success ? 0 : 1,
    msg: success ? "Success" : message,
    records: data,
  });
};
