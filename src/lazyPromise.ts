/**
 * Runs the computation the first time the promise is awaited and caches the result.
 */
export function lazyPromise<T>(fn: () => T | PromiseLike<T>) {
  let cached: Promise<T> | undefined;

  return {
    then: <TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
    ) => {
      cached ??= Promise.resolve().then(() => fn());
      return cached.then(onfulfilled, onrejected);
    },
  } satisfies PromiseLike<T>;
}
