export function getIndex(e) {
  const el = e.target.closest('.row');
  const selected = [...el.parentElement.children].indexOf(el);
  return selected;
}

export function getSubtaskIndex(e) {
  const base = e.target.closest('.row');
  const child = e.target.closest('div');
  const selected = [...base.children].indexOf(child);
  return selected;
}

export function getCurrentDate() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }

  const today = `${year}-${month}-${day}`;
  return today;
}

export function getAge(birthDate) {
  const birthConvert = new Date(birthDate);
  const ageDiffMs = Date.now() - birthConvert.getTime();
  const ageDate = new Date(ageDiffMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export function convertDate(date) {
  const datePart = date.match(/\d+/g);
  const year = datePart[0].substring(2);
  const month = datePart[1];
  const day = datePart[2];

  return `${day}.${month}.${year}`;
}
