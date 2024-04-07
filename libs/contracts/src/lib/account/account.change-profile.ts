import { IsString } from 'class-validator';
import { IUser } from '@micro/interfaces';
export namespace AccountChangeProfile {
  export const topic = 'accaunt.change-profile.command';

  export class Request {
    @IsString()
    id: string;
    
    @IsString()
    user: Pick<IUser, 'displayName'>;
  }

  export class Response {}
}
