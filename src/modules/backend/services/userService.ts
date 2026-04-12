import { userRepo } from '../repository/userRepo';

export const userService = {
  findAll: () => userRepo.findAll(),
};
