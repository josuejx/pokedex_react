export default class Utils {
  static capitalizeFirstLetter(val: string | undefined) {
    if (!val) {
      return "";
    }
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  static transform3Digits(n: number | undefined) {
    if (!n) {
      return "000";
    }
    let n_str = n.toString();

    while (n_str.length < 3) {
      n_str = "0" + n_str;
    }

    return n_str;
  }
}
