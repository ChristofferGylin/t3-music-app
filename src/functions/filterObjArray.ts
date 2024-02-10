export const filterObjArray = <T, K extends keyof T>(
  array: T[],
  searchQuery: string,
  keys?: K[],
): T[] => {
  const searchWords = searchQuery.split(" ");

  const checkForMatch = (
    obj: T,
    key: Extract<keyof T, string> | K,
    word: string,
  ) => {
    const current = obj[key];
    let value;

    if (typeof current === "number") {
      value = current.toString();
    } else if (typeof current === "string") {
      value = current;
    } else {
      return false;
    }

    if (value.toLowerCase().includes(word.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  };

  const filtered = array.filter((obj) => {
    let include = true;

    searchWords.forEach((word) => {
      let matches = false;

      if (keys) {
        keys.forEach((key) => {
          if (checkForMatch(obj, key, word)) matches = true;
        });
      } else {
        for (const key in obj) {
          if (checkForMatch(obj, key, word)) matches = true;
        }
      }

      if (!matches) include = false;
    });

    return include;
  });

  return filtered;
};
