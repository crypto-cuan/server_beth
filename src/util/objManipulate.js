export const destruct = (obj, ...keys) => keys.reduce((a, c) => ({ ...a, [c]: obj[c] || null }), {})
