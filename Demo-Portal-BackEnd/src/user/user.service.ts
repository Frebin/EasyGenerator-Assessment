import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  async findById(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, updates, { new: true });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async create(email: string, name: string, password: string, roleName: string, isNewUser: boolean, lastLoggedIn: string): Promise<User> {
    const newUser = new this.userModel({ email, name, password, roleName, isNewUser, lastLoggedIn });
    return await newUser.save();
  }
}
