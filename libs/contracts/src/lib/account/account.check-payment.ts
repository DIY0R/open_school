import { PurchaseState } from '@micro/interfaces';
import { IsString } from 'class-validator';
import { PaymentStatus } from '../payment/payment.check';

export namespace AccountCheckPayment {
  export const topic = 'accaunt.check-payment.command';

  export class Request {
    @IsString()
    userId: string;

    @IsString()
    courseId: string;
  }

  export class Response {
    status: PaymentStatus;
  }
}
