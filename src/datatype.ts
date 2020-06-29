// 原始类型
let bool: boolean = true;
let num: number = 123;
let str: string = "abc";

// 数组
let arr1: number[] = [1, 2, 3];
let arr2: Array<number> = [1, 2, 3];
// 这里的 Array 其实是 ts 官方给我们预定义的一个泛型接口

// 联合类型
let arr3: Array<number | string> = [1, 2, 3, "4"];

// 元组：是一种的特殊的数组，限定了数组元素的类型和个数
let tuple: [number, string] = [1, "2"];
// 元组的越界问题：
tuple.push(2); // ts 允许我们往元组插入元素
console.log(tuple);
// tuple[2]; // 但是不能越界访问，实际开发强烈不推荐这样使用

// 函数
let add = (x: number, y: number) => x + y;
// 也可以为 add 函数的返回值添加类型注解：(x: number, y: number): number，但通常可以省略，因为 ts 有类型推断功能
// 下面定义一个函数类型，这里 compute 就是一种函数类型，但是没有具体实现
let compute: (x: number, y: number) => number;
// 下面来实现下，在实际实现过程中，函数参数可以和定义时不一样，而且可以不用指定具体的类型
compute = (a, b) => a + b;

// 对象
// let obj: object = { x: 1, y: 2 };
let obj: { x: number; y: number } = { x: 1, y: 2 };
obj.x = 3;
// 要想上面的赋值操作不报错，需要这样定义对象类型：obj: {x: number, y: number}

// symbol
let s1: symbol = Symbol();
let s2 = Symbol();
console.log(s1 === s2); // 结果是 false。因为 symbol 类型数据的值是唯一的

// undefined, null
let un: undefined = undefined;
let nu: null = null;
// 如果变量声明了 undefined 或 null 类型，那就不能赋值给其它任何数据类型了
// 反过来其它数据类型可以赋值给 undefined 和 null 吗？答案是可以的。
// ts 官方文档表明 undefined 和 null 是任何类型的子类型，所以可以赋值给其它任何数据类型，
// 通过设置 tsconfig.json 配置文件中的 strictNullChecks: false 就可以了！
num = undefined;
num = null;

// void
// 在 js 中，void 是一种操作符，它可以让任何表达式返回 undefined，为什么这么设计呢？
// 因为 undefined 在 js 中不是一个保留字，可以被自定义的变量覆盖
// 所以我们一般都是用 void 0 来确保我们拿到的一定是 undefined
let noReturn = () => {};
// 回到 ts，void 类型表示没有任何返回值的类型

// any：默认不指定类型，可以任意赋值其它类型数值
let x;
x = 1;
x = [];
x = () => {};

// never：表示永远不会有返回值的类型
let error = () => {
  throw new Error("error"); // 函数抛出异常
};
let endless = () => {
  while (true) {} // 死循环
};
