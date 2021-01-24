import {
  createReviewService,
  updateReviewService,
  deleteReviewService,
} from "../../../services/reviews";

const reviewMutations = {
  async addReview(parent, args) {
    const newReview = await createReviewService(args);
    return newReview;
  },
  async updateReview(parent, args) {
    const modifiedArgs = args;
    modifiedArgs.reviewId = args.id;
    const updatedReview = await updateReviewService(modifiedArgs);
    return updatedReview;
  },
  async deleteReview(parent, args) {
    const reviewId = args.id;
    const deletedReview = await deleteReviewService({ reviewId });
    return deletedReview;
  },
};

export default reviewMutations;
