const delayPromise = async <T>(
  promise: Promise<T>,
  delay: number
 ): Promise<T> => {
  const [result] = await Promise.all([
    promise,
    new Promise((resolve) => setTimeout(() => resolve(true), delay))
  ]);
  return result;
};
