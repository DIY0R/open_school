import {
  IUser,
  IUserCourses,
  PurchaseState,
  UserRole,
} from '@micro/interfaces';
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

  public setCourseStatus(courseId: string, state: PurchaseState) {
    const exist = this.courses.find((c) => c._id == courseId);
    if (!exist) {
      this.courses.push({
        courseId,
        purchaseState: PurchaseState.Started,
      });
      return this;
    }

    if ((state = PurchaseState.Cenceled)) {
      this.courses = this.courses.filter((c) => c._id != courseId);
      return this;
    }
    this.courses = this.courses.map((c) =>
      c._id == courseId ? { ...c, purchaseState: state } : c
    );
    return this;
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
  public getCourseState(courseId: string): PurchaseState {
    return (
      this.courses.find((c) => c.courseId === courseId)?.purchaseState ??
      PurchaseState.Started
    );
  }
  public updateProfile(displayName: string) {
    this.displayName = displayName;
    return this;
  }
}
