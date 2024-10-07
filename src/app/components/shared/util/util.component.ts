export class Util {
  constructor() {}

  public getUnixDate(): Number {
    const activationDate = new Date();
    const date_unix = new Date(
      activationDate.getUTCFullYear(),
      activationDate.getUTCMonth(),
      activationDate.getUTCDate(),
      activationDate.getUTCHours(),
      activationDate.getUTCMinutes(),
      activationDate.getUTCSeconds()
    );

    var timeStr = date_unix.getTime();
    var time = timeStr.toString().substring(0, 10);

    return parseInt(time);
  }
}
