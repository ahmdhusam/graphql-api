import { getSellerOfProductService } from "../../services/products";

export default {
  async seller(product) {
    const seller = await getSellerOfProductService({ productId: product.id });
    return seller;
  },
};
