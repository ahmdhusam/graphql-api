import log4js from "log4js";
import { validateCreateSeller } from "./_requestValidators";
import { sendResponse, handleCustomThrow } from "../../utils";
import { createSellerService } from "../../services/sellers";

const logger = log4js.getLogger("Sellers");

export async function createSeller(req, res) {
  try {
    const errors = validateCreateSeller(req);
    if (errors) {
      return sendResponse(res, 400, {}, errors[0].msg);
    }
    const { name, email, city = "", imageUrl = "" } = req.body;
    const newSeller = await createSellerService({
      name,
      email,
      city,
      imageUrl,
    });
    return sendResponse(res, 200, { newSeller }, "Created seller successfully");
  } catch (error) {
    logger.error("Error creating seller", error);
    return handleCustomThrow(res, error);
  }
}
