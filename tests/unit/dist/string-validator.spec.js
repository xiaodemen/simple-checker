import * as all from '@/../dist/string-validator'

const hasKeys = (obj, keys) => {
    keys.forEach(k => {
        expect(obj[k]).toBeTruthy()
    })
}

test('string Validator export', () => {
    hasKeys(all, ['Validator', 'rules', 'addRuleDefinitions'])
})

let {Validator, rules, addRuleDefinitions} = all

addRuleDefinitions(rules.enum)

test('string Validator works', () => {
    let va = new Validator({
        foo: 'enum:val([1, 2, 3])',
        bar: 'enum:val([1, 2, 3])'
    })
    expect(va.validate({
        foo: 3,
        bar: 0
    })).toEqual({
        bar: ["请填写如下值之一: [1,2,3]"]
    })
})
