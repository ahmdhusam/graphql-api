import { getProductsOfSellerService } from "../../services/sellers";

export default {
  async products(seller, { limit, offset }) {
    const products = await getProductsOfSellerService({
      sellerId: seller.id,
      limit,
      offset,
    });
    return products;
  },
};
