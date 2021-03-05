import { getCurrentDate, getAge, convertDate } from './helpers';

test('getCurrentDate', () => {
  const date = getCurrentDate();
  const now = new Date().toISOString().slice(0, 10);
  expect(date).toEqual(now);
});

test('getAge', () => {
  expect(getAge('1993-03-28')).toEqual(27);
  expect(getAge('2001-01-20')).toEqual(20);
  expect(getAge('1972-05-06')).toEqual(48);
});

test('convertDate', () => {
  expect(convertDate('1993-03-28')).toEqual('28.03.93');
  expect(convertDate('2001-01-20')).toEqual('20.01.01');
  expect(convertDate('1972-05-06')).toEqual('06.05.72');
});
