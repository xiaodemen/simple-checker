/**
 * @file Validator class
 */

import {reduce, isPlainObject} from 'lodash'
import Field from './Field'
import {warn, error} from '../utils'

export default class Validator {

    /**
     * fields of the validator
     */
    fields = {}

    /**
     * validation result collection
     */
    validities = null

    constructor(fields) {
        this.fields = this.normalizeFields(fields)
    }

    addFields(name, fld) {
        if (isPlainObject(name)) {
            let fields = this.normalizeFields(name)
            this.fields = {
                ...this.fields,
                ...fields
            }
        }
        else {
            fld = this.normalizeFields(fld)
            this.fields[name] = fld
        }
        return this
    }

    addField(...args) {
        return this.addFields(...args)
    }

    removeFields(names) {
        if (Array.isArray(names)) {
            names.forEach(n => delete this.fields[n])
        }
        else {
            delete this.fields[names]
        }
        return this
    }

    removeField(name) {
        return this.removeFields(name)
    }

    validate(data) {
        this.validities = reduce(this.fields, (result, field, name) => {
            let valid = field.validate(data[name], name, data)
            if (valid === true) {
                return result
            }
            return result === true
                ? {[name]: valid} 
                : {...result, [name]: valid}
        }, true)

        return this.validities
    }

    normalizeFields(fields) {
        if (fields instanceof Field) {
            return fields
        }
        else if (isPlainObject(fields)) {
            return reduce(fields, (result, fld, name) => {
                if (!fld instanceof Field) {
                    warn(`field of ${name} should be a instance of Field, otherwise ignored!`)
                    return result
                }
                result[name] = fld
                return result
            }, {})
        }
        error('field should be a instance of Field')
    }

}
