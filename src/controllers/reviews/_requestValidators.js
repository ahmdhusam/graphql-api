export function validateGetAllReviews(req) {
  req.checkQuery("limit", "limit should be integer").isInt().optional();
  req.checkQuery("offset", "offset should be integer").isInt().optional();
  req
    .checkQuery("search", "search should be minimun 1 characters")
    .isLength({ min: 1 })
    .optional();
  return req.validationErrors();
}

export function validateCreateReview(req) {
  req
    .checkBody("title", "title is required and minimum 2 characters")
    .isLength({ min: 2 })
    .exists();
  req
    .checkBody("description", "description should be integer")
    .isLength({ min: 5 })
    .optional();
  req.checkBody("productId", "productId is required").isInt().exists();
  req.checkBody("userId", "userId is required").isInt().exists();
  return req.validationErrors();
}

export function validateUpdateReview(req) {
  req
    .checkBody("title", "title is required and minimum 2 characters")
    .isLength({ min: 2 })
    .exists();
  req
    .checkBody("description", "description should be integer")
    .isLength({ min: 5 })
    .optional();
  return req.validationErrors();
}

export function validateDeleteReview(req) {
  req.checkBody("reviewId", "reviewId is required").isInt().exists();
  return req.validationErrors();
}
