export function getIndex(e) {
  const el = e.target.closest('.row');
  const selected = [...el.parentElement.children].indexOf(el);

  return selected;
}

export function validateValues(obj, length) {
  return Object.values(obj)
    .slice(0, length)
    .every((el) => !el);
}

export function removeUserTaskData(arr, index) {
  return arr.slice(0, index).concat(arr.slice(index + 1));
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

  return `${year}-${month}-${day}`;
}

export function getAge(birthDate) {
  if (birthDate) {
    const birthConvert = new Date(birthDate);
    const ageDiffMs = Date.now() - birthConvert.getTime();
    const ageDate = new Date(ageDiffMs);

    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  return null;
}

export function convertDate(date) {
  if (date) {
    const [year, month, day] = date.match(/\d+/g);
    return `${day}.${month}.${year}`;
  }
  return null;
}

export function generateID() {
  return Math.random().toString(36).substr(2, 9);
}

export const onFocusDate = (e) => {
  if (e) {
    e.currentTarget.type = 'date';
  }
};

export const onBlurDate = (e) => {
  if (e) {
    e.currentTarget.type = 'text';
    e.currentTarget.value = e.currentTarget.placeholder;
  }
};
