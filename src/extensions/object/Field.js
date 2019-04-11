/**
 * @file Field supporting object style config
 */

import BaseField from '../../base/Field'
import Rule, {ruleHook, applyExistingRules} from '../../base/Rule'

export default class Field {
    constructor() {
        Object.defineProperty(this, '_field', {
            value: new BaseField(),
            enumerable: false
        })
    }
}

function proxyRuleAsMethod({name} = {}) {
    Object.defineProperty(Field.prototype, name, {
        value(...args) {
            let rule = new Rule(name).setConfig(...args)
            this._field.addRule(rule)
            return this
        }
    })
}

applyExistingRules(proxyRuleAsMethod)

ruleHook.on('addrule', proxyRuleAsMethod)

export function fld() {
    return new Field()
}

