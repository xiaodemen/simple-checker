/**
 * @file utils
 */

export function error(msg) {
    throw new Error(`simple-checker: ${msg}`)
}

export function warn(msg) {
    console && console.warn(`simple-checker: ${msg}`)
}
