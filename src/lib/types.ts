/**
 * Base utility for creating Branded Types.
 * Branded types allow us to distinguish between different types that have the same underlying structure.
 * @see https://www.totaltypescript.com/concepts/the-brand-trick
 */
export type Brand<K, T> = K & { readonly __brand: T };

/**
 * Result type for error handling without exceptions.
 * Forces the caller to handle both success and error cases.
 */
export type Result<T, E = Error> =
  | { readonly data: T; readonly error: null }
  | { readonly data: null; readonly error: E };

/**
 * Helper to create a successful Result.
 */
export function success<T>(data: T): Result<T, never> {
  return { data, error: null };
}

/**
 * Helper to create an error Result.
 */
export function failure<E>(error: E): Result<never, E> {
  return { data: null, error };
}
