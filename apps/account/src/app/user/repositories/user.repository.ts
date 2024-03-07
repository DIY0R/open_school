import { InjectModel } from "@nestjs/mongoose";
import { User } from "../models/user.model";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { UserEntity } from "../entity/user.entity";
@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async createUser(user: UserEntity) {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findUser(email: string) {
    return (await this.userModel.findOne({ email })).save();
  }

  async deleteOne(email: string) {
    this.userModel.deleteOne({ email }).exec();
  }
}
