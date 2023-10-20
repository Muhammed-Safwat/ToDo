export class LoginUserRequest {
  private _username: string;
  private _password: string;

  constructor(username: string, password: string) {
    this._username = username;
    this._password = password;
  }

  // Getter for username
  get username(): string {
    return this._username;
  }

  // Setter for username
  set username(username: string) {
    this._username = username;
  }

  // Getter for password
  get password(): string {
    return this._password;
  }

  // Setter for password
  set password(password: string) {
    this._password = password;
  }
}
