export namespace AccountRegister {
  export const topic = "accaunt.register.command";
  export class Request {
    email: string;
    password: string;
    displayName?: string;
  }
  export class Response {
    email: string;
  }
}
