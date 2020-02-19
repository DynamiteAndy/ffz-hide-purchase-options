export const parse = (args): any => {
  if (args?.length === 1) {
    return { value: args[0] };
  }

  if (args?.length === 2) {
    return { value: args[0], oldValue: args[1] };
  }

  return {};
}