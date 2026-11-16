/**
 * Strips diacritics so "thieboudienne" matches "Thiéboudienne" — French
 * recipe/product names are full of accents most users won't bother typing.
 * Lowercases too, so callers never need a separate `.toLowerCase()`.
 */
export function foldAccents(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}
