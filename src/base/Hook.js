/**
 * @file a simple sync hook
 */

import {isPlainObject} from 'lodash'
import {warn} from '../utils'

export default class Hook {

    hookMap = {}

    static declare(hooks) {
        return new Hook(hooks)
    }

    constructor(hooks) {
        if (Array.isArray(hooks)) {
            hooks.reduce((result, name) => {
                result[name] = null
                return result
            }, this.hookMap)
        } else if (isPlainObject(hooks)) {
           this.hookMap = {...hooks}
        }
        else if (typeof hooks === 'string') {
            this.hookMap[hooks] = null
        }
    }

    on(name, cb, prepend = false) {
        let cbs = this.hookMap[name]
        if (cbs) {
            this.hookMap[name] = Array.isArray(cbs)
                ? prepend ? [cb, ...cbs] : [...cbs, cb]
                : prepend ? [cb, cbs] : [cbs, cb]
        }
        else {
            this.hookMap[name] = [cb]
        }
    }

    off(name, cb) {
        let cbs = this.hookMap[name]
        if (cbs) {
            if (cbs.length === 1 && cbs[0] === cb) {
                this.hookMap[name] = null
                return
            }

            let idx = cbs.indexOf(cb)
            if (idx >= 0) {
                cbs.splice(idx, 1)
            }
        }
    }

    invoke(name, ...args) {
        let cbs = this.hookMap[name]
        if (cbs) {
            cbs.forEach(item => {
                try {
                    item(...args)
                }
                catch(e) {
                    warn(`error happened when invoking Hook ${name}: ${e}`)
                }
            })
        }
    }
}
