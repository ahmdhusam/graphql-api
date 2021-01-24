import log4js from "log4js";
import { validateDeleteReview } from "./_requestValidators";
import { sendResponse, handleCustomThrow } from "../../utils";
import { deleteReviewService } from "../../services/reviews";

const logger = log4js.getLogger("Reviews");

export async function deleteReview(req, res) {
  try {
    const errors = validateDeleteReview(req);
    if (errors) {
      return sendResponse(res, 400, {}, errors[0].msg);
    }
    const { reviewId } = req.body;
    await deleteReviewService({
      reviewId,
    });
    return sendResponse(res, 200, {}, "Deleted review successfully");
  } catch (error) {
    logger.error("Error deleting the review", error);
    return handleCustomThrow(res, error);
  }
}
