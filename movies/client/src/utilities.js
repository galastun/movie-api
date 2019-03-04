export default {
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
