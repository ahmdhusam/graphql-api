import log4js from "log4js";
import { validateDeleteSeller } from "./_requestValidators";
import { sendResponse, handleCustomThrow } from "../../utils";
import { deleteSellerService } from "../../services/sellers";

const logger = log4js.getLogger("Sellers");

export async function deleteSeller(req, res) {
  try {
    const errors = validateDeleteSeller(req);
    if (errors) {
      return sendResponse(res, 400, {}, errors[0].msg);
    }
    const { sellerId } = req.body;
    const product = await deleteSellerService({
      sellerId,
    });
    return sendResponse(res, 200, { product }, "Deleted seller successfully");
  } catch (error) {
    logger.error("Error deleting the seller", error);
    return handleCustomThrow(res, error);
  }
}
