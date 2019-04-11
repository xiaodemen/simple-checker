# simple-checker

```sh
$ npm i simple-checker
```

## object-style config for Node
```js
let {
    Validator,
    addRuleDefinitions,
    fld,
    rules
} = require('simple-checker')

addRuleDefinitions(rules.required, rules.enum)

new Validator({
    foo: fld()
            .required()
            .enum({
                val: '1'
            }),
    bar: fld()
            .required()
})
.validate({
    foo: 1,
    bar: ''
})

// => {"bar": ["请填写"], "foo": ["请填写如下值之一: \"1\""]}
```


## string-style config
```js
import {
    Validator,
    Rule,
    addRuleDefinitions,
    rules
} from 'simple-checker/extensions/string'

addRuleDefinitions(rules.required, rules.enum)

new Validator({
    foo: 'required.msg(自定义错误文案)|enum:val(["1", "2"])',
})
.validate({
    foo: '1'
})

// => true
```
