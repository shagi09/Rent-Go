import { Injectable,NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import {User,UserDocument} from "./schemas/user.schema";
import { InjectModel } from '@nestjs/mongoose';
import { Model,Types } from 'mongoose';
import { UserRole } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(payload: { email: string; password: string; username: string; role?: UserRole }): Promise<User> {
    const created = new this.userModel({ ...payload ,role: payload.role ?? 'user'});
    return created.save();
  }
  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
async findByEmail(email: string): Promise<User | null> {
  return this.userModel.findOne({ email }).exec(); // returns null if not found
}

async findByUsername(username: string): Promise<User | null> {
  return this.userModel.findOne({ username }).exec();
}


  async updateProfile(userId: string, patch: Partial<User>): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(userId, patch, { new: true }).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

//     async changePassword(userId: string, newPassword: string) {
//     const hash = await bcrypt.hash(newPassword, 10);
//     const user = await this.userModel.findByIdAndUpdate(userId, { passwordHash: hash }, { new: true }).exec();
//     if (!user) throw new NotFoundException('User not found');
//     return user;
//   }
}
