export class LoggedUser {
  constructor(public username: string | null,
              public firstName: string | null,
              public userId: string | null,
              public accessToken: string | null,
              public refreshToken: string | null,
              public exp: string | null) {
  }



}
