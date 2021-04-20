import { getCurrentDate, getAge, convertDate } from './helpers';

test('getCurrentDate', () => {
  const now = getCurrentDate();
  const actual = new Date().toISOString().slice(0, 10);
  expect(actual).toEqual(now);
});

test('getAge should return 27', () => {
  const input = '1993-03-28';
  const actual = getAge(input);
  const expected = 27;
  expect(actual).toBe(expected);
});

test('getAge should return 20', () => {
  const input = '2001-01-20';
  const actual = getAge(input);
  const expected = 20;
  expect(actual).toBe(expected);
});

test('getAge should return 48', () => {
  const input = '1972-05-06';
  const actual = getAge(input);
  const expected = 48;
  expect(actual).toBe(expected);
});

test('convertDate should return 28.03.93', () => {
  const input = '1993-03-28';
  const actual = convertDate(input);
  const expected = '28.03.93';
  expect(actual).toBe(expected);
});

test('convertDate should return 20.01.01', () => {
  const input = '2001-01-20';
  const actual = convertDate(input);
  const expected = '20.01.01';
  expect(actual).toBe(expected);
});

test('convertDate should return 06.05.72', () => {
  const input = '1972-05-06';
  const actual = convertDate(input);
  const expected = '06.05.72';
  expect(actual).toBe(expected);
});
