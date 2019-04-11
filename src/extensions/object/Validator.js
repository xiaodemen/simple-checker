/**
 * @file object style Validator
 */

import BaseValidator from '../../base/Validator'
import {reduce} from 'lodash'

export default class Validator extends BaseValidator {

    /**
     * @override
     */
    normalizeFields(fields) {
        return reduce(fields, (result, fld, name) => {
            result[name] = fld._field
            return result
        }, fields)
    }
}