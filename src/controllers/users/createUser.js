import log4js from "log4js";
import { validateCreateUser } from "./_requestValidators";
import { sendResponse, handleCustomThrow } from "../../utils";
import { createUserService } from "../../services/users";

const logger = log4js.getLogger("Users");

export async function createUser(req, res) {
  try {
    const errors = validateCreateUser(req);
    if (errors) {
      return sendResponse(res, 400, {}, errors[0].msg);
    }
    const { name, email, city = "", imageUrl = "" } = req.body;
    const newUser = await createUserService({
      name,
      email,
      city,
      imageUrl,
    });
    return sendResponse(res, 200, { newUser }, "Created user successfully");
  } catch (error) {
    logger.error("Error creating user", error);
    return handleCustomThrow(res, error);
  }
}
