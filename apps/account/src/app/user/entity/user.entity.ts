import { IUser, IUserCourses, UserRole } from '@micro/interfaces';
import { compare, genSalt, hash } from 'bcryptjs';
export class UserEntity implements IUser {
  _id?: string;
  displayName: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  courses?: Array<IUserCourses>;

  constructor(user: IUser) {
    this._id = user._id;
    this.passwordHash = user.passwordHash;
    this.displayName = user.displayName;
    this.email = user.email;
    this.role = user.role;
    this.courses = user.courses;
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(10);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async validatePassword(password: string): Promise<boolean> {
    const ifCheck = await compare(password, this.passwordHash);
    return ifCheck;
  }

  public getPublicProfile() {
    return {
      email: this.email,
      role: this.role,
      displayName: this.displayName,
    };
  }

  public updateProfile(displayName: string) {
    this.displayName = displayName;
    return this;
  }
}
