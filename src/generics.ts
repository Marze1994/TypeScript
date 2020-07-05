// ### 泛型
// 不预先确定的数据类型，具体的类型在使用的时候才能确定。
function log(value: any): any {
  console.log(value);
  return value;
}
// 改造后
function log1<T>(value: T): T {
  console.log(value);
  return value;
}
// 调用方式：2种
log1<string[]>(["a", "b"]); // 指明类型 T
log1(["a", "b"]); // 利用类型推断的写法

// 泛型不仅可以用来定义函数，也可以定义函数类型。
type Log = <T>(value: T) => T;
let myLog: Log = log;

// ### 泛型接口
interface Baby<T = string> {
  (value: T): T;
}
// 实现泛型接口时必须指明 T 的类型，除非有默认类型。
let baby: Baby = log1;
baby("Waaaa!");

// ### 泛型类
class People<T> {
  // static age: T; // Error! 静态属性不能使用泛型类型。
  run(value: T) {
    console.log(value);
    return value;
  }
}
let man = new People();
let woman = new People<number>();

// ### 类型约束
// 我们有时候需要操作某类型的某些属性，但是泛型 T 本身并不具有这些属性。
function loggingIdentity<T>(arg: T): T {
  // console.log(arg.length);  // Error: T doesn't have .length
  return arg;
}
// 为此，我们定义一个接口来描述约束条件。
interface Lengthwise {
  length: number;
}
function _loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}

// 泛型的好处：
// 1. 函数和类可以轻松地支持多种类型，增强程序的扩展性
// 2. 不必写多条函数重载，冗长的联合类型声明，增强代码可读性
// 3. 灵活控制类型之间的约束
