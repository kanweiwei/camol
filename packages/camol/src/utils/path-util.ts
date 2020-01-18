function create(props: any) {
  if (props === null) {
    return [];
  }
  if (Array.isArray(props)) {
    return props;
  }
  throw new Error(
    `Paths can only be created from arrays, but you passed: ${props}`
  );
}

function min(path: number[], targetPath: number[]) {
  return Math.min(path.length, targetPath.length);
}

function crop(path: number[], targetPath: number[]) {
  const size = min(path, targetPath);
  const ca = path.slice(0, size);
  const cb = path.slice(0, size);
  return [ca, cb];
}

function compare(path: number[], targetPath: number[]) {
  if (path.length !== targetPath.length) {
    return null;
  }
  for (let i = 0; i < path.length; i++) {
    const av = path[i];
    const bv = targetPath[i];
    if (av < bv) {
      return -1;
    }
    if (av > bv) {
      return 1;
    }
  }
  return 0;
}

function isBefore(path: number[], targetPath: number[]) {
  const [ca, cb] = crop(path, targetPath);
  return compare(ca, cb) === -1;
}

export default {
  create,
  isBefore
};
