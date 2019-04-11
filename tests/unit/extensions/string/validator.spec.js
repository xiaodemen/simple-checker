import Validator from '@/extensions/string/Validator'
import {addRuleDefinitions} from '@/base/Rule'
import enumRule from '@/rules/enum'
import required from '@/rules/required'

addRuleDefinitions(enumRule, required)

test('string Validator', () => {
    let va = new Validator({
        foo: 'required | enum:val(["a","b"])'
    })
    expect(
        va.validate({foo: 'a'})
    ).toBe(true)
})

test('enum:val(["a","b"])', () => {
    let va = new Validator({
        foo: 'required | enum:val(["a","b"])'
    })
    expect(
        va.validate({foo: 'a'})
    ).toBe(true)
})

test('enum:val("a","b")', () => {
    let va = new Validator({
        foo: 'required | enum:val("a","b")'
    })
    expect(
        va.validate({foo: 'a'})
    ).toBe(true)
})

test('enum:val(1,2)', () => {
    let va = new Validator({
        foo: 'required | enum:val(1)'
    })
    expect(
        va.validate({foo: 1})
    ).toBe(true)
})
