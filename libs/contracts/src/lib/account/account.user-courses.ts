import { IsString } from 'class-validator';
import { IUserCourses } from '@micro/interfaces';
export namespace AccountUserCourses {
  export const topic = 'accaunt.user-courses.query';

  export class Request {
    @IsString()
    id: string;
  }

  export class Response {
    courses: Array<IUserCourses>;
  }
}
