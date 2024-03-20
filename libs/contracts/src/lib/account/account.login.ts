export namespace AccountLogin {
  export const topic = "accaunt.login.command";
  export class Request {
    email: string;
    password: string;
  }
  export class Response {
    access_token: string;
  }
}
