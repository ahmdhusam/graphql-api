import log4js from "log4js";
import { validateProductsOfSeller } from "./_requestValidators";
import { sendResponse, handleCustomThrow } from "../../utils";
import {
  getSellerDetailsService,
  getProductsOfSellerService,
} from "../../services/sellers";

const logger = log4js.getLogger("Sellers");

export async function getProductsOfSeller(req, res) {
  try {
    const errors = validateProductsOfSeller(req);
    if (errors) {
      return sendResponse(res, 400, {}, errors[0].msg);
    }

    const { limit = 10, offset = 0 } = req.query;
    const { sellerId } = req.params;
    const seller = await getSellerDetailsService({ sellerId });
    const list = await getProductsOfSellerService({ sellerId, limit, offset });
    return sendResponse(
      res,
      200,
      { seller, list },
      "Fetched products of sellers successfully"
    );
  } catch (error) {
    logger.error("Error fetching all the products of  sellers", error);
    return handleCustomThrow(res, error);
  }
}
