export default {
  /**
   * Takes a string and capitalizes the first character of every word.
   * This will also capitalize the third character in names starting with Mc.
   *
   * @param {String} str The string to change.
   * @returns {String}
   */
  toTitleCase: (str) => {
    const lower = str.toLowerCase();

    const titleCaseArray = lower.split(' ').map((val) => {
      if (/^mc/.test(val)) {
        return `${val[0].toUpperCase()}${val[1]}${val[2].toUpperCase()}${val.slice(3)}`;
      }

      return `${val[0].toUpperCase()}${val.slice(1)}`;
    });

    return titleCaseArray.join(' ');
  },
};
