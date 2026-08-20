/** Additional small UI utilities and helpers */
export function cn(...args: Array<string | false | null | undefined>) {
  return args.filter(Boolean).join(' ')
}
