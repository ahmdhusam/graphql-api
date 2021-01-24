import { reviewsOfUsersService } from "../../services/users";

export default {
  async reviews(user) {
    const reviews = await reviewsOfUsersService({ userId: user.id });
    return reviews;
  },
};
