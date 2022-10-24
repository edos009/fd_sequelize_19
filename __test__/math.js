const getSumTwoNumbers = (a, b) => {
  if (
    Number(a) >= Number.MAX_SAFE_INTEGER ||
    Number(b) >= Number.MAX_SAFE_INTEGER
  ) {
    return Infinity;
  }

  return Number(a) + Number(b);
};

describe('test about getSumTwoNumbers function', () => {
  test('add 1 to 2 to expect 3', () => {
    expect(getSumTwoNumbers(1, 2)).toBe(3);
  });

  test('add 1:string to 2:string to expect 3', () => {
    expect(getSumTwoNumbers('1', '2')).toBe(3);
  });

  test('add MAX_SAFE_INT to MAX_SAFE_INT to expect Infinity', () => {
    expect(
      getSumTwoNumbers(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
    ).toBe(Infinity);
  });
});
