import log4js from "log4js";
import { validateUpdateUser } from "./_requestValidators";
import { sendResponse, handleCustomThrow } from "../../utils";
import { updateUserService } from "../../services/users";

const logger = log4js.getLogger("Users");

export async function updateUser(req, res) {
  try {
    const errors = validateUpdateUser(req);
    if (errors) {
      return sendResponse(res, 400, {}, errors[0].msg);
    }
    const { name, email, city = "", imageUrl = "" } = req.body;
    const { userId } = req.params;

    if (!userId) {
      return sendResponse(res, 400, {}, "Invalid userId");
    }

    const user = await updateUserService({
      userId,
      name,
      email,
      city,
      imageUrl,
    });
    return sendResponse(res, 200, { user }, "Updated users successfully");
  } catch (error) {
    logger.error("Error updating the user details", error);
    return handleCustomThrow(res, error);
  }
}
