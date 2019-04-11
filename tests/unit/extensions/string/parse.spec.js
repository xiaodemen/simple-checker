import parse from '@/extensions/string/parse'

test('empty return null', () => {
    expect(parse('')).toBe(null)
    expect(parse('  ')).toBe(null)
    expect(parse(null)).toBe(null)
})

test('`a`', () => {
    expect(parse('a')).toEqual([{
        rule: 'a',
        config: []
    }])
})

test('`a.b().c(1)`', () => {
    expect(parse('a.b')).toEqual([{
        rule: 'a',
        config: [
            {name: 'b'}
        ]
    }])

    expect(parse('a.b().c(1)')).toEqual([{
        rule: 'a',
        config: [
            {name: 'b', value: ''},
            {name: 'c', value: '1'}
        ]
    }])
})

test('`a.b() | min.msg(wo w.|).val(1)`', () => {
    expect(parse('a.b() | min.msg(wo w.|).val(1)')).toEqual([
        {
            rule: 'a',
            config: [
                {name: 'b', value: ''}
            ]
        },
        {
            rule: 'min',
            config: [
                {name: 'msg', value: 'wo w.|'},
                {name: 'val', value: '1'}
            ]
        }
    ])

})


test('config value support escape', () => {
    expect(parse('a.b((\\))')).toEqual([
        {
            rule: 'a',
            config: [
                {name: 'b', value: '(\\)'}
            ]
        }
    ])
})
