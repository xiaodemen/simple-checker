/**
 * @file Rule class
 * a rule has a definition & a runtime config.
 *   same rules share the same definition.
 *   the item in runtime config overrides the one in default config of definition
 */

import Hook from './Hook'
import {isPlainObject, defaults, get, each} from 'lodash'
import {warn, error} from '../utils'

export default class Rule {

    name = null

    // belongToFields = []

    config = {}

    constructor(name) {
        this.name = name
    }

    getDefinition(key) {
        let def = ruleDefinitions[this.name]
        if (!def && key) {
            warn(`must register ${this.name} rule first!`)
        }
        return key ? def[key] : def
    }

    getConfig(key) {
        let merged = defaults({}, this.config, ruleDefinitions[this.name].config)
        if (!key) {
            return merged
        }
        return get(merged, key)
    }

    setConfig(key, val) {
        if (isPlainObject(key)) {
            this.config = {
                ...this.config,
                ...key
            }
        }
        else {
            this.config[key] = val
        }
        return this;
    }

    validate(val, name, whole) {
        let validate = this.getDefinition('validate')
        let valid = validate.call(this, val, name, whole)
        if (valid === true) {
            return valid
        }
        return this.formatMsg(valid || this.getConfig('msg'))
    }

    formatMsg(msg) {
        // 先实现个简单字符串替换版本
        // TODO
        msg = msg || ''
        return msg.indexOf('{{') === -1
            ? msg
            : msg.replace(/{{([^}]+)}}/g, (_, expr) => JSON.stringify(this.getConfig(expr.trim())))
    }
}


export let ruleDefinitions = {}
export let ruleHook = Hook.declare(['addrule'])

export function addRuleDefinition(definition) {
    definition = normalizeRuleDef(definition)
    ruleDefinitions[definition.name] = definition
    ruleHook.invoke('addrule', definition)
}

export function addRuleDefinitions() {
    [].forEach.call(arguments, i => addRuleDefinition(i))
}

export function applyExistingRules(cb) {
    each(ruleDefinitions, def => cb(def))
}

function normalizeRuleDef(definition = {}) {
    let {validate, name} = definition
    if (!validate || !name) {
        error('a valid rule definition must have a validate method & a name')
    }
    return definition
}
