import { IsString } from 'class-validator';
import { IUser } from '@micro/interfaces';
export namespace AccountUserInfo {
  export const topic = 'accaunt.user-info.query';

  export class Request {
    @IsString()
    id: string;
  }

  export class Response {
    profile: Omit<IUser, 'passwordHash'>;
  }
}
