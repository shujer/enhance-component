export const omit = <
  T extends { [x: string]: any },
  K extends keyof T = keyof T,
>(
  obj: T,
) => {
  return Object.keys(obj).reduce<T>((acc, key) => {
    if (!obj[key]) return acc;
    acc[key as K] = obj[key];
    return acc;
  }, {} as T);
};
