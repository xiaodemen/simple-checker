/**
 * @file a field in the validator
 */

import {reduce, isString} from 'lodash'
import Rule from './Rule'
import {error} from '../utils'

export default class Field {

    /**
     * rules of the field
     * @type {!Array.<Rule>}
     */
    rules = []

    /**
     * list of validity of the field
     * @type {?Object}
     */
    validity = null

    addRules(rules, prepend) {
        rules = normalizeRule(rules)
        rules = Array.isArray(rules) ? rules : [rules]
        prepend ? this.rules.unshift(...rules) : this.rules.push(...rules)
        // rule.belongTo(this)
        return this
    }

    addRule(...args) {
        return this.addRules(...args)
    }

    validate(val, name, whole) {
        this.validity = reduce(this.rules, (result, rule) => {
            let valid = rule.validate(val, name, whole)
            if (valid === true) {
                return result
            }
            return result === true ? [valid] : [...result, valid]
        }, true)

        return this.validity
    }
}

export function fld() {
    return new Field()
}

function normalizeRule(rule) {
    if (isString(rule)) {
        return new Rule(rule)
    }
    else if (rule instanceof Rule) {
        return rule
    }
    else if (Array.isArray(rule)) {
        return rule.map(normalizeRule)
    }
    error(`rule name, Rule instance or array of them required!`)
}
