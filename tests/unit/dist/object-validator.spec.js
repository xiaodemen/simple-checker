let all = require('@/../dist/object-validator')

const hasKeys = (obj, keys) => {
    keys.forEach(k => {
        expect(obj[k]).toBeTruthy()
    })
}

test('object Validator export', () => {
    hasKeys(all, ['Field', 'fld', 'Validator', 'rules', 'addRuleDefinitions'])
})

let {fld, Validator, rules, addRuleDefinitions} = all

addRuleDefinitions(rules.enum)

test('object Validator works', () => {
    let va = new Validator({
        foo: fld().enum({
            val: [1, 2, 3]
        }),
        bar: fld().enum({
            val: [1, 2, 3]
        })
    })
    expect(va.validate({
        foo: 3,
        bar: 0
    })).toEqual({
        bar: ["请填写如下值之一: [1,2,3]"]
    })
})
