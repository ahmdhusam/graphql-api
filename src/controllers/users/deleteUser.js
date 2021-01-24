import log4js from "log4js";
import { validateDeleteUser } from "./_requestValidators";
import { sendResponse, handleCustomThrow } from "../../utils";
import { deleteUserService } from "../../services/users";

const logger = log4js.getLogger("Users");

export async function deleteUser(req, res) {
  try {
    const errors = validateDeleteUser(req);
    if (errors) {
      return sendResponse(res, 400, {}, errors[0].msg);
    }
    const { userId } = req.body;
    await deleteUserService({
      userId,
    });

    return sendResponse(res, 200, {}, "Deleted user successfully");
  } catch (error) {
    logger.error("Error deleting the user", error);
    return handleCustomThrow(res, error);
  }
}
