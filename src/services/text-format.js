export default class TextFormat {
    truncate(str, maxlength) {
      const text = str.slice(0, maxlength);
      const a = text.split(' ');
      a.splice(a.length - 1, 1);
      const res = a.join(' ');
      return `${res} ...`;
    }
}