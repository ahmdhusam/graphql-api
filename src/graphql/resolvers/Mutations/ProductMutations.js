import {
  createProductsService,
  updateProductService,
  deleteProductService,
} from "../../../services/products/index";

const productMutations = {
  async addProduct(parent, args) {
    const newProduct = await createProductsService(args);
    return newProduct;
  },
  async updateProduct(parent, args) {
    const modifiedArgs = args;
    modifiedArgs.productId = args.id;
    const updatedProduct = await updateProductService(modifiedArgs);
    return updatedProduct;
  },
  async deleteProduct(parent, args) {
    const productId = args.id;
    const deletedProduct = await deleteProductService({ productId });
    return deletedProduct;
  },
};

export default productMutations;
