// Make an iterable list of keys from an enum
export function enumKeys<O extends object, K extends keyof O = keyof O>(
  obj: O
): K[] {
  return Object.keys(obj).filter((key) => obj[key as keyof O] === key) as K[];
}
