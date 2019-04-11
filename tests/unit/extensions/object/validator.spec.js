import Validator from '@/extensions/object/Validator'
import {fld} from '@/extensions/object/Field'
import {addRuleDefinitions} from '@/base/Rule'
import enumRule from '@/rules/enum'
import required from '@/rules/required'

addRuleDefinitions(enumRule, required)

function msgReplacer(va, fld, idx) {
    return msg => va.fields[fld].rules[idx].formatMsg(msg)
}

test('object Validator', () => {
    let va = new Validator({
        foo: fld().required().enum({val: ["a","b"]})
    })
    expect(
        va.validate({foo: 'a'})
    ).toBe(true)

    va = new Validator({
        foo: fld().required().enum({val: [1, 2]})
    })
    expect(
        va.validate({foo: 1})
    ).toBe(true)

    va = new Validator({
        foo: fld().required().enum({val: [1, 2]})
    })
    expect(
        va.validate({foo: 3})
    ).toEqual({foo: [msgReplacer(va, 'foo', 1)(enumRule.config.msg)]})
})
