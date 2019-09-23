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

export default {
  create
}
