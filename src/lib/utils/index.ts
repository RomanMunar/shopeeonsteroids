export const filterByUniqueField = <T>(array: T[], field: keyof T) => {
  const displayedResults: T[] = [];
  array.filter(function (item) {
    return displayedResults.findIndex((x) => x[field] === item[field]) === -1
      ? displayedResults.push(item)
      : null;
  });
  return displayedResults;
};

export const getRelativeTimeFormat = (current: any, previous: any) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  // @ts-ignore this type mismatch, should not cause errors,
  // type Date coerce to numbers if used in a math expressiion. weird,ik
  const elapsed = Math.abs(current - previous);

  if (elapsed < msPerHour) {
    const time = Math.round(elapsed / msPerMinute);
    return `${time === 1 ? "a minute" : `${time} minutes`} ago`;
  } else if (elapsed < msPerDay) {
    const time = Math.round(elapsed / msPerHour);
    return `${time === 1 ? "an hour" : `${time} hours`} ago`;
  } else if (elapsed < msPerMonth) {
    const time = Math.round(elapsed / msPerDay);
    return `${time === 1 ? "a day" : `${time} days`} ago`;
  } else if (elapsed < msPerYear) {
    const time = Math.round(elapsed / msPerMonth);
    return `${time === 1 ? "a months" : `${time} monthss`} ago`;
  } else {
    const time = Math.round(elapsed / msPerYear);
    return `${time === 1 ? "a year" : `${time} years`} ago`;
  }
};

export const toLocaleTime = (ms: number) => {
  const minute = Math.round(ms / 60);
  const hour = minute * 60;
  if (minute < 60) return "within " + minute + " minutes";
  if (minute > 60) return "within " + Math.round(ms / 3600) + " hours";
  if (minute < 1) return "within seconds";
  if (hour > 24) return "inactive";
};

export const kFormat = (num: number) =>
  Math.abs(num) > 999 ? (Math.abs(num) / 1000).toFixed(1) + "k" : Math.abs(num);

export const arrayToNArray = <T>(arr: T[], n: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < n; i++) {
    result.push([]);
  }

  const wordsPerLine = Math.ceil(arr.length / 2);
  for (let line = 0; line < n; line++) {
    for (let i = 0; i < wordsPerLine; i++) {
      const value = arr[i + line * wordsPerLine];
      if (!value) continue;
      result[line].push(value);
    }
  }
  return result;
};
