import log4js from "log4js";
import { validateDeleteProduct } from "./_requestValidators";
import { sendResponse, handleCustomThrow } from "../../utils";
import { deleteProductService } from "../../services/products";

const logger = log4js.getLogger("Products");

export async function deleteProduct(req, res) {
  try {
    const errors = validateDeleteProduct(req);
    if (errors) {
      return sendResponse(res, 400, {}, errors[0].msg);
    }
    const { productId } = req.body;
    await deleteProductService({
      productId,
    });

    return sendResponse(res, 200, {}, "Deleted product successfully");
  } catch (error) {
    logger.error("Error deleting the product", error);
    return handleCustomThrow(res, error);
  }
}
