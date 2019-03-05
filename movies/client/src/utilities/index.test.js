import utilities from '.';

describe('utilities', () => {
  describe('toTitleCase', () => {
    test('should make start of every word capital', () => {
      expect(utilities.toTitleCase('i am lowercase')).toEqual('I Am Lowercase');
    });

    test('should make mcdonald capitalized correctly', () => {
      expect(utilities.toTitleCase('mcdonald')).toEqual('McDonald');
    });
  });
});
