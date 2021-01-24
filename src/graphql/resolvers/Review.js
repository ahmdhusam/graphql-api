import { getProductDetailsService } from "../../services/products";
import { getUserDetailsService } from "../../services/users";

export default {
  async user(review) {
    const user = await getUserDetailsService({ userId: review.userId });
    return user;
  },
  async product(review) {
    const user = await getProductDetailsService({
      productId: review.productId,
    });
    return user;
  },
};
