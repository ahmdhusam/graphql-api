export default function sendResponse(res, statusCode, data = {}, message) {
  let status = null;

  if (typeof statusCode !== "number" || statusCode > 600 || statusCode < 100) {
    throw new Error("Invalid Status Code");
  }

  if (statusCode > 200 || statusCode < 400) status = "success";
  else status = "failed";

  return res.status(statusCode).json({
    status,
    data,
    message,
  });
}
