export const logger = (store) => (next) => (action) => {
  console.info("dispatching", action);
  let result = next(action);
  return result;
};
