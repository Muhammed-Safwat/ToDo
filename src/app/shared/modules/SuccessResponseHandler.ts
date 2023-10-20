export class SuccessResponseHandler {
  private _message: string;
  private _data: any;
  private _ok: boolean;
  private _status: number;

  constructor(message: string, data: any, ok: boolean, status: number) {
    this._message = message;
    this._data = data;
    this._ok = ok;
    this._status = status;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  get data(): any {
    return this._data;
  }

  set data(value: any) {
    this._data = value;
  }

  get ok(): boolean {
    return this._ok;
  }

  set ok(value: boolean) {
    this._ok = value;
  }

  get status(): number {
    return this._status;
  }

  set status(value: number) {
    this._status = value;
  }
}
