/**
 * Utilidad para combinar nombres de clases de manera condicional
 * Similar a bibliotecas como clsx o classnames
 * @param inputs Clases CSS que se combinarán
 * @returns String con todas las clases combinadas
 */
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(' ');
}
