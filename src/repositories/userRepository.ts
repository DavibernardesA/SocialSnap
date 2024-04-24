import { AppDataSource } from '../connections/database/data-source';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const userRepository = AppDataSource.getRepository(User).extend({
  async findByEmail(email: string) {
    return this.find({ where: { email } });
  },

  async findById(id: string) {
    const userId = Number(id);
    return this.findOne({ where: { id: userId } });
  },

  async encryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  },

  async checkPassword(encryptedPassword: string, comparisonPassword: string): Promise<boolean> {
    return await bcrypt.compare(encryptedPassword, comparisonPassword);
  },

  async createToken(id: number, jwtPass: string, timestamp: string) {
    return jwt.sign({ id }, jwtPass, { expiresIn: timestamp });
  }
});
