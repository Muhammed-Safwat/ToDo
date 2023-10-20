export class RegisterUserRequest {
  private username: string;
  private firstName: string;
  private lastName: string;
  private password: string;

  constructor(
    username: string,
    firstName: string,
    lastName: string,
    password: string
  ) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }

  // Getter and Setter methods for the private properties
  get getUsername(): string {
    return this.username;
  }

  set setUsername(username: string) {
    this.username = username;
  }

  get getFirstName(): string {
    return this.firstName;
  }

  set setFirstName(firstName: string) {
    this.firstName = firstName;
  }

  get getLastName(): string {
    return this.lastName;
  }

  set setLastName(lastName: string) {
    this.lastName = lastName;
  }

  get getPassword(): string {
    return this.password;
  }

  set setPassword(password: string) {
    this.password = password;
  }
}
