const BaseType = {
  title: '基础数据类型',
  content:
    'Boolean, Number, String, Symbol, Array, Enum, Any, Unknow, Tuple, Void, Null和 undefined, object, Object,{}, Never'
}

const TypeAsserts = {
  title: '类型断言',
  list: [
    {
      title: '尖括号语法',
      code: `const someVal: any = 'this is a string '
const strLength: number = (<String>someVal).length`
    },
    {
      title: 'as 语法',
      code: `const someVal: any = 'this is a string'
const strLength: number = (someVal as string).length`
    },
    {
      title: '非空断言',
      code: `fucntion Func(x: sting | undefined | null) {
// 从类型中剔除 undefined 和 null
const onlyString: string = x // error
const ignoreUndefinedAndNull: string = x!
// 调用函数忽略 undefined
type NumGenerator = () => number
function Func(numgnerator: NumGenerator | undefined) {
  const num1 = numgenrator() // error
  const num2 = numgenrator!() // ok
}
// 确定赋值断言
let x: number // error
let x!: number // error
Func()
console.log(2*x)
function Func() {
  x = 1
}
}`
    }
  ]
}

const TypeGuard = {
  title: '类型守卫',
  content:
    '用于确保类型在一定的范围内。主要有四种方式：in 关键字，typeof 关键字，instanceof 关键字，自定义类型称谓词',
  code: `// in 
interface Admin {
  name: string
  privileges: string[]
}

fucntion Func(emp: Admin) {
  if('privileges' in emp) {
    console.log('privilieges:')
  }
}

// is
function isNumber(x: unknow): x is number {
  return typeof x === 'number'
}
`
}

const CrossingType = {
  title: '交叉类型'
}
export const TypeScriptBasic = [BaseType, TypeAsserts, TypeGuard, CrossingType]
