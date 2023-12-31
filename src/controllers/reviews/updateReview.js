import log4js from "log4js";
import { validateUpdateReview } from "./_requestValidators";
import { sendResponse, handleCustomThrow } from "../../utils";
import { updateReviewService } from "../../services/reviews";

const logger = log4js.getLogger("Reviews");

export async function updateReview(req, res) {
  try {
    const errors = validateUpdateReview(req);
    if (errors) {
      return sendResponse(res, 400, {}, errors[0].msg);
    }
    const { title, description = "" } = req.body;
    const { reviewId } = req.params;

    if (!reviewId) {
      return sendResponse(res, 400, {}, "Invalid reviewId");
    }

    const review = await updateReviewService({
      reviewId,
      title,
      description,
    });
    return sendResponse(
      res,
      200,
      { review },
      "Updated review details successfully"
    );
  } catch (error) {
    logger.error("Error updating the review", error);
    return handleCustomThrow(res, error);
  }
}
