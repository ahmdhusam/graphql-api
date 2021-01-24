import {
  createSellerService,
  updateSellerService,
  deleteSellerService,
} from "../../../services/sellers";

const sellerMutations = {
  async addSeller(parent, args) {
    const newSeller = await createSellerService(args);
    return newSeller;
  },
  async updateSeller(parent, args) {
    const modifiedArgs = args;
    modifiedArgs.sellerId = args.id;
    const updatedSeller = await updateSellerService(modifiedArgs);
    return updatedSeller;
  },
  async deleteSeller(parent, args) {
    const sellerId = args.id;
    const deletedSeller = await deleteSellerService({ sellerId });
    return deletedSeller;
  },
};

export default sellerMutations;
