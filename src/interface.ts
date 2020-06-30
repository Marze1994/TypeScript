// ### 接口
interface Item {
  name: string; // 必要属性
  age?: number; // 可选属性
  readonly id: number; // 只读属性
}
interface Result {
  data: Item[];
}
function render(result: Result) {
  result.data.forEach((value) => {
    console.log(value.id, value.name);
    if (value.age) {
      console.log(value.age);
    }
  });
}
let result = {
  data: [
    { id: 1, name: "A", sex: "male" },
    { id: 2, name: "B" },
  ],
};
render(result);

// TypeScript 具有 ReadonlyArray<T> 类型，它与 Array<T> 相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
// ro[0] = 12; // Error!
// ro.push(5); // Error!
// ro.length = 100; // Error!
// a = ro; // Error!
// 上面代码的最后一行，可以看到就算把整个ReadonlyArray赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写：
a = ro as number[];

// 开发中实际情况：result 有接口约定之外的字段 sex，但是这样也不影响最终结果。
// 实际上，ts 使用了鸭式辨型法（一种动态语言类型风格，一个比较形象的说法是，一只鸟如果看起来像鸭子，游起来像鸭子，叫起来像鸭子，那么这只鸟就可以被认为是鸭子），
// 回到 ts，只要传入的对象满足接口的必要条件，那就是被允许的，即使传入多余的字段。
// 但是！如果我们直接传入对象字面量，ts 就会检查额外的字段，可以通过以下三种方式避免：

// render({
//   data: [
//     { id: 1, name: "A", sex: "male" }, // Error! 直接传对象字面量时 ts 会检查额外的字段。
//     { id: 2, name: "B" },
//   ],
// })

// 一、用变量保存对象字面量。
// 二、使用类型断言（最简便的方式），明确告诉编译器对象类型就是 xxx。
render({
  data: [
    { id: 1, name: "A", sex: "male" },
    { id: 2, name: "B" },
  ],
} as Result);
// or
render(<Result>{
  data: [
    { id: 1, name: "A", sex: "male" },
    { id: 2, name: "B" },
  ],
});
// 上面两种写法都是类型断言，建议用前一种，后一种在 react 中会有歧义。
// 三、使用字符串索引签名（最佳的方式），格式如下：
// interface Item {
//   id: number;
//   name: string;
//   [x: string]: any; // 索引签名
// }

// ### 可索引类型的接口（TypeScript 支持两种索引签名：字符串和数字）
// 可索引类型具有一个索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。
interface StringArray {
  [index: number]: string; // 含义：用 number 去索引 StringArray 时会得到一个 string 类型的返回值。
}
let chars: StringArray = ["A", "B"];

interface Point {
  [x: string]: any; // 含义：用 string 去索引 Point 时会得到一个 any 类型的返回值。
  [y: number]: number;
  // 可以同时使用两种类型的索引，但是！这时数字索引的返回值类型必须是字符串索引返回值类型的子类型！这点很重要！
  // 这是因为当使用 number 来索引时，JavaScript 会将它转换成 string 然后再去索引对象。
  // 也就是说用 100（一个number）去索引等同于使用"100"（一个string）去索引，因此两者需要保持一致。
}

// interface NumberDictionary {
//   [index: string]: number;
//   length: number; // Works! length 是 number 类型。
//   name: string; // Error! name 的类型与索引类型返回值的类型不匹配，必须是其子类型！
// }

// 最后，你可以将索引签名设置为只读，这样就防止了给索引赋值：
interface ReadonlyStringArray {
  readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];
// myArray[2] = "Mallory"; // Error!

// ### 函数类型
// 除了描述带有属性的普通对象外，接口也可以描述函数类型。
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function (src, sub) {
  // 可以不指定类型，TypeScript 的类型系统会推断出参数类型和返回值类型。
  let result = src.search(sub);
  return result > -1;
};

// ### 混合类型
// 既可以定义一个函数，也可以像对象一样拥有属性和方法。
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}
function getCounter(): Counter {
  let counter = <Counter>function (start: number) {};
  counter.interval = 123;
  counter.reset = function () {};
  return counter;
}
let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
