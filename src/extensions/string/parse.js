

import {last} from 'lodash'
import {error} from '../../utils'

export default function parse(str) {

    if(!str || !str.trim()) {
        return null
    }

    let nameRe = /^[a-zA-Z][\w$]*/

    let inRule = false
    let inConfig = false
    let inParenth = false
    // let idx = 0

    let result = []

    function walk() {
        while(str.trim()) {
            if (!inRule) {
                startRule()
            }
            else {
                let ch = str[0]
                switch (ch) {
                    case '(':
                        startParenth()
                        break
                    case ')':
                        endParenth()
                        step(1)
                        endConfig()
                        break
                    case '.':
                    case ':':
                        if (inConfig) endConfig()
                        startConfig(ch === ':')
                        break
                    case '|':
                        if (inConfig) endConfig()
                        endRule()
                        let space = str.match(/^\| */)
                        if (space) {
                            step(space[0].length)
                        }
                        break
                    case ' ':
                        let spaceBefore = str.match(/^( +)\|/)
                        if (spaceBefore) {
                            step(spaceBefore[1].length)
                        }
                        else {
                            error(`unrecognized character: ${ch}`)
                        }
                        break
                    default:
                    error(`unrecognized character: ${ch}`)
                }
            }
        }
        if (inParenth) {
            error('unclosed parenthese: (')
        }
        if (inConfig) endConfig()
        if (inRule) endRule()
    }
    walk()
    return result

    function startRule() {
        let name = str.match(nameRe)
        if (!name) {
            error('rule name should starts with `a-zA-Z`')
        }
        inRule = true
        step(name[0].length)
        result.push({
            rule: name[0],
            config: []
        })
    }

    function endRule() {
        inRule = false
    }

    function startConfig(dynamic) {
        step(1)
        let name = str.match(nameRe)
        if (!name) {
            error('config item should starts with `a-zA-Z`')
        }
        // 是不是应该在这里直接把动态的东西转换掉？
        addConfigName(name[0], dynamic)
        inConfig = true
    }

    function endConfig() {
        inConfig = false
    }

    function startParenth() {
        if (!inConfig) {
            error(`unrecognized character: ${str[0]}`)
        }
        step(1)
        let idx = 0
        while(str[idx] !== ')') {
            idx += str[idx] === '\\' ? 2 : 1
        }
        addConfigValue(str.slice(0, idx))
        inParenth = true
    }

    function endParenth() {
        if (!inParenth) {
            error(`unrecognized character: ${str[0]}`)
        }
        inParenth = false
    }

    function addConfigName(name, dynamic) {
        last(result).config.push(dynamic ? {name, dynamic} : {name})
        step(name.length)
    }

    function addConfigValue(value) {
        let config = last(last(result).config)
        config.value = config.dynamic ? extractParameter(value) : value
        step(value.length)
    }

    function step(num) {
        str = str.slice(num)
    }

}

function extractParameter(argStr) {
    return new Function(
        `return function(){return arguments.length > 1 ? [].slice.call(arguments) : arguments[0]}(${argStr})`
    )()
}
