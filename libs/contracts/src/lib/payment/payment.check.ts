import { IsString } from 'class-validator';
export type PaymentStatus = 'canceld' | 'success' | 'progress';

export namespace PaymentCheck {
  export const topic = 'payment.check.qery';
  export class Request {
    @IsString()
    courseId: string;

    @IsString()
    userId: string;
  }
  export class Response {
    status: PaymentStatus;
  }
}
