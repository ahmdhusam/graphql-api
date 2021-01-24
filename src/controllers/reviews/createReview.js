import log4js from "log4js";
import { validateCreateReview } from "./_requestValidators";
import { sendResponse, handleCustomThrow } from "../../utils";
import { createReviewService } from "../../services/reviews";

const logger = log4js.getLogger("Reviews");

export async function createReview(req, res) {
  try {
    const errors = validateCreateReview(req);
    if (errors) {
      return sendResponse(res, 400, {}, errors[0].msg);
    }
    const { userId, productId, title, description } = req.body;
    const newReview = await createReviewService({
      userId,
      productId,
      title,
      description,
    });
    return sendResponse(res, 200, { newReview }, "Added review successfully");
  } catch (error) {
    logger.error("Error adding the review", error);
    return handleCustomThrow(res, error);
  }
}
