import { AppDataSource } from '../connections/database/data-source';
import { User } from '../entities/User';

export const userRepository = AppDataSource.getRepository(User).extend({
  async findByEmail(email: string) {
    return this.find({ where: { email } });
  },

  async findById(id: string) {
    const userId = Number(id);
    return this.findOne({ where: { id: userId } });
  }
});
