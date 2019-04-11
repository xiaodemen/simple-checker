/**
 * @file a string chained style Validator
 */

import BaseValidator from '../../base/Validator'
import {fld} from '../../base/Field'
import Rule from '../../base/Rule'
import {reduce} from 'lodash'
import parse from './parse'

export default class Validator extends BaseValidator {

    /**
     * @override
     */
    normalizeFields(fields) {
        return super.normalizeFields(this.parseFields(fields))
    }

    parseFields(fields) {
        return reduce(fields, (result, fieldStr, name) => {
            result[name] = this.fromStringToField(fieldStr)
            return result
        }, {})
    }

    fromStringToField(fieldStr) {
        let rules = parse(fieldStr)
        return fld().addRules(
            rules.map(
                ({rule: name, config}) => new Rule(name)
                    .setConfig(
                        reduce(config, (result, {name, value}) => {
                            result[name] = value
                            return result
                        }, {})
                    )
            )
        )
    }
}
