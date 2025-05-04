export function replaceNullsWithUndefined(obj: any) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === null) {
        obj[key] = undefined;
      } else if (typeof obj[key] === "object") {
        replaceNullsWithUndefined(obj[key]);
      }
    }
  }
}

export function replaceUndefinedsWithNull(obj: any) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === undefined) {
        obj[key] = null;
      } else if (typeof obj[key] === "object") {
        replaceUndefinedsWithNull(obj[key]);
      }
    }
  }
}
